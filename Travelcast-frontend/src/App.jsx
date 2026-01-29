import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Registerpage from "./pages/Registerpage";
import LoginPage from "./pages/Loginpage";
import CreateTripPage from "./pages/CreateTrippage";
import { Toaster } from "react-hot-toast";

import Subscriptionpage from "./pages/Subscriptionpage";
import SplashScreen from "./pages/Splashscreen";
import UserDashboard from "./pages/Userdashboard";
import Settings from "./pages/settings";
import Subscriptionpage from "./pages/Subscriptionpage";
import Packing from "./pages/Packing";
import ProtectedRoute from "./protected/ProtectedRoute";

import Security from "./pages/Security";
import TripHistory from "./pages/TripHistory";



function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/Register" element={<Registerpage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/createTrip" element={<CreateTripPage />} />
       
         <Route path="/subscription" element={<Subscriptionpage/>} />

     
       
     
      
        {/* Auth */}
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/security" element={<Securitypage />} />
        <Route path="/userdashboard" element={<ProtectedRoute allowedRoles={['user']} element={<UserDashboard />}/>} />
        <Route path="/settings" element={<ProtectedRoute allowedRoles={['user']} element={<Settings />}/>} />
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