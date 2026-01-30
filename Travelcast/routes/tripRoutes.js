const express = require("express");
const router = express.Router();
const { createTrip,getAllTrips,deleteTrip,updateTrip } = require("../controllers/tripController");
 
router.post("/create", createTrip);
router.get("/all", getAllTrips);
router.delete("/delete/:id", deleteTrip);
router.put("/update/:id", updateTrip);
 
module. exports = router;