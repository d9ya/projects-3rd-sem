const express = require("express");
const app = express();
const { sequelize, connectDB } = require("./database/database");

app.use(express.json());

app.use("/api/user", require("./routes/auth.routes"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Homepage" });
});

const startServer = async () => {
  await connectDB();
  await sequelize.sync();

  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
};

startServer();
