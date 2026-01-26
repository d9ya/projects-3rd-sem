const express = require("express");
const router = express.Router();

const {
  registerUser,
  login,
} = require("../controllers/authcontroller");

router.post("/register", registerUser);
router.post("/loginUser", login);

module.exports = router;
