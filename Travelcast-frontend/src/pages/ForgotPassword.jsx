import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { forgotPasswordApi } from "../services/api"; 

import { Eye, EyeOff } from "lucide-react"; 

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [showQuestions, setShowQuestions] = useState(false); 
  const [showResetForm, setShowResetForm] = useState(false); 
  const [loading, setLoading] = useState(false);
  
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  
  const [answers, setAnswers] = useState({
    food: "",
    place: "",
    hobby: "",
    birthplace: ""
  });

  const backgroundImage = "/background.png";

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    try {
      
      setShowQuestions(true);
    } catch (error) {
      toast.error("Email not found");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyQuestions = (e) => {
    e.preventDefault();
    
    setShowResetForm(true); // Move to the password reset card
  };

  const handleFinalReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return; 
    }
    setLoading(true);
    try {
      // Logic for final password update API
      toast.success("Password reset successfully!");
    } catch (error) {
      toast.error("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <style>{`
        .forgot-container {
          height: 100vh;
          background: url(${backgroundImage}) center/cover no-repeat;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .logo { position: absolute; top: 20px; left: 20px; width: 90px; }
        .card {
          width: 400px;
          padding: 30px;
          border-radius: 20px;
          background: rgba(255,255,255,0.25);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          text-align: center;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .question-label { 
            text-align: left; 
            display: block; 
            margin: 10px 0 5px 10px; 
            font-size: 0.9rem; 
            font-weight: bold;
        }
        .input-group { position: relative; width: 100%; }
        input {
          width: 100%;
          padding: 12px;
          padding-right: 40px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.5);
          margin-bottom: 10px;
          outline: none;
          background: rgba(255,255,255,0.8);
        }
        .toggle-icon {
          position: absolute;
          right: 15px;
          top: 12px;
          cursor: pointer;
          color: #555;
        }
        button {
          width: 100%;
          padding: 12px;
          border-radius: 20px;
          border: none;
          background: #2f4db8;
          color: white;
          cursor: pointer;
          font-weight: bold;
          margin-top: 10px;
          transition: background 0.3s;
        }
        button:hover { background: #1e3a9e; }
        .back-link { margin-top: 15px; display: block; color: #333; text-decoration: none; font-size: 0.9rem; cursor: pointer; }
      `}</style>

      <img src="/logo.png" className="logo" alt="logo" />

      <div className="card">
        {/* STEP 1: Email Card */}
        {!showQuestions && !showResetForm && (
          <>
            <h2>Forgot Password</h2>
            <form onSubmit={handleInitialSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Answer the questions</button>
            </form>
            <p style={{ marginTop: "15px" }}>
              Remember your password? <Link to="/login">Login</Link>
            </p>
          </>
        )}

        {/* STEP 2: Questions Card */}
        {showQuestions && !showResetForm && (
          <>
            <h2>Security Questions</h2>
            <form onSubmit={handleVerifyQuestions}>
              <label className="question-label">1) What is your favourite food?</label>
              <input name="food" onChange={handleAnswerChange} required />
              <label className="question-label">2) What is your favourite place to visit?</label>
              <input name="place" onChange={handleAnswerChange} required />
              <label className="question-label">3) What is your favourite weather?</label>
              <input name="hobby" onChange={handleAnswerChange} required />
              <label className="question-label">4) What is your birthplace?</label>
              <input name="birthplace" onChange={handleAnswerChange} required />
              <button type="submit">Reset Password</button>
            </form>
            <span className="back-link" onClick={() => setShowQuestions(false)}>← Back to Email</span>
          </>
        )}

        {/* STEP 3: New Password Card */}
        {showResetForm && (
          <>
            <h2>Reset Password</h2>
            <form onSubmit={handleFinalReset}>
              <div className="input-group">
                <input
                  type={showNewPass ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <span className="toggle-icon" onClick={() => setShowNewPass(!showNewPass)}>
                  {showNewPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>

              <div className="input-group">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span className="toggle-icon" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                  {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>

              <button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;