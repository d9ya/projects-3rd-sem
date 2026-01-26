const Trip = require("../models/tripModel");

// CREATE TRIP
const createTrip = async (req, res) => {
  try {
    const { name, destination, startDate, endDate, travelers, note } = req.body;

    // Guard clause – stop bad data early
    if (!name || !destination || !startDate || !endDate) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    const newTrip = await Trip.create({
      name,
      destination,
      startDate,
      endDate,
      travelers,
      note,
    });

    res.status(201).json({
      message: "Trip created successfully",
      trip: newTrip,
    });
  } catch (error) {
   
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createTrip,
};
