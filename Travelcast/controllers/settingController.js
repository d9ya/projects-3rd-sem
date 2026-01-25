const User = require('../models/userModel');

const getUserProfile = async (req, res) => {
  try {
    // For now, we'll find a user by a known email
    // In a real app, you would get the user ID from the authenticated token
    const user = await User.findOne({ where: { email: 'john.doe@example.com' } });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: error.message
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    // For now, we'll update a user by a known email
    // In a real app, you would get the user ID from the authenticated token
    const { fullName, email, phoneNumber } = req.body;
    
    const [updatedRowsCount] = await User.update(
      { fullName, email, phoneNumber },
      { where: { email: 'john.doe@example.com' } }
    );
    
    if (updatedRowsCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Get the updated user
    const updatedUser = await User.findOne({ where: { email: email } });
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user profile',
      error: error.message
    });
  }
};

const getUserSettings = async (req, res) => {
  try {
    // For now, we'll find a user by a known email
    // In a real app, you would get the user ID from the authenticated token
    const user = await User.findOne({ where: { email: 'john.doe@example.com' } });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      preferences: user.preferences,
      security: user.security
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user settings',
      error: error.message
    });
  }
};

const subscribeUser = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    
    // For now, we'll find a user by a known email
    // In a real app, you would get the user ID from the authenticated token
    const user = await User.findOne({ where: { email: 'john.doe@example.com' } });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Update user subscription info
    user.subscription = {
      planId,
      startDate: new Date(),
      status: 'active'
    };
    
    await user.save();
    
    res.json({
      success: true,
      message: 'Subscribed successfully',
      data: {
        userId: user.id,
        planId,
        subscription: user.subscription
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error subscribing user',
      error: error.message
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'New passwords do not match'
      });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }
    
    // For now, we'll find a user by a known email
    // In a real app, you would get the user ID from the authenticated token
    const user = await User.findOne({ where: { email: 'john.doe@example.com' } });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if current password matches
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }
    
    // Update password
    user.password = newPassword;
    user.security.lastPasswordChange = new Date();
    await user.save();
    
    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error changing password',
      error: error.message
    });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUserSettings,
  changePassword,
  subscribeUser
};