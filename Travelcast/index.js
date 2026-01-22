require('dotenv').config();
const express = require("express");
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const { connectDB } = require('./database/database');

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

// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('Failed to connect to database:', error);
  process.exit(1);
});