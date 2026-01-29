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

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Homepage" });
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
