const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken"); // <-- Missing import
const sendEmail = require("../utils/sendEmail");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "Required fields are missing: username, email, and password are required" });
    }

    // Set default role if not provided
    const userRole = role || 'user';
    
    const existingUser = await User.findOne({ where: { email } }); // Could fail if DB not connected
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Could throw

    const userData = { 
      username, 
      email, 
      password, 
      role: userRole
    };
    
    const newUser = await User.create(userData);
    res.status(201).json({ success: true, data: newUser });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
      
    const user = await User.findOne({ where: { email } });
    console.log('User found:', user ? 'Yes' : 'No');
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    
    const isValidUser = await bcrypt.compare(password, user.password);
    console.log('Password comparison result:', isValidUser);
    
    if (!isValidUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    console.log('Generating JWT token...');
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log('Token generated successfully');
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Error logging in user",
      error: error.message,
      stack: error.stack,
    });
  }
};

module.exports = { registerUser, login };
