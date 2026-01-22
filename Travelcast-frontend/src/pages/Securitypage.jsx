import React, { useState } from "react";
import { subscribeUserApi } from "../services/api"; // ✅ use the correct API function

export default function Subscriptionpage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const plans = [
    {
      id: 1,
      name: "Basic",
      price: 200,
      features: ["Weather forecast updates", "Basic travel tips"],
    },
    {
      id: 2,
      name: "Standard",
      price: 400,
      features: [
        "Advanced weather insights",
        "Personalized travel suggestions",
      ],
    },
    {
      id: 3,
      name: "Premium",
      price: 700,
      features: [
        "Real-time weather alerts",
        "Full travel planner integration",
        "24/7 support",
      ],
    },
  ];

  const handleSubscribe = async (planId, planName) => {
    if (!user) {
      setMessage("Please login to subscribe.");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);
      setMessage("");

      await subscribeUserApi({
        userId: user.id,
        planId,
      });

      setMessage(`${planName} plan subscribed successfully! 🎉`);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Subscription failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      height: "100vh",
      width: "100%",
      background: "url('background.png') no-repeat center/cover",
      padding: "40px",
      fontFamily: "Arial, sans-serif",
      color: "#000",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "30px",
    },
    plansWrapper: {
      display: "flex",
      gap: "40px",
      marginTop: "20px",
      flexWrap: "wrap",
    },
    card: {
      width: "250px",
      padding: "30px",
      border: "1px solid black",
      background: "rgba(255, 255, 255, 0.4)",
      backdropFilter: "blur(4px)",
    },
    planTitle: {
      fontSize: "22px",
      fontWeight: "700",
      marginBottom: "10px",
    },
    price: {
      fontSize: "20px",
      fontWeight: "700",
      marginBottom: "20px",
    },
    features: {
      listStyle: "none",
      padding: 0,
      marginBottom: "25px",
      color: "rgb(34, 90, 160)",
      fontSize: "14px",
    },
    btn: {
      width: "100%",
      padding: "10px",
      border: "1px solid #333",
      background: "transparent",
      cursor: "pointer",
      fontSize: "15px",
      opacity: loading ? 0.6 : 1,
    },
    message: {
      marginTop: "20px",
      fontWeight: "600",
      color: "green",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Choose the best plan for you</h1>

      <div style={styles.plansWrapper}>
        {plans.map((plan) => (
          <div style={styles.card} key={plan.id}>
            <div style={styles.planTitle}>{plan.name}</div>
            <div style={styles.price}>
              NPR <br />
              {plan.price}/mo
            </div>

            <ul style={styles.features}>
              {plan.features.map((feature, idx) => (
                <li key={idx}>• {feature}</li>
              ))}
            </ul>

            <button
              style={styles.btn}
              disabled={loading}
              onClick={() => handleSubscribe(plan.id, plan.name)}
            >
              {loading ? "Processing..." : "Subscribe"}
            </button>
          </div>
        ))}
      </div>

      {message && <div style={styles.message}>{message}</div>}
    </div>
  );
}
