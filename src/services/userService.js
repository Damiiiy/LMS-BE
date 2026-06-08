import User from '../models/User.js';

class UserService {
  async updateProfile(userId, { nickname, phoneNumber }) {
    const updateData = {};
    if (nickname !== undefined) updateData.nickname = nickname;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;

    if (Object.keys(updateData).length === 0) {
      throw new Error('No valid fields provided for update');
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');
    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  }
}

export default new UserService();
