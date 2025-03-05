
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Set a maximum timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      setIsChecking(false);
    }, 5000); // 5 seconds max loading time

    // When loading state from AuthContext changes, update our local state
    if (!loading) {
      setIsChecking(false);
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [loading]);

  // Only show loading state for a reasonable amount of time
  if (loading && isChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // After checking or timeout, make a decision
  return isAuthenticated ? 
    <Outlet /> : 
    <Navigate to="/auth/signin" state={{ from: location }} replace />;
};

export default PrivateRoute;
