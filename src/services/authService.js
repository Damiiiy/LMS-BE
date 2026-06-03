// Services - business logic only per spec
const User = require('../models/User');
const Session = require('../models/Session');
const jwtHelper = require('../utils/jwtHelper');
const { SESSION_TIMEOUT_MINUTES, MESSAGES } = require('../constants/authConstants');

class AuthService {
  // Business logic: login validation and session creation
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

    // Calculate expiration
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + SESSION_TIMEOUT_MINUTES);

    // Generate JWT token
    const token = jwtHelper.generateToken({
      userId: user._id,
      email: user.email,
      role: user.role
    });

    // Create session in database
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

  // Business logic: logout
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

  // Business logic: get current user from session
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

module.exports = new AuthService();