import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/ThemeProvider";
import ProtectedRoute from "@/ProtectedRoute";

// --- Pages ---
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import EmergencySOS from "./pages/EmergencySOS";
import ExploreCulture from "./pages/ExploreCulture";
import TouristDashboard from "./pages/TouristDashboard";
import PoliceDashboard from "./pages/PoliceDashboard";
import TransportDashboard from "./pages/TransportDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Accessibility from "./pages/Accessibility";
import NotFound from "./pages/NotFound";

// --- Additional pages ---
import GeofenceDemo from "./pages/GeofenceDemo";
import SafeZone from "./pages/SafeZone"; // ✅ NEW — your live geolocation page

// --- React Query client ---
const queryClient = new QueryClient();

const App = () => {
  const [globalNotification, setGlobalNotification] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("activeNotification");
    if (saved) {
      setGlobalNotification(saved);
    }
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          {globalNotification && (
  <div className="bg-blue-600 text-white flex justify-between items-center px-4 py-2 font-medium">
    <span>{globalNotification}</span>

    <button
      onClick={() => {
        setGlobalNotification(null);
        localStorage.removeItem("activeNotification");
      }}
      className="text-white text-lg font-bold hover:opacity-70"
    >
      ✕
    </button>
  </div>
)}
            <Routes>
              {/* --- Public Routes --- */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/emergency-sos" element={<EmergencySOS />} />
              <Route path="/explore-culture" element={<ExploreCulture />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/accessibility" element={<Accessibility />} />

              {/* --- Map / Demo Routes --- */}
              <Route path="/geofence" element={<GeofenceDemo />} />
              <Route path="/safezone" element={<SafeZone />} /> {/* ✅ NEW */}

              {/* --- Protected Dashboards --- */}
              <Route
  path="/dashboard"
  element={
    <ProtectedRoute allowedRoles={["tourist"]}>
      <TouristDashboard setGlobalNotification={setGlobalNotification} />
    </ProtectedRoute>
  }
/>
              <Route
                path="/police"
                element={
                  <ProtectedRoute allowedRoles={["police"]}>
                    <PoliceDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transport"
                element={
                  <ProtectedRoute allowedRoles={["transport"]}>
                    <TransportDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/superadmin"
                element={
                  <ProtectedRoute allowedRoles={["superadmin"]}>
                    <SuperAdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* --- 404 Fallback --- */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
};
export default App;
