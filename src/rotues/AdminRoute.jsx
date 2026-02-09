import { Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/shared/loading/Loading";

const AdminRoute = () => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) return <Loading />;
  
  if (!user) return <Navigate to="/login" replace />;

  return role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
