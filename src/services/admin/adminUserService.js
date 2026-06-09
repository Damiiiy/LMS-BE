import User from '../../models/User.js';
import bcrypt from 'bcrypt';

class AdminUserService {
  async provisionUser(data) {
    // Generate a secure random password if not provided
    const password = data.password || Math.random().toString(36).slice(-10);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      ...data,
      password: hashedPassword
    });

    const savedUser = await user.save();
    
    // Convert to object and inject the plain text password so admin can send it
    const userObj = savedUser.toObject();
    delete userObj.password;
    userObj.generatedPassword = password;
    
    return userObj;
  }

  async getAllUsers() {
    return await User.find().populate('trackId').select('-password').sort({ createdAt: -1 });
  }

  async getUserById(id) {
    return await User.findById(id).populate('trackId').select('-password');
  }

  async updateUser(id, data) {
    // Prevent password updates through this method
    const safeData = { ...data };
    delete safeData.password;

    const user = await User.findByIdAndUpdate(id, safeData, { new: true, runValidators: true }).select('-password');
    if (!user) throw new Error('User not found');
    return user;
  }

  async deleteUser(id) {
    const user = await User.findByIdAndDelete(id).select('-password');
    if (!user) throw new Error('User not found');
    return user;
  }
}

export default new AdminUserService();
