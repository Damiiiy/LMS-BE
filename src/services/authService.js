import User from '../models/User.js';
import Session from '../models/Session.js';
import bcrypt from 'bcrypt';
import jwtHelper from '../utils/jwtHelper.js';
import { SESSION_TIMEOUT_MINUTES, MESSAGES } from '../constants/authConstants.js';

class AuthService {
  //to be deleted -NDY

  async signup(data) {
    if (!data.email || !data.password || !data.fullName) {
      throw new Error('Email, password, and fullName are required');
    }
    const existing = await User.findByEmail(data.email);
    if (existing) {
      throw new Error('Email already in use');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const role = data.role === 'admin' ? 'admin' : 'forger';

    const user = new User({
      ...data,
      password: hashedPassword,
      role: role,
      isApproved: true
    });
    const savedUser = await user.save();
    const userObj = savedUser.toObject();
    delete userObj.password;
    return userObj;
  }







  async login(email, password) {
    // Validate input
    if (!email || !password) {
      throw new Error(MESSAGES.MISSING_CREDENTIALS);
    }

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error(MESSAGES.LOGIN_FAILED);
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error(MESSAGES.LOGIN_FAILED);
    }

    // Check if approved
    if (!user.isApproved) {
      throw new Error(MESSAGES.NOT_APPROVED);
    }

    // ✅ Calculate expiration using SESSION_TIMEOUT_MINUTES from .env
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + SESSION_TIMEOUT_MINUTES);

    // Generate JWT token (expires in 7d from .env JWT_EXPIRES_IN)
    const token = jwtHelper.generateToken({
      userId: user._id,
      email: user.email,
      role: user.role
    });

    // Create session with calculated expiresAt
    const session = await Session.createSession(user._id, token, expiresAt);

    // Return user data (excluding password)
    const userData = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      nickname: user.nickname,
      phoneNumber: user.phoneNumber,
      role: user.role,
      isApproved: user.isApproved,
      trackId: user.trackId
    };

    return {
      token,
      user: userData,
      expiresAt: session.expiresAt,
      message: MESSAGES.LOGIN_SUCCESS
    };
  }

  async logout(token) {
    if (!token) {
      throw new Error('No token provided');
    }

    const deleted = await Session.deleteSession(token);
    if (!deleted) {
      throw new Error('Session not found');
    }

    return { message: 'Logout successful' };
  }

  async getCurrentUser(token) {
    const session = await Session.findByToken(token);
    if (!session) {
      throw new Error('Invalid or expired session');
    }

    // Check if session expired
    if (new Date() > session.expiresAt) {
      await Session.deleteSession(token);
      throw new Error('Session expired');
    }

    // Update last activity
    await Session.updateActivity(token);

    const user = session.userId;
    return {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      nickname: user.nickname,
      phoneNumber: user.phoneNumber,
      role: user.role,
      isApproved: user.isApproved,
      trackId: user.trackId
    };
  }
}

export default new AuthService();