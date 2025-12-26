import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  return (
    <div className="forgot-container">
      <style>{`
        .forgot-container {
          height: 97vh;
          background: url("/lala.png") center/cover no-repeat;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .logo {
          position: absolute;
          top: 20px;
          left: 20px;
          width: 90px;
        }

        .card {
          width: 380px;
          padding: 30px;
          border-radius: 20px;
          background: rgba(255,255,255,0.3);
          backdrop-filter: blur(15px);
          text-align: center;
        }

        .card input {
          width: 100%;
          padding: 12px;
          border-radius: 20px;
          border: none;
          margin-bottom: 15px;
        }

        .card button {
          width: 100%;
          padding: 12px;
          border-radius: 20px;
          border: none;
          background: #2f4db8;
          color: white;
          cursor: pointer;
        }
      `}</style>

      <img src="/hehe.png" className="logo" alt="Logo" />

      <div className="card">
        <h2>Forgot Password</h2>
        <p>Enter your email to reset your password</p>

        <input type="email" placeholder="Enter your Email" />
        <button>Send Reset Link</button>

        <p style={{ marginTop: "10px" }}>
          Remember your password? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
