// No hardcoded constants per spec
export const SESSION_TIMEOUT_MINUTES = parseInt(process.env.SESSION_TIMEOUT_MINUTES) || 20;

export const JWT_ALGORITHM = 'HS256';

export const MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  LOGIN_FAILED: 'Invalid email or password',
  NOT_APPROVED: 'Account not approved by admin',
  SESSION_CREATED: 'Session created',
  USER_NOT_FOUND: 'User not found',
  MISSING_CREDENTIALS: 'Email and password required'
};