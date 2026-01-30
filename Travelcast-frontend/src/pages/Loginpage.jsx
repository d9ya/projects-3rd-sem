import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUserApi } from "../services/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    // ✅ Validation
    if (!email || !email.includes("@")) {
      return setError("Please enter a valid email.");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    setError("");
    setLoading(true);

    try {
      await toast.promise(
        loginUserApi({ email, password }),
        {
          loading: "Logging in...",
          success: (res) => {
            // ✅ Save token if exists
            if (res?.data?.token) {
              localStorage.setItem("token", res.data.token);
            }

            // ✅ Save full user object
            if (res?.data?.user) {
              localStorage.setItem("user", JSON.stringify(res.data.user));
              // ✅ Save userId separately for pages like CreateTrip
              localStorage.setItem("userId", res.data.user.id);
            }

            // ✅ Redirect after successful login
            setTimeout(() => navigate("/userdashboard"), 500);

            return res?.data?.message || "Login successful!";
          },
          error: (err) =>
            err?.response?.data?.message ||
            "Invalid email or password",
        }
      );
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[url('/backgroundimg.png')] bg-cover bg-center font-sans relative">
      {/* Logo */}
      <img
        src="logo.png"
        alt="Logo"
        className="absolute top-8 left-8 w-32 opacity-90"
      />

      {/* Card */}
      <div className="w-[500px] px-10 py-10 rounded-[60px] bg-white/25 backdrop-blur-xl shadow-2xl text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Login</h2>
        <p className="text-sm text-gray-700 mb-6">Welcome to Travelcast</p>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            name="login_email"
            placeholder="Email"
            autoComplete="new-email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className="w-4/5 px-4 py-3 rounded-full bg-white/30 outline-none text-base"
          />

          {/* Password */}
          <div className="relative flex justify-center">
            <input
              type={showPassword ? "text" : "password"}
              name="login_password"
              placeholder="Password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-4/5 px-4 py-3 rounded-full bg-white/30 outline-none text-base"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-[70px] top-1/2 -translate-y-1/2 cursor-pointer text-gray-700 text-lg"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Forgot Password */}
          <div className="w-4/5 mx-auto text-center text-sm">
            <a href="#" className="text-blue-700 font-semibold">
              Forgot Password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-4/5 py-3 rounded-full bg-[#3043a1] text-white text-xl font-bold mt-2 disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup */}
        <p className="text-sm mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-700 font-bold underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
