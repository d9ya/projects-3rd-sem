const express = require("express");
const router = express.Router();
 
// 🔍 DEBUG: confirm this file is loaded
console.log(" authRoutes.js loaded");
 
// Controllers
const { registerUser, loginUser } = require("../controllers/authController");
 
// 🔹 TEST ROUTE (TEMPORARY – VERY IMPORTANT)
router.get("/test", (req, res) => {
  res.json({ message: "Auth routes are working" });
});
 
// 🔹 Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
 
module.exports = router;