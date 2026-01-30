import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Registerpage from "./pages/Registerpage";
import LoginPage from "./pages/Loginpage";



import Subscriptionpage from "./pages/Subscriptionpage";
import SplashScreen from "./pages/Splashscreen";
import UserDashboard from "./pages/Userdashboard";


import Packing from "./pages/Packing";
import ProtectedRoute from "./protected/ProtectedRoute";

import CreateTrippage from "./pages/CreateTrippage";
import Security from "./pages/Security";
import TripHistory from "./pages/TripHistory";
import Settings from "./pages/settingpage";



function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<SplashScreen />} />
      <Route path="/settings" element={<Settings />} />
        
       
         <Route path="/subscription" element={<Subscriptionpage/>} />
{/* Auth */}
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Registerpage />} />
      
        <Route path="/userdashboard" element={<ProtectedRoute allowedRoles={['user']} element={<UserDashboard />}/>} />
        
        <Route path="/security" element={<Security />} />
   
       
        
        {/* App */}
        <Route path="/createTrip" element={<CreateTrippage/>} />
       
        <Route path="/packing" element={<Packing />} />
        <Route path="/tripHistory" element={<TripHistory />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;