import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Registerpage from "./pages/Registerpage";
import LoginPage from "./pages/Loginpage";
import CreateTripPage from "./pages/CreateTrippage";
import { Toaster } from "react-hot-toast";

import Subscriptionpage from "./pages/Subscriptionpage";
import SplashScreen from "./pages/Splashscreen";

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

     
       
     
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
