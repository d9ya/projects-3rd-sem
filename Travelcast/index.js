const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoutes");
const tripRoutes = require("./routes/tripRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

const { connectDB, sequelize } = require("./database/database");

const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/subscriptions/", subscriptionRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Homepage" });
});

const startServer = async () => {
  await connectDB();
  await sequelize.sync();

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};

startServer();
