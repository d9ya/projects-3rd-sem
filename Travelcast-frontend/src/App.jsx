import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registerpage from "./pages/Registerpage";
import LoginPage from "./pages/Loginpage";
import CreateTripPage from "./pages/CreateTrippage";
import { Toaster } from "react-hot-toast";
import Packing from "./pages/Packing";
import Security from "./pages/Security";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/Register" element={<Registerpage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/createTrip" element={<CreateTripPage />} />
        <Route path="/packing" element={<Packing />} />
        <Route path="/Security" element={<Security />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
