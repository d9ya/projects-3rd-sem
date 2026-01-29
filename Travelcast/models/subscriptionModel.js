const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

const SubscriptionPlan = sequelize.define(
  "SubscriptionPlan",
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
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING, // monthly, yearly
      allowNull: false,
    },
  },
  {
    tableName: "subscription_plans",
    timestamps: false,
  }
);

module.exports = SubscriptionPlan;
