import mongoose from 'mongoose';

const cohortSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  totalWeeks: { type: Number, required: true, default: 12 }
}, { timestamps: true });

export default mongoose.model('Cohort', cohortSchema);
