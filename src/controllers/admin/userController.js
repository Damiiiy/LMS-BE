import adminUserService from '../../services/admin/adminUserService.js';

class UserController {
  async provisionUser(req, res) {
    try {
      const user = await adminUserService.provisionUser(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await adminUserService.getAllUsers();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await adminUserService.getUserById(req.params.id);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await adminUserService.updateUser(req.params.id, req.body);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      const status = error.message === 'User not found' ? 404 : 400;
      res.status(status).json({ success: false, message: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      await adminUserService.deleteUser(req.params.id);
      res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      const status = error.message === 'User not found' ? 404 : 500;
      res.status(status).json({ success: false, message: error.message });
    }
  }
}

export default new UserController();
