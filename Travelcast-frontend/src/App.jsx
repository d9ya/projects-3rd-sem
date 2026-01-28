import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Registerpage from "./pages/Registerpage";
import LoginPage from "./pages/Loginpage";
import CreateTripPage from "./pages/CreateTrippage";
import UserDashboard from "./pages/Userdashboard";
import Settings from "./pages/settings";
import Subscriptionpage from "./pages/Subscriptionpage";
import Packing from "./pages/Packing";
import Security from "./pages/Security";
import TripHistory from "./pages/TripHistory";


function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        {/* Auth */}
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/security" element={<Security />} />
        <Route path="/userdashboard" element={<UserDashboard/>} />
        <Route path="/settings" element={<Settings/>} />
        
        {/* App */}
        <Route path="/createTrip" element={<CreateTripPage />} />
        <Route path="/subscription" element={<Subscriptionpage />} />
        <Route path="/packing" element={<Packing />} />
        <Route path="/tripHistory" element={<TripHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;