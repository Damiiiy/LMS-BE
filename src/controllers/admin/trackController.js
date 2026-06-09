import adminTrackService from '../../services/admin/adminTrackService.js';

class TrackController {
  async createTrack(req, res) {
    try {
      const track = await adminTrackService.createTrack(req.body);
      res.status(201).json({ success: true, data: track });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAllTracks(req, res) {
    try {
      const tracks = await adminTrackService.getAllTracks();
      res.status(200).json({ success: true, data: tracks });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getTrackById(req, res) {
    try {
      const track = await adminTrackService.getTrackById(req.params.id);
      if (!track) return res.status(404).json({ success: false, message: 'Track not found' });
      res.status(200).json({ success: true, data: track });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateTrack(req, res) {
    try {
      const track = await adminTrackService.updateTrack(req.params.id, req.body);
      res.status(200).json({ success: true, data: track });
    } catch (error) {
      const status = error.message === 'Track not found' ? 404 : 400;
      res.status(status).json({ success: false, message: error.message });
    }
  }

  async deleteTrack(req, res) {
    try {
      await adminTrackService.deleteTrack(req.params.id);
      res.status(200).json({ success: true, message: 'Track deleted successfully' });
    } catch (error) {
      const status = error.message === 'Track not found' ? 404 : 500;
      res.status(status).json({ success: false, message: error.message });
    }
  }
}

export default new TrackController();
