// Models - database operations only per spec
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  lastActivity: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true }
}, { timestamps: true });

// Database operation: create session
sessionSchema.statics.createSession = async function(userId, token, expiresAt) {
  return await this.create({ userId, token, expiresAt });
};

// Database operation: find session by token
sessionSchema.statics.findByToken = async function(token) {
  return await this.findOne({ token }).populate('userId');
};

// Database operation: delete session
sessionSchema.statics.deleteSession = async function(token) {
  return await this.findOneAndDelete({ token });
};

// Database operation: update last activity
sessionSchema.statics.updateActivity = async function(token) {
  return await this.findOneAndUpdate(
    { token },
    { lastActivity: new Date() },
    { new: true }
  );
};

// Database operation: delete expired sessions
sessionSchema.statics.deleteExpiredSessions = async function() {
  return await this.deleteMany({ expiresAt: { $lt: new Date() } });
};

module.exports = mongoose.model('Session', sessionSchema);