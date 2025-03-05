
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Set a maximum timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      setIsChecking(false);
    }, 2000); // Reduced to 2 seconds max loading time

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
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // After checking or timeout, make a decision
  return isAuthenticated ? 
    <Outlet /> : 
    <Navigate to="/auth/signin" state={{ from: location }} replace />;
};

export default PrivateRoute;
