import Resource from '../models/Resource.js';

class ResourceService {
  async getResourcesByTrack(trackId) {
    if (!trackId) {
      throw new Error('Track ID is required');
    }

    const resources = await Resource.find({ trackId }).sort({ createdAt: -1 });
    return resources;
  }
}

export default new ResourceService();
