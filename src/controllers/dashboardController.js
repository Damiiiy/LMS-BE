import dashboardService from '../services/dashboardService.js';

class DashboardController {
  async getDashboard(req, res) {
    try {
      const userId = req.user.id;
      
      const dashboardData = await dashboardService.getDashboardData(userId);

      res.status(200).json({
        success: true,
        data: dashboardData
      });
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({
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

export default new DashboardController();
