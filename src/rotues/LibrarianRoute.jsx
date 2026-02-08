import { Navigate, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import Loading from "../components/shared/loading/Loading";

const LibrarianRoute = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) return <Loading />;

  if (role === "librarian") {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default LibrarianRoute;
