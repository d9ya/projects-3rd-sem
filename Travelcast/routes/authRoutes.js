const express = require('express');
const router = express.Router();
const { registerUser, login } = require('../controllers/authController');

// Auth routes
router.post('/register', registerUser);
router.post('/loginUser', login);

module.exports = router;