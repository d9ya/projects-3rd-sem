import React, { useState } from "react";
import { subscribeUserApi } from "../services/api";

export default function Subscriptionpage() {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Get loggin user
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id || user?.user_id;

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
    if (!userId) {
      setIsError(true);
      setMessage("Please login to subscribe.");
      return;
    }

    try {
      const res = await subscribeUserApi({ userId, planId });

      if (res?.data?.success) {
        setIsError(false);
        setMessage(`${planName} plan subscribed successfully!`);
      } else {
        setIsError(true);
        setMessage(res?.data?.message || "Subscription failed");
      }
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || "Subscription failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[url('/background.png')] bg-cover bg-center px-10 py-10 font-sans text-black">
      
      <h1 className="text-3xl font-bold mb-8">
        The best plan for you!!
      </h1>

      { /* Plans */}
      <div className="flex flex-wrap gap-10">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="w-[250px] p-8 border border-black bg-white/40 backdrop-blur-md"
          >
            <h2 className="text-xl font-bold mb-2">
              {plan.name}
            </h2>

            <div className="text-lg font-bold mb-5">
              NPR <br />
              {plan.price}/mo
            </div>

            <ul className="mb-6 text-sm text-blue-700 space-y-1">
              {plan.features.map((feature, idx) => (
                <li key={idx}>- {feature}</li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.id, plan.name)}
              className="w-full py-2 border border-gray-700 text-sm hover:bg-black hover:text-white transition"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mt-5 font-semibold ${
            isError ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
