// Validators - input validation per spec (no duplicated validation)
import { MESSAGES } from '../constants/authConstants.js';

class AuthValidator {
  validateLoginInput(email, password) {
    const errors = [];
    
    if (!email || typeof email !== 'string' || email.trim() === '') {
      errors.push('Email is required');
    } else if (!this.isValidEmail(email)) {
      errors.push('Invalid email format');
    }
    
    if (!password || typeof password !== 'string' || password.trim() === '') {
      errors.push('Password is required');
    } else if (password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }
    
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
    
    return {
      email: email.toLowerCase().trim(),
      password: password
    };
  }
  
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  validateToken(token) {
    if (!token || typeof token !== 'string') {
      throw new Error('Valid token is required');
    }
    return token;
  }
}

export default new AuthValidator();