import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    // Add login logic or navigation here
        // Add login logic or navigation here

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

        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <input
              style={styles.input}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              style={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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

          <button type="submit" style={styles.button}>Login</button>
        </form>

        <p style={styles.loginText}>
          Don't have an account? <a href="#" style={styles.link}><u>Sign up</u></a>
        </p>
      </div>
    </div>
  );
}
