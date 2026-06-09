import adminResourceService from '../../services/admin/adminResourceService.js';

class ResourceController {
  async createResource(req, res) {
    try {
      const resource = await adminResourceService.createResource(req.body);
      res.status(201).json({ success: true, data: resource });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAllResources(req, res) {
    try {
      const resources = await adminResourceService.getAllResources();
      res.status(200).json({ success: true, data: resources });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getResourceById(req, res) {
    try {
      const resource = await adminResourceService.getResourceById(req.params.id);
      if (!resource) return res.status(404).json({ success: false, message: 'Resource not found' });
      res.status(200).json({ success: true, data: resource });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateResource(req, res) {
    try {
      const resource = await adminResourceService.updateResource(req.params.id, req.body);
      res.status(200).json({ success: true, data: resource });
    } catch (error) {
      const status = error.message === 'Resource not found' ? 404 : 400;
      res.status(status).json({ success: false, message: error.message });
    }
  }

  async deleteResource(req, res) {
    try {
      await adminResourceService.deleteResource(req.params.id);
      res.status(200).json({ success: true, message: 'Resource deleted successfully' });
    } catch (error) {
      const status = error.message === 'Resource not found' ? 404 : 500;
      res.status(status).json({ success: false, message: error.message });
    }
  }
}

export default new ResourceController();
