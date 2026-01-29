const express = require('express');
const router = express.Router();
const adminDashboardController = require('../controllers/adminDashboardController'); // make sure the file name matches exactly


router.get('/dashboard-stats', adminDashboardController.getDashboardStats);
router.get('/users', adminDashboardController.getAllUsers);
router.put('/users/:id', adminDashboardController.updateUserById);   // Update user
router.delete('/users/:id', adminDashboardController.deleteUserById); // Delete user

module.exports = router;
