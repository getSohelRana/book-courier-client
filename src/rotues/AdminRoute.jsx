import { Navigate, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import Loading from "../components/shared/loading/Loading";
import useAuth from "../hooks/useAuth";

const AdminRoute = () => {
  const {user , loading} = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) return <Loading />;

  if (user && role === "admin") {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default AdminRoute;
