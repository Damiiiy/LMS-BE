// Utils - token generation and verification
const jwt = require('jsonwebtoken');
const { JWT_ALGORITHM } = require('../constants/authConstants');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Generate JWT token
function generateToken(payload) {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET not configured');
  }
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    algorithm: JWT_ALGORITHM
  });
}

// Verify JWT token
function verifyToken(token) {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET not configured');
  }
  try {
    return jwt.verify(token, JWT_SECRET, { algorithms: [JWT_ALGORITHM] });
  } catch (error) {
    return null;
  }
}

// Decode token without verification
function decodeToken(token) {
  return jwt.decode(token);
}

module.exports = {
  generateToken,
  verifyToken,
  decodeToken
};