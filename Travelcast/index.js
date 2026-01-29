require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");

// Routes
const userRoutes = require("./routes/userRoutes");
const tripRoutes = require("./routes/tripRoutes");

const SubscriptionRoute = require("./routes/SubscriptionRoute");

// DB
const { connectDB, sequelize } = require("./database/database");

// Models
const SubscriptionPlan = require("./models/subscriptionModel");


app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.json());


app.use("/api/user", userRoutes);
app.use("/api/trips", tripRoutes);

app.use("/api/subscription", SubscriptionRoute);

const cors = require('cors');
const settingRoutes = require('./routes/settingRoutes');

// Routes
const userRoutes = require('./routes/settingRoutes');
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require("./routes/tripRoutes");
const securityRoutes = require("./routes/securityRoutes");

const { connectDB, sequelize } = require('./database/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Root routeb

app.get("/", (req, res) => {
  res.json({ message: "Welcome to TravelCast API" });
});


async function seedPlans() {
  const plans = await SubscriptionPlan.findAll();

  if (plans.length === 0) {
    await SubscriptionPlan.bulkCreate([
      { id: 1, name: "Basic", price: 200, duration: "monthly" },
      { id: 2, name: "Standard", price: 400, duration: "monthly" },
      { id: 3, name: "Premium", price: 700, duration: "monthly" },
    ]);

    console.log("Subscription plans seeded");
  } else {
    console.log("Subscription plans already exist");
  }
}


const startServer = async () => {
  try {
    await connectDB();
    console.log(" Database connected");

    await sequelize.sync();
    console.log(" Models synced");

    await seedPlans(); 

    app.listen(3000, () => {
      console.log(" Server is running on port 3000");
    });
  } catch (error) {
    console.error(" Server failed to start:", error);
  }
};

startServer();
// Mount routes
app.use('/api/user', authRoutes);       // Auth routes
app.use('/api', userRoutes);            // User routes
app.use("/api/trips", tripRoutes);      // Trip routes
app.use('/api/security', securityRoutes); // Security routes


// User routes
app.use('/api', settingRoutes)
// app.use('/api', userRoutes);
app.use("/api/dashboard", require("./routes/dashboardRoutes"));


// Connect to database and start server
connectDB().then(() => {
  // Sync database models
  const { sequelize } = require('./database/database');
  return sequelize.sync({ alter: true }); // Use alter to update existing tables without losing data
}).then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

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
