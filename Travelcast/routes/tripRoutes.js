const express = require("express");
const router = express.Router();

const { 
  createTrip, 
  getUserTrips, 
  getTripById, 
  updateTrip, 
  deleteTrip 
} = require("../controllers/tripController.simple");

// Trip routes
router.post("/create", createTrip);
router.get("/", getUserTrips);
router.get("/:id", getTripById);
router.put("/:id", updateTrip);
router.delete("/:id", deleteTrip);

module.exports = router;
