import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ requireRole }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required (e.g. 'buyer' or 'seller') and user doesn't have it
  // Wait, if they haven't chosen a role, they should be on /choose-role
  if (requireRole && role !== requireRole) {
    if (!role) {
      return <Navigate to="/choose-role" replace />;
    }
    // If they are on the wrong dashboard (e.g. buyer on seller dash), redirect to their actual dashboard
    return <Navigate to={`/${role}/dashboard`} replace />;
  }

  // If visiting /choose-role but already have a role, optionally redirect to their dashboard
  // But wait, the user should be able to go to /choose-role to change it?
  // The requirements say they can switch from the dashboard navbar.
  // We'll let them access /choose-role if they want, but if requireRole is not passed, it's just a general auth check.

  return <Outlet />;
};

export default ProtectedRoute;
