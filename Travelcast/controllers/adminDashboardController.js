const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Admin dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalAdmins = await User.count({ where: { role: "admin" } });
    const totalUsersOnly = await User.count({ where: { role: "user" } });

    res.json({
      success: true,
      stats: { totalUsers, totalAdmins, totalUsersOnly },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all users (ADMIN)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "role"],
    });
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update user by admin
const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    const user = await User.findByPk(id);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    let hashedPassword = user.password;
    if (password) hashedPassword = await bcrypt.hash(password, 10);

    await user.update({
      username: username || user.username,
      email: email || user.email,
      password: hashedPassword,
      role: role || user.role,
    });

    res.json({
      success: true,
      message: "User updated successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete user by admin
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    await user.destroy();
    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  updateUserById,
  deleteUserById,
};