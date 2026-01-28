const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

const Trip = sequelize.define(
  "Trip",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    travelers: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    note: {
      type: DataTypes.TEXT,
    },
    weather: {
      type: DataTypes.STRING,
    },

    temp: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "trips",
    timestamps: true,
  }
);

module.exports = Trip;
