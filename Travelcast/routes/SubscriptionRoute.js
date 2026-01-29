const express = require("express");
const router = express.Router();

const {
  subscribePlan,
  getUserSubscriptions,
} = require("../controllers/subscriptionController");

router.post("/subscribe", subscribePlan);
router.get("/user/:userId", getUserSubscriptions);

module.exports = router;
