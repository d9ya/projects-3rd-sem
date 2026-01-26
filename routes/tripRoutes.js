const express = require("express");
const router = express.Router();

const { createTrip } = require("../controllers/tripController");

router.post("/create", createTrip);

module.exports = router;
