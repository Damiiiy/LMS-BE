import Resource from '../../models/Resource.js';

class AdminResourceService {
  async createResource(data) {
    const resource = new Resource(data);
    return await resource.save();
  }

  async getAllResources() {
    return await Resource.find().populate('trackId').sort({ createdAt: -1 });
  }

  async getResourceById(id) {
    return await Resource.findById(id).populate('trackId');
  }

  async updateResource(id, data) {
    const resource = await Resource.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!resource) throw new Error('Resource not found');
    return resource;
  }

  async deleteResource(id) {
    const resource = await Resource.findByIdAndDelete(id);
    if (!resource) throw new Error('Resource not found');
    return resource;
  }
}

export default new AdminResourceService();
