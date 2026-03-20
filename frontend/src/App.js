import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Navbar from "./components/Navbar";
import { GLOBAL_CSS } from "./components/styles";
import Home from "./pages/Home";
import PeriodTracker from "./pages/PeriodTracker";
import Pregnancy from "./pages/Pregnancy";
import Vaccination from "./pages/Vaccination";
import Nutrition from "./pages/Nutrition";
import AIRisk from "./pages/AIRisk";
import Community from "./pages/Community";
import Analytics from "./pages/Analytics";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <style>{GLOBAL_CSS}</style>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/period" element={<PeriodTracker />} />
            <Route path="/pregnancy" element={<Pregnancy />} />
            <Route path="/vaccination" element={<Vaccination />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/risk" element={<AIRisk />} />
            <Route path="/community" element={<Community />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <footer style={{ background: "#fdf6f0", borderTop: "1px solid #f3dde5", padding: "28px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, background: "linear-gradient(135deg,#f43f5e,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CareMaa</span>
          <span style={{ fontSize: 12.5, color: "#9a6878" }}>© 2025 CareMaa · Not a substitute for professional medical advice.</span>
        </footer>
      </AuthProvider>
    </BrowserRouter>
  );
}