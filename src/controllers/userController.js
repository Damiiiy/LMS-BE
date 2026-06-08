import userService from '../services/userService.js';

class UserController {
  async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const { nickname, phoneNumber } = req.body;

      const updatedUser = await userService.updateProfile(userId, { nickname, phoneNumber });

      res.status(200).json({
        success: true,
        data: { user: updatedUser }
      });
    } catch (error) {
      if (error.message === 'No valid fields provided for update') {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
}

export default new UserController();
