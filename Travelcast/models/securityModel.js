const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");
 
const SecurityAnswer = sequelize.define(
  "SecurityAnswer",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    question1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question4: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer4: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "security_answers",
    timestamps: false,
    underscored: true,
  }
);
 
 
SecurityAnswer.setupSecurityAnswer = async (data) => {
  // upsert will Update if the user_id exists, or Insert if it doesn't
  return await SecurityAnswer.upsert({
    user_id: data.userId,
    question1: data.question1,
    answer1: data.answer1,
    question2: data.question2,
    answer2: data.answer2,
    question3: data.question3,
    answer3: data.answer3,
    question4: data.question4,
    answer4: data.answer4,
  });
};
 
module.exports = SecurityAnswer;