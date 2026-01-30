import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createUserApi } from "../services/api";

export default function Registerpage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ------------------------------
  // Form Validation
  // ------------------------------
  const validateForm = () => {
    if (username.trim().length < 2) return "Username must be at least 2 characters.";
    if (!email.includes("@")) return "Please enter a valid email.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  // ------------------------------
  // Handle Registration
  // ------------------------------
  const handleRegistration = async (e) => {
    e.preventDefault();
    if (loading) return;

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await createUserApi({ username, email, password, role: "user" });

      // ✅ Correct path to user ID
      const newUserId = res?.data?.data?.user?.id;

      if (newUserId) {
        localStorage.setItem("newUserId", newUserId);
        console.log("Saved User ID:", newUserId);
      } else {
        console.warn("User ID not found in response:", res?.data);
      }

      toast.success(res?.data?.message || "Account created successfully!");
      navigate("/security");
    } catch (err) {
      const msg = err?.response?.data?.message || "Registration failed";
      setError(msg);
      toast.error(msg);
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('backgroundimg.png')" }}
    >
      {/* Logo */}
      <img
        src="logo.png"
        alt="Logo"
        className="absolute top-5 left-5 w-36 opacity-90"
      />

      {/* Form Container */}
      <div className="w-[520px] p-12 rounded-[60px] bg-white/30 backdrop-blur-[12px] shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-6">Create Account</h2>
        <p className="text-base mb-8">Welcome to Travelcast</p>

        {error && (
          <div className="text-red-500 text-sm mb-4 font-medium">{error}</div>
        )}

        <form onSubmit={handleRegistration} className="space-y-6">
          {/* Username */}
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            placeholder="Username"
            className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/60 text-lg"
            required
          />

          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="Email"
            className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/60 text-lg"
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Password"
              className="w-full px-5 py-3 rounded-full border border-gray-300 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/60 text-lg"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 text-lg"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full text-white font-semibold hover:opacity-90 disabled:opacity-60 text-lg transition-all duration-200"
            style={{ backgroundColor: "#3043a1" }}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-8 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold"
            style={{ color: "#3043a1" }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
