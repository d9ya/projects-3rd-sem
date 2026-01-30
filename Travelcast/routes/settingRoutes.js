const express = require("express");
const router = express.Router();
const { setupSecurityAnswer } = require("../controllers/securityController");
const authMiddleware = require("../middleware/authMiddleware");
 
router.post("/setup", authMiddleware, setupSecurityAnswer);
 
module.exports = router;
 