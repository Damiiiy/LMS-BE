// Middlewares - token verification per spec
import jwtHelper from '../utils/jwtHelper.js';
import Session from '../models/Session.js';
import { SESSION_TIMEOUT_MINUTES } from '../constants/authConstants.js';

// Middleware: Verify JWT and check session
async function authenticate(req, res, next) {
  try {
    // Extract token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Verify JWT signature
    const decoded = jwtHelper.verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    // Find session in database
    const session = await Session.findByToken(token);
    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Session not found'
      });
    }

    // Check if session expired by expiresAt
    const now = new Date();
    if (now > session.expiresAt) {
      await Session.deleteSession(token);
      return res.status(401).json({
        success: false,
        message: 'Session expired'
      });
    }

    // Check 20 minute inactivity timeout
    const lastActivity = new Date(session.lastActivity);
    const inactiveMinutes = (now - lastActivity) / (1000 * 60);
    if (inactiveMinutes > SESSION_TIMEOUT_MINUTES) {
      await Session.deleteSession(token);
      return res.status(401).json({
        success: false,
        message: `Session expired due to ${SESSION_TIMEOUT_MINUTES} minutes inactivity`
      });
    }

    // Update last activity
    await Session.updateActivity(token);
    
    // Attach user to request
    req.user = {
      id: session.userId._id,
      email: session.userId.email,
      role: session.userId.role,
      isApproved: session.userId.isApproved
    };
    req.token = token;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

// Middleware: Require approved user
function requireApproved(req, res, next) {
  if (!req.user || !req.user.isApproved) {
    return res.status(403).json({
      success: false,
      message: 'Approved users only'
    });
  }
  next();
}

// Middleware: Require admin role
function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
  }
  next();
}

export {
  authenticate,
  requireApproved,
  requireAdmin
};