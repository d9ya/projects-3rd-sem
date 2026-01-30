const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");
 
const PackingItem = sequelize.define(
  "PackingItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    item_name: {                
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_checked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true },
  },
  {
    tableName: "packing_items",
    timestamps: false,
    underscored: true          
  }
);
 
module.exports = PackingItem;
 