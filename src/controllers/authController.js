// Controllers - no database queries per spec
import authService from '../services/authService.js';
import authValidator from '../validators/authValidator.js';
import { MESSAGES } from '../constants/authConstants.js';

class AuthController {
  // Login endpoint handler
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      // Validate input (no duplicated validation per spec)
      const validatedInput = authValidator.validateLoginInput(email, password);
      
      const result = await authService.login(validatedInput.email, validatedInput.password);
      
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      // Map error messages to appropriate status codes
      if (error.message === MESSAGES.NOT_APPROVED) {
        return res.status(403).json({
          success: false,
          message: error.message
        });
      }
      
      if (error.message.includes('Email') || error.message.includes('Password')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      
      if (error.message === MESSAGES.LOGIN_FAILED || 
          error.message === MESSAGES.MISSING_CREDENTIALS) {
        return res.status(401).json({
          success: false,
          message: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Logout endpoint handler
  async logout(req, res) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      authValidator.validateToken(token);
      
      const result = await authService.logout(token);
      
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      const statusCode = error.message === 'Valid token is required' ? 400 : 401;
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get current user handler
  async getMe(req, res) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      authValidator.validateToken(token);
      
      const user = await authService.getCurrentUser(token);
      
      res.status(200).json({
        success: true,
        data: { user }
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  }
}

export default new AuthController();