import adminCohortService from '../../services/admin/adminCohortService.js';

class CohortController {
  async createCohort(req, res) {
    try {
      const cohort = await adminCohortService.createCohort(req.body);
      res.status(201).json({ success: true, data: cohort });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAllCohorts(req, res) {
    try {
      const cohorts = await adminCohortService.getAllCohorts();
      res.status(200).json({ success: true, data: cohorts });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getCohortById(req, res) {
    try {
      const cohort = await adminCohortService.getCohortById(req.params.id);
      if (!cohort) return res.status(404).json({ success: false, message: 'Cohort not found' });
      res.status(200).json({ success: true, data: cohort });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateCohort(req, res) {
    try {
      const cohort = await adminCohortService.updateCohort(req.params.id, req.body);
      res.status(200).json({ success: true, data: cohort });
    } catch (error) {
      const status = error.message === 'Cohort not found' ? 404 : 400;
      res.status(status).json({ success: false, message: error.message });
    }
  }

  async deleteCohort(req, res) {
    try {
      await adminCohortService.deleteCohort(req.params.id);
      res.status(200).json({ success: true, message: 'Cohort deleted successfully' });
    } catch (error) {
      const status = error.message === 'Cohort not found' ? 404 : 500;
      res.status(status).json({ success: false, message: error.message });
    }
  }
}

export default new CohortController();
