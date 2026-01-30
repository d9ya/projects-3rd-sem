const express = require("express");
const router = express.Router();
const { setupSecurityAnswers } = require("../controllers/securityController");
const authMiddleware = require("../middleware/authMiddleware");
 
router.post("/setup", authMiddleware, setupSecurityAnswers);
 
module.exports = router;