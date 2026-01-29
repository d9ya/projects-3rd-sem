const express = require("express");
const router = express.Router();

const { authenticateToken } = require('../middleware/auth');
const useMock = process.env.USE_MOCK_DATA === "true";

const {
  getDashboardData,
  getTripHistory,
} = useMock
  ? require("../controllers/dashboardController.mock")
  : require("../controllers/dashboardController");

// Main dashboard endpoint
router.get("/dashboard", authenticateToken, getDashboardData);
router.get("/trips/history", authenticateToken, getTripHistory);

module.exports = router;