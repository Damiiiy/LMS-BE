// Models - database operations only per spec
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  trackId: { type: mongoose.Schema.Types.ObjectId, ref: 'Track' },
  role: { type: String, enum: ['forger', 'admin'], default: 'forger' },
  isApproved: { type: Boolean, default: false }
}, { timestamps: true });

// Database operation: find user by email
userSchema.statics.findByEmail = async function(email) {
  return await this.findOne({ email });
};

// Database operation: compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);