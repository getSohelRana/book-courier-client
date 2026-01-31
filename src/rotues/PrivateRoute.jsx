import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../components/shared/loading/Loading";
import { Navigate, useLocation } from "react-router";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <Loading></Loading>;
  }

  // isUser logged go to private routes
  if (user && user?.email) {
    return children;
  }

  // other wise go to log in page
  return <Navigate state={location.pathname} replace to="/auth/login"></Navigate>;
};

export default PrivateRoute;
