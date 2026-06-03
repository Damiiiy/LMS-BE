// Controllers - no database queries per spec
const authService = require('../services/authService');
const { MESSAGES } = require('../constants/authConstants');

class AuthController {
  // Login endpoint handler
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      const result = await authService.login(email, password);
      
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
      
      const result = await authService.logout(token);
      
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get current user handler
  async getMe(req, res) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
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

module.exports = new AuthController();