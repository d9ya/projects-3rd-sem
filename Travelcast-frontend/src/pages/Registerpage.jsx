import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Registerpage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegistration = (e) => {
    e.preventDefault();

    // SIMPLE VALIDATION
    if (username.trim().length < 2) {
      return setError("Username must be at least 2 characters.");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    setError(""); // clear error
    console.log("Registered:", { username, email, password });
  };

  const styles = {
    container: {
      height: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      backgroundImage: "url('backgroundimg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      fontFamily: "Arial, sans-serif",
      position: "relative",
      paddingRight: "50px",
    },
     card: {
      width: "450px",
      height:"500px",
      padding: "40px",
      borderRadius: "60px",
      background: "rgba(255, 255, 255, 0.25)",
      backdropFilter: "blur(12px)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
      textAlign: "center",
    },
    logo: {
      position: "absolute",
      top: "20px",
      left: "20px",
      width: "140px",
      opacity: 0.9,
    },
    title: {
      fontSize: "26px",
      fontWeight: "700",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "12px",
      marginBottom: "25px",
    },
    inputGroup: {
      marginBottom: "20px",
      position: "relative",
    },
    input: {
      width: "100%",
      padding: "14px 50px 14px 16px",
      borderRadius: "40px",
      border: "none",
      outline: "none",
      fontSize: "16px",
      background: "rgba(255, 255, 255, 0.55)",
    },
    passwordIcon: {
      position: "absolute",
      right: "20px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
    },
    button: {
      width: "100%",
      padding: "16px",
      borderRadius: "40px",
      border: "none",
      backgroundColor: "#4254abff",
      color: "white",
      fontSize: "18px",
      fontWeight: "700",
      marginTop: "10px",
      cursor: "pointer",
    },
    error: {
      color: "red",
      marginBottom: "px",
      fontSize: "12px",
    },
    loginText: {
      marginTop: "20px",
    },
    link: {
      color: "#3043a1",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <img src="logo.png" alt="Logo" style={styles.logo} />

      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Welcome to Travelcast</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleRegistration}>

          <div style={styles.inputGroup}>
            <input
              style={styles.input}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              style={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              style={styles.passwordIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            <u>Login</u>
          </Link>
        </p>
      </div>
    </div>
  );
}
