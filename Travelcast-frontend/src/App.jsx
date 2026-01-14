import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registerpage from "./pages/Registerpage";
import LoginPage from "./pages/Loginpage";
import Securitypage from "./pages/Securitypage";
import ForgotPasswordPage from "./forgotPasswordPage";
import UserDashboard from "./pages/Userdashboard";
import Settings from "./pages/settings";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/security" element={<Securitypage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/userdashboard" element={<UserDashboard/>} />
        <Route path="/settings" element={<Settings/>} />
      </Routes>
    </Router>
  );
}

export default App;
