const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

const Settings = sequelize.define(
  "Settings",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    notifications: {
      type: DataTypes.JSON,
      defaultValue: {
        email: true,
        push: true,
        sms: false
      }
    },
    privacy: {
      type: DataTypes.JSON,
      defaultValue: {
        profileVisibility: 'public',
        tripVisibility: 'friends',
        showEmail: false
      }
    },
    preferences: {
      type: DataTypes.JSON,
      defaultValue: {
        language: 'en',
        currency: 'USD',
        timezone: 'UTC',
        theme: 'light'
      }
    },
    security: {
      type: DataTypes.JSON,
      defaultValue: {
        twoFactorAuth: false,
        loginAlerts: true,
        sessionTimeout: 30
      }
    }
  },
  {
    tableName: "settings",
    timestamps: true,
  }
);

// Associate with User model
Settings.associate = (models) => {
  Settings.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user'
  });
};

module.exports = Settings;