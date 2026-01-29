const SecurityModel = require("../models/securityModel");

const setupSecurityAnswer = async (req, res) => {
  try {
    const userId = req.body.userId; 
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const { question1, answer1, question2, answer2, question3, answer3, question4, answer4 } = req.body;

    
    if (!question1 || !answer1 || !question2 || !answer2 || !question3 || !answer3 || !question4 || !answer4) {
      return res.status(400).json({
        message: "All security questions and answers are required",
      });
    }

    // Save all 4 questions at once
    await SecurityModel.setupSecurityAnswer(
      userId,
      question1,
      answer1,
      question2,
      answer2,
      question3,
      answer3,
      question4,
      answer4
    );

    res.status(201).json({
      message: "Security questions saved successfully",
    });
  } catch (error) {
    console.error("Security setup error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  setupSecurityAnswer,
};
