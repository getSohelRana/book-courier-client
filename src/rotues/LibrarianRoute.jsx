import { Navigate, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import Loading from "../components/shared/loading/Loading";
import useAuth from "../hooks/useAuth";

const LibrarianRoute = () => {
  const { role, roleLoading } = useRole();
  const { user, loading } = useAuth();

  if (loading || roleLoading) return <Loading />;

  if (!user) return <Navigate to="/login" replace />;

  return role === "librarian" ? <Outlet /> : <Navigate to="/" replace />;
};

export default LibrarianRoute;
