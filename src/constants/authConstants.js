// No hardcoded constants per spec
module.exports = {
  SESSION_TIMEOUT_MINUTES: 20,
  JWT_ALGORITHM: 'HS256',
  MESSAGES: {
    LOGIN_SUCCESS: 'Login successful',
    LOGIN_FAILED: 'Invalid email or password',
    NOT_APPROVED: 'Account not approved by admin',
    SESSION_CREATED: 'Session created',
    USER_NOT_FOUND: 'User not found',
    MISSING_CREDENTIALS: 'Email and password required'
  }
};