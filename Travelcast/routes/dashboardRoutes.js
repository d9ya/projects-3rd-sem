const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");

const useMock = process.env.USE_MOCK_DATA === "true";
const controller = useMock
  ? require("../controllers/dashboardController.mock")
  : require("../controllers/dashboardController");

router.get("/", authenticateToken, controller.getDashboardData);
router.get("/trips/history", authenticateToken, controller.getTripHistory);

module.exports = router;
