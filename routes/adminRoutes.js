const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  deleteUserById,
} = require("../controllers/admindashboardController");

router.get("/users", getAllUsers);
router.delete("/user/:id", deleteUserById);

module.exports = router;
