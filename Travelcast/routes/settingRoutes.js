const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getUserSettings,
  changePassword,
  subscribeUser
} = require('../controllers/settingController');

// Profile routes
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

// Settings routes
router.get('/settings', getUserSettings);

// Password routes
router.put('/change-password', changePassword);

// Subscription routes
router.post('/subscribe', subscribeUser);

module.exports = router;