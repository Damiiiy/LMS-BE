import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  cohortId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cohort', required: true },
  youtubePlaylistUrl: { type: String }
}, { timestamps: true });

export default mongoose.model('Track', trackSchema);
