import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles, roles }) => {
  const { user } = useContext(AuthContext);

  // User is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const roleList = allowedRoles || roles;

  // Check role permission
  if (
    roleList &&
    roleList.length > 0 &&
    !roleList.includes(user.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;