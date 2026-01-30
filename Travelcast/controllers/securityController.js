const SecurityModel = require("../models/securityModel");
 
const setupSecurityAnswer = async (req, res) => {
  try {
    const { userId, question1, answer1, question2, answer2, question3, answer3, question4, answer4 } = req.body;
 
    // 1. Validation check
    if (!userId || !question1 || !answer1 || !question2 || !answer2 || !question3 || !answer3 || !question4 || !answer4) {
      return res.status(400).json({
        message: "User ID and all security questions/answers are required",
      });
    }
 
    // 2. Call the model passing an OBJECT
    await SecurityModel.setupSecurityAnswer({
      userId,
      question1,
      answer1,
      question2,
      answer2,
      question3,
      answer3,
      question4,
      answer4
    });
 
    res.status(201).json({
      message: "Security questions saved successfully",
    });
  } catch (error) {
    // This will now show you the SPECIFIC error in your terminal
    console.error("Security setup error:", error);
    res.status(500).json({
      message: "Internal server error",
      details: error.message // Helpful for debugging
    });
  }
};
 
module.exports = { setupSecurityAnswer };