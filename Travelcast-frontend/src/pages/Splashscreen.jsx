import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/Register");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      
      <div className="text-center animate-fadeIn">
        <img
          src="logo.png"
          alt="Travelcast Logo"
          className="w-[180px] mx-auto"
        />
      </div>

      {/* Tailwind custom animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 1.2s ease-in-out;
          }
        `}
      </style>
    </div>
  );
}
