const express = require("express");
const router = express.Router();

// Decide which controller to use
const useMock = process.env.USE_MOCK_DATA === "true";

const {
  getDashboardData,
  getTripHistory,
} = useMock
  ? require("../controllers/dashboardController.mock")
  : require("../controllers/dashboardController");

// Main dashboard endpoint
router.get("/dashboard", getDashboardData);

// Trip history endpoint
router.get("/trips/history", getTripHistory);

module.exports = router;