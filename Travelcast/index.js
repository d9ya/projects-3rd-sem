require('dotenv').config();
const express = require("express");
const cors = require('cors');
const settingRoutes = require('./routes/settingRoutes');
const authRoutes = require('./routes/authRoutes');
const { connectDB } = require('./database/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// API routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to TravelCast API" });
});

// Auth routes
app.use('/api/user', authRoutes);

// User routes
app.use('/api', settingRoutes)
// app.use('/api', userRoutes);
app.use("/api/dashboard", require("./routes/dashboardRoutes"));


// Connect to database and start server
connectDB().then(() => {
  // Sync database models
  const { sequelize } = require('./database/database');
  
  // Sync all models with alter: true to update existing tables without losing data
  console.log("Syncing database models...");
  return sequelize.sync({ alter: true }); // Use alter to update existing tables without losing data
}).then(() => {
  console.log("Database models synced successfully");
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('Failed to connect to database:', error);
  process.exit(1);
});