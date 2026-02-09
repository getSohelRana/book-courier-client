import { Navigate, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import Loading from "../components/shared/loading/Loading";
import useAuth from "../hooks/useAuth";

const UserRoute = () => {
  const { role, roleLoading } = useRole();
  const { user, loading } = useAuth();

  if (loading || roleLoading) return <Loading />;
  if (!user) return <Navigate to="/login" replace t></Navigate>;

  return role === "user" ? <Outlet /> : <Navigate to="/" replace />;
};

export default UserRoute;
