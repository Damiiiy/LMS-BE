import Track from '../../models/Track.js';

class AdminTrackService {
  async createTrack(data) {
    const track = new Track(data);
    return await track.save();
  }

  async getAllTracks() {
    return await Track.find().populate('cohortId').sort({ createdAt: -1 });
  }

  async getTrackById(id) {
    return await Track.findById(id).populate('cohortId');
  }

  async updateTrack(id, data) {
    const track = await Track.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!track) throw new Error('Track not found');
    return track;
  }

  async deleteTrack(id) {
    const track = await Track.findByIdAndDelete(id);
    if (!track) throw new Error('Track not found');
    return track;
  }
}

export default new AdminTrackService();
