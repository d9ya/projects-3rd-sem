const UserSubscription = require("../models/userSubscription");
const SubscriptionPlan = require("../models/subscriptionModel");

// -------------------------------
// Subscribe user to a plan
// -------------------------------
const subscribePlan = async (req, res) => {
  try {
    let { userId, planId } = req.body;

    // Parse IDs safely
    userId = Number(userId);
    planId = Number(planId);

    if (!userId || !planId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Plan ID are required",
      });
    }

    // ✅ Check if plan exists
    const plan = await SubscriptionPlan.findByPk(planId);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Subscription plan not found",
      });
    }

    // Check active subscription
    const existing = await UserSubscription.findOne({
      where: {
        user_id: userId,
        status: "active",
      },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "User already has an active subscription",
      });
    }

    const subscription = await UserSubscription.create({
      user_id: userId,
      subscription_plan_id: planId,
      status: "active",
    });

    res.status(201).json({
      success: true,
      message: "Subscription successful",
      subscription,
    });
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// -------------------------------
// Get user subscriptions
// -------------------------------
const getUserSubscriptions = async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const subscriptions = await UserSubscription.findAll({
      where: { user_id: userId },
      include: [
        {
          model: SubscriptionPlan,
          as: "plan",
          attributes: ["name", "price", "duration"],
        },
      ],
      order: [["start_date", "DESC"]],
    });

    res.status(200).json({
      success: true,
      subscriptions,
    });
  } catch (error) {
    console.error("Get subscriptions error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { subscribePlan, getUserSubscriptions };
