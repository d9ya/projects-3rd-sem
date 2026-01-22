import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Registerpage from "./pages/Registerpage";
import LoginPage from "./pages/Loginpage";
import CreateTripPage from "./pages/CreateTrippage";
import Securitypage from "./pages/Securitypage";
import ForgotPasswordPage from "./forgotPasswordPage";
import UserDashboard from "./pages/Userdashboard";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        {/* Auth */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/security" element={<Securitypage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* App */}
        <Route path="/createTrip" element={<CreateTripPage />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
