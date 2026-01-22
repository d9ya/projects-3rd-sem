<<<<<<< HEAD
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registerpage from "./pages/Registerpage";
import LoginPage from "./pages/Loginpage";
import CreateTripPage from "./pages/CreateTrippage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/Register" element={<Registerpage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/createTrip" element={<CreateTripPage />} />
      </Routes>
    </BrowserRouter>
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registerpage from "./pages/Registerpage";
import LoginPage from "./pages/Loginpage";
import Securitypage from "./pages/Securitypage";
import ForgotPasswordPage from "./forgotPasswordPage";
import UserDashboard from "./pages/Userdashboard";



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
      </Routes>
    </Router>
>>>>>>> d8ca73670ebb72293bb1daf96e75a28864e21458
  );
}

export default App;
