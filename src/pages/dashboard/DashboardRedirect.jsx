import React from "react";
import useRole from "../../hooks/useRole";
import { Navigate } from "react-router";

const DashboardRedirect = () => {
  const { role, roleLoading } = useRole();
  if (roleLoading) return null;

  if (role === "admin") return <Navigate to="admin/all-users" replace />;
  if (role === "librarian") return <Navigate to="librarian/add-book" replace />;
  if (role === "user") return <Navigate to="user/orders" replace />;

  return null;
};

export default DashboardRedirect;
