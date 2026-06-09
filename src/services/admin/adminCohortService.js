import Cohort from '../../models/Cohort.js';

class AdminCohortService {
  async createCohort(data) {
    const cohort = new Cohort(data);
    return await cohort.save();
  }

  async getAllCohorts() {
    return await Cohort.find().sort({ createdAt: -1 });
  }

  async getCohortById(id) {
    return await Cohort.findById(id);
  }

  async updateCohort(id, data) {
    const cohort = await Cohort.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!cohort) throw new Error('Cohort not found');
    return cohort;
  }

  async deleteCohort(id) {
    const cohort = await Cohort.findByIdAndDelete(id);
    if (!cohort) throw new Error('Cohort not found');
    return cohort;
  }
}

export default new AdminCohortService();
