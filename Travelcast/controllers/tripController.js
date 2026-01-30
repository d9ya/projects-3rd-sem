// tripController.js
const Trip = require("../models/tripModel");

// =====================
// CREATE TRIP
// =====================
const createTrip = async (req, res) => {
  try {
    const { name, destination, startDate, endDate, travelers, note, weather } = req.body;

    // 1️⃣ Required fields check
    if (!name || !destination || !startDate || !endDate) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // 2️⃣ Date validation
    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ message: "Start date cannot be after end date" });
    }

    // 3️⃣ Create trip associated with the logged-in user
    const newTrip = await Trip.create({
      name,
      destination,
      startDate,
      endDate,
      travelers,
      note,
      weather,
      userId: req.user.id, // <-- associate trip with the logged-in user
    });

    res.status(201).json({
      message: "Trip created successfully",
      trip: newTrip,
    });
  } catch (error) {
    console.error("CREATE TRIP ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// GET ALL TRIPS (User-Specific)
// =====================
const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll({
      where: { userId: req.user.id }, // <-- fetch only trips for logged-in user
      order: [["createdAt", "DESC"]],
    });

    res.json(trips);
  } catch (err) {
    console.error("GET TRIPS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch trips" });
  }
};

// =====================
// DELETE TRIP (User-Specific)
// =====================
const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    // Ensure the trip belongs to the logged-in user
    if (trip.userId !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to delete this trip" });
    }

    await trip.destroy({ force: true });
    res.json({ message: "Trip deleted successfully" });
  } catch (err) {
    console.error("DELETE TRIP ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};

// =====================
// UPDATE TRIP (User-Specific)
// =====================
const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    // Ensure the trip belongs to the logged-in user
    if (trip.userId !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to update this trip" });
    }

    await trip.update(req.body);
    res.json({ message: "Trip updated successfully", trip });
  } catch (err) {
    console.error("UPDATE TRIP ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
};

module.exports = {
  createTrip,
  getAllTrips,
  deleteTrip,
  updateTrip,
};
