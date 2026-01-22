import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUserApi } from "../services/api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    if (loading) return;

    if (username.trim().length < 2) {
      return setError("Please enter a valid username.");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    setError("");
    setLoading(true);

    const data = { username, password };

    try {
      await toast.promise(
        loginUserApi(data),
        {
          loading: "Logging in...",
          success: (res) => {
            // store token / user if backend sends it
            if (res?.data?.token) {
              localStorage.setItem("token", res.data.token);
            }
            if (res?.data?.user) {
              localStorage.setItem("user", JSON.stringify(res.data.user));
            }

            setTimeout(() => navigate("/createTrip"), 1000);
            return res?.data?.message || "Login successful!";
          },
          error: (err) =>
            err?.response?.data?.message || "Invalid username or password",
        }
      );
    } catch (err) {
      err?.response?.data || err.message || err;
    } finally {
      setLoading(false);
    }
=======
    console.log("Username:", username);
    console.log("Password:", password);
    // Add login logic or navigation here
        // Add login logic or navigation here

>>>>>>> d8ca73670ebb72293bb1daf96e75a28864e21458
  };

  const styles = {
    container: {
      height: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "url('backgroundimg.png') no-repeat center/cover",
      fontFamily: "Arial, sans-serif",
    },
    card: {
      width: "500px",
      padding: "40px",
      borderRadius: "60px",
      background: "rgba(255, 255, 255, 0.25)",
      backdropFilter: "blur(12px)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
      textAlign: "center",
    },
    logo: {
      position: "absolute",
      top: "30px",
      left: "30px",
      width: "130px",
      opacity: 0.9,
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "20px",
      color: "#333",
    },
    subtitle: {
      fontSize: "13px",
      color: "#302f2f",
      marginBottom: "25px",
    },
    inputGroup: {
      marginBottom: "18px",
      position: "relative",
    },
    input: {
      width: "80%",
      padding: "14px",
      borderRadius: "30px",
      border: "none",
      outline: "none",
      fontSize: "16px",
      background: "rgba(255, 255, 255, 0.308)",
    },
    passwordIcon: {
      position: "absolute",
      right: "45px",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "20px",
      cursor: "pointer",
      color: "#333",
    },
    optionsRow: {
      display: "flex",
      justifyContent: "space-between",
      width: "80%",
      margin: "5px auto 15px auto",
      fontSize: "14px",
    },
    button: {
      width: "80%",
      padding: "15px",
      marginTop: "10px",
      border: "none",
      borderRadius: "30px",
      backgroundColor: "#3043a1",
      color: "white",
      fontSize: "22px",
      fontWeight: "700",
      cursor: "pointer",
      opacity: loading ? 0.7 : 1,
    },
    link: {
      color: "#3043a1",
      textDecoration: "none",
      fontWeight: "bold",
    },
    loginText: {
      marginTop: "15px",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      <img src="logo.png" alt="Logo" style={styles.logo} />

      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <div style={styles.subtitle}>Welcome to Travelcast</div>

        {error && <div style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <input
              style={styles.input}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              style={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            <span
              style={styles.passwordIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div style={styles.optionsRow}>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" style={styles.link}>Forgot Password?</a>
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={styles.loginText}>
          Don't have an account?{" "}
          <Link to="/Register" style={styles.link}>
            <u>Sign up</u>
          </Link>
        </p>
      </div>
    </div>
  );
}
