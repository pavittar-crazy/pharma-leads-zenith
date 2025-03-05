
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "@/components/auth/SignIn";
import SignUp from "@/components/auth/SignUp";
import { useAuth } from "@/context/AuthContext";

const Auth: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Redirect to homepage if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30">
      <div className="rounded-md bg-muted/50 p-4 text-center mb-8">
        <p className="font-medium">Pavittar Pharmaceuticals CRM</p>
        <p className="text-sm text-muted-foreground">A Rishul Chanana Production</p>
      </div>
      
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<Navigate to="/auth/signin" replace />} />
      </Routes>
    </div>
  );
};

export default Auth;
