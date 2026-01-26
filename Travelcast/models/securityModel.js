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


SecurityAnswer.setupSecurityAnswer = async (userId, Q1, Ans1, Q2, Ans2, Q3, Ans3, Q4, Ans4) => {
  await SecurityAnswer.create({
    user_id: userId,
    question1: Q1,
    answer1: Ans1,
    question2: Q2,
    answer2: Ans2,
    question3: Q3,
    answer3: Ans3,
    question4: Q4,
    answer4: Ans4,
  });
};

module.exports = SecurityAnswer;
