require('dotenv').config();
const express = require("express");
const cors = require('cors');

// Routes
const userRoutes = require('./routes/settingRoutes');
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require("./routes/tripRoutes");
const securityRoutes = require("./routes/securityRoutes");

const { connectDB, sequelize } = require('./database/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to TravelCast API" });
});

// Mount routes
app.use('/api/user', authRoutes);       // Auth routes
app.use('/api', userRoutes);            // User routes
app.use("/api/trips", tripRoutes);      // Trip routes
app.use('/api/security', securityRoutes); // Security routes



// Connect to database and start server
connectDB()
  .then(() => {
    console.log("Database connected...");
    console.log("Syncing database models...");
    return sequelize.sync({ alter: true }); // Sync all models
  })
  .then(() => {
    console.log("Database models synced successfully");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  });
