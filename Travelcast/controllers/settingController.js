const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: {
        fullName: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user profile",
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { fullName, email, phoneNumber } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (fullName) user.username = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: {
        fullName: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {

    if (error.name === 'SequelizeUniqueConstraintError') {
      const fieldName = error.fields ? Object.keys(error.fields)[0] : '';
      if (fieldName === 'phoneNumber') {
        return res.status(409).json({
          success: false,
          message: "This phone number is already exist",
        });
      } else if (fieldName === 'email') {
        return res.status(409).json({
          success: false,
          message: "This email is already registered",
        });
      }
    }
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message || "Invalid input data",
      });
    }
    res.status(500).json({
      success: false,
      message: "Error updating profile",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All password fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }
    await user.update({ password: newPassword });
   
 res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error changing password",
    });
  }
};
const subscribeUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const { planId } = req.body;

    if (!planId) {
      return res.status(400).json({
        success: false,
        message: "Plan ID is required",
      });
    }

    const user = await User.findByPk(req.user.id);

    user.subscription = {
      planId,
      status: "active",
      startDate: new Date(),
    };

    await user.save();

    res.json({
      success: true,
      message: "Subscribed successfully",
      data: user.subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error subscribing user",
    });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  changePassword,
  subscribeUser,
};
