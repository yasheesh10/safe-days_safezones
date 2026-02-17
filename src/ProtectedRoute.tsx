import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("tourist" | "police" | "transport" | "superadmin")[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user } = useAuth();

  // 🔐 If user not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🚦 If role restriction exists & user role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    switch (user.role) {
      case "tourist":
        return <Navigate to="/dashboard" replace />;
      case "police":
        return <Navigate to="/police" replace />;
      case "transport":
        return <Navigate to="/transport" replace />;
      case "superadmin":
        return <Navigate to="/superadmin" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  // ✅ Access granted
  return <>{children}</>;
};

export default ProtectedRoute;
