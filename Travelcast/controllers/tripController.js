const Trip = require("../models/tripModel");

// CREATE TRIP
const createTrip = async (req, res) => {
  try {
    const { name, destination, startDate, endDate, travelers, note, weather } = req.body;

    // 1️⃣ Required fields check
    if (!name || !destination || !startDate || !endDate) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    // 2️⃣ Date validation (ADD HERE 👇)
    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({
        message: "Start date cannot be after end date",
      });
    }

    // 3️⃣ Create trip
    const newTrip = await Trip.create({
      name,
      destination,
      startDate,
      endDate,
      travelers,
      note,
      weather,
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

// GET ALL TRIPS
const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch trips" });
  }
};

// DELETE TRIP
const deleteTrip = async (req, res) => {
  console.log("🔥 DELETE HIT:", req.params.id);

  try {
    const trip = await Trip.findByPk(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    await trip.destroy({ force: true });
    res.json({ message: "Trip deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};


// UPDATE TRIP
const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    await trip.update(req.body);
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

module.exports = {
  createTrip,
  getAllTrips,
  deleteTrip,
  updateTrip,
};
