const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getUserSettings,
  changePassword
} = require('../controllers/userController');

// Profile routes
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

// Settings routes
router.get('/settings', getUserSettings);

// Password routes
router.put('/change-password', changePassword);

module.exports = router;