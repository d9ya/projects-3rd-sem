const express = require("express");
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

const {
  getUserProfile,
  updateUserProfile,
  changePassword,
  subscribeUser
} = require("../controllers/settingController");


router.get("/profile", authenticateToken, getUserProfile);
router.put("/profile", authenticateToken, updateUserProfile);

router.put("/change-password", authenticateToken, changePassword);

router.post("/subscribe", authenticateToken, subscribeUser);

module.exports = router;
