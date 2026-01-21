const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

   
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

 
    const hashedPassword = await bcrypt.hash(password, 10);


    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 60 * 60 * 1000); 

   
    await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      isVerified: false,
      verificationToken,
      verificationTokenExpires,
    });

   
    const verificationLink = `http://localhost:3000/api/verify-email?token=${verificationToken}`;

    await sendEmail(
      email,
      "Verify your email",
      `
        <h3>Email Verification</h3>
        <p>Click the link below to verify your email:</p>
        <a href="${verificationLink}">Verify Email</a>
      `
    );

    return res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ msg: "User not found" });

    const isValidUser = await bcrypt.compare(password, user.password);
    if (!isValidUser) return res.status(400).json({ msg: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, role: user.role, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      msg: "User logged in successfully",
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ msg: "Error logging in user", error: error.message });
  }
};

module.exports = { registerUser, login };