import React from "react";
import { Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  // Authentication disabled - always allow access
  return <Outlet />;
};

export default PrivateRoute;