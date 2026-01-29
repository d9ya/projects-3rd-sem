// index.js
require("dotenv").config(); // Load .env variables
const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Route imports
const userRoutes = require("./routes/userRoutes");       // User routes
const tripRoutes = require("./routes/tripRoutes");       // Trip routes
const adminRoutes = require("./routes/adminRoutes");      // Admin routes (match filename exactly)

// ✅ Database
const { connectDB, sequelize } = require("./database/database");

// ✅ Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], // Vite dev servers
  credentials: true,
}));
app.use(express.json());

// ✅ API Routes
app.use("/api/users", userRoutes);   // User APIs
app.use("/api/trips", tripRoutes);   // Trip APIs
app.use("/api/admin", adminRoutes);  // Admin APIs

// ✅ Test root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Homepage" });
});

// ✅ Start Server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Sync models (for dev)
    await sequelize.sync({ alter: true }); // alter:true keeps schema updated

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
