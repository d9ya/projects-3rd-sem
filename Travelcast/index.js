require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// =====================
// Database
// =====================
const { connectDB, sequelize } = require("./database/database");

// =====================
// Models
// =====================
const SubscriptionPlan = require("./models/subscriptionModel");
const Trip = require("./models/tripModel"); // Make sure you have this imported

// =====================
// Routes
// =====================
const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoute");
const settingRoutes = require("./routes/settingRoutes");
const securityRoutes = require("./routes/securityRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const packingRoutes = require("./routes/packingRoutes"); 

// =====================
// Middleware
// =====================
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());

// =====================
// Routes Mounting
// =====================
app.get("/", (req, res) => {
  res.json({ message: "Welcome to TravelCast API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/security", securityRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/packing", packingRoutes); 

// =====================
// Seed Subscription Plans
// =====================
async function seedPlans() {
  const plans = await SubscriptionPlan.findAll();

  if (plans.length === 0) {
    await SubscriptionPlan.bulkCreate([
      { name: "Basic", price: 200, duration: "monthly" },
      { name: "Standard", price: 400, duration: "monthly" },
      { name: "Premium", price: 700, duration: "monthly" },
    ]);
    console.log("Subscription plans seeded");
  } else {
    console.log("Subscription plans already exist");
  }
}

// =====================
// Start Server
// =====================
const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected");

    // Initial sync (without altering NOT NULL columns)
    await sequelize.sync();
    console.log("Models initially synced");

    // =====================
    // Fix trips.user_id safely
    // =====================
    await sequelize.query(`
      ALTER TABLE trips ADD COLUMN IF NOT EXISTS user_id INTEGER;
    `);

    await sequelize.query(`
      UPDATE trips SET user_id = 1 WHERE user_id IS NULL;
    `);

    await sequelize.query(`
      ALTER TABLE trips ALTER COLUMN user_id SET NOT NULL;
    `);

    console.log("Trips table user_id column fixed");

    // Seed subscription plans
    await seedPlans();

    app.listen(3000, () => {
      console.log(`Server running on http://localhost:3000`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
