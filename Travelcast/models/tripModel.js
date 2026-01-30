// tripModel.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");
const User = require("./userModel");

const Trip = sequelize.define("Trip", {
  name: { type: DataTypes.STRING, allowNull: false },
  destination: { type: DataTypes.STRING, allowNull: false },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
  travelers: { type: DataTypes.STRING },
  note: { type: DataTypes.TEXT },
  weather: { type: DataTypes.STRING },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

// Associations
Trip.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Trip, { foreignKey: "userId" });

module.exports = Trip;
