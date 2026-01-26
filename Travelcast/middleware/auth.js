const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticateToken = async (req, res, next) => {
  try {
    console.log('Authentication middleware called');
    console.log('Authorization header:', req.headers['authorization']);

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      console.log('No token provided');
      return res.status(401).json({
        success: false,
        message: 'Access token is required'
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', decoded);

    // Find user by ID from token, excluding password for security
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] } // Don't include password in req.user for general use
    });

    console.log('User found from token:', user ? 'Yes' : 'No');

    if (!user) {
      console.log('User not found in database');
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    req.user = user;
    console.log('User attached to request, proceeding...');
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

module.exports = { authenticateToken };