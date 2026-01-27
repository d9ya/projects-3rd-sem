
const express = require("express");
const router = express.Router();

const { getAllUsers, deleteUserById } = require("../controllers/adminDashboardController");




router.get("/users", getAllUsers);


router.delete("/users/:id", deleteUserById);

module.exports = router;
