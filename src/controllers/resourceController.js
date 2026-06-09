import resourceService from '../services/resourceService.js';

class ResourceController {
  async getResources(req, res) {
    try {
      const userTrackId = req.user.trackId;
      
      if (!userTrackId) {
        return res.status(400).json({
          success: false,
          message: 'User is not enrolled in any track'
        });
      }

      const resources = await resourceService.getResourcesByTrack(userTrackId);

      res.status(200).json({
        success: true,
        data: { resources }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
}

export default new ResourceController();
