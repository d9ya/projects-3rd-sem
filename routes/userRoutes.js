const express = require("express");
const router = express.Router();
// 1. Ensure forgotPassword and resetPassword are added here
const { 
    registerUser, 
    loginUser, 
    getMe, 
    forgotPassword, 
    resetPassword 
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", getMe);

// 2. New routes for the cards we built
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;