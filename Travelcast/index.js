require('dotenv').config();
const express = require("express");
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// API routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to TravelCast API" });
});

// User routes
app.use('/api', userRoutes);

// Server listening
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});