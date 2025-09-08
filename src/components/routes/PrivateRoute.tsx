import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  children: ReactNode;   // <-- yahan change
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, children }) => {
  const auth = isAuthenticated || localStorage.getItem("isAuthenticated") === "true";

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>; // ✅ ReactNode ko render karne ke liye fragment use kiya
};

export default PrivateRoute;
