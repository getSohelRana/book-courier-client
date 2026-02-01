import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../components/shared/loading/Loading";

import { Navigate, useLocation } from "react-router";

const PublicRoute = ({ children }) => {
  const location = useLocation();

  const { user, loading } = useAuth();
  if (loading) {
    return <Loading></Loading>;
  }
  // if user logged don't go login or singup page
  if (user) {
    return <Navigate to={location.state?.from?.pathname || "/"}></Navigate>;
  }
  return children;
};

export default PublicRoute;
