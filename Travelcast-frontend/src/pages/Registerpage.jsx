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

  const handleRegistration = async (e) => {
  e.preventDefault();
  if (loading) return;

  if (username.trim().length < 2) {
    return setError("Username must be at least 2 characters.");
  }
  if (!email.includes("@")) {
    return setError("Please enter a valid email.");
  }
  if (password.length < 6) {
    return setError("Password must be at least 6 characters.");
  }

  setError("");
  setLoading(true);

  // ✅ Use 'username' instead of 'name'
  const data = { username, email, password };

  try {
    const res = await toast.promise(
      createUserApi(data),
      {
        loading: "Creating account...",
        success: (res) => {
          const newUserId = res?.data?.user?.id;
          if (newUserId) {
            localStorage.setItem("newUserId", newUserId);
          }
          navigate("/security");
          return res?.data?.message || "Account created successfully!";
        },
        error: (err) => err?.response?.data?.message || "Registration failed",
      }
    );
  } catch (err) {
    console.error("Registration error:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: "url('backgroundimg.png')" }}>
      <img src="logo.png" alt="Logo" className="absolute top-5 left-5 w-36 opacity-90" />

      <div className="w-[520px] p-12 rounded-[60px] bg-white/30 backdrop-blur-[12px] shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-6">Create Account</h2>
        <p className="text-base mb-8">Welcome to Travelcast</p>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleRegistration} className="space-y-6">
          <input value={username} onChange={(e) => { setUsername(e.target.value); setError(""); }} placeholder="Username" className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/60 text-lg" />
          <input value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} placeholder="Email" className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/60 text-lg" />

          <div className="relative">
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} placeholder="Password" className="w-full px-5 py-3 rounded-full border border-gray-300 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/60 text-lg" />
            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 text-lg">{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 rounded-full text-white font-semibold hover:opacity-90 disabled:opacity-60 text-lg" style={{ backgroundColor: "#3043a1" }}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-8 text-sm">
          Already have an account? <Link to="/login" style={{ color: "#3043a1", fontWeight: "bold" }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
