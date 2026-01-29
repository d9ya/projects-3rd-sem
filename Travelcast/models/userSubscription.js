const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");
const SubscriptionPlan = require("./subscriptionModel");

const UserSubscription = sequelize.define(
  "UserSubscription",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subscription_plan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
    start_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "user_subscriptions",
    timestamps: false,
  }
);

// Associations
UserSubscription.belongsTo(SubscriptionPlan, {
  foreignKey: "subscription_plan_id",
  as: "plan",
});

SubscriptionPlan.hasMany(UserSubscription, {
  foreignKey: "subscription_plan_id",
});

module.exports = UserSubscription;
