import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import MainLayouts from "../layouts/MainLayouts";
import AllBooks from "../pages/AllBooks";
import ErrorPage from "../pages/ErrorPage";
import ErrorState from "../components/shared/ErrorState";
import AuthLayouts from "../authLayouts/AuthLayouts";
import SignUp from "../pages/form/signUp/SignUp";
import SignIn from "../pages/form/signIn/SignIn";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminRoute from "./AdminRoute";
import AllUsers from "../pages/dashboard/admin/allUsers/AllUsers";
import ManageBooks from "../pages/dashboard/admin/manageBooks/ManageBooks";
import Profile from "../pages/dashboard/admin/profile/Profile";
import LibrarianRoute from "./LibrarianRoute";
import MyBooks from "../pages/dashboard/librarian/myBooks/MyBooks";
import MyOrders from "../pages/dashboard/librarian/myOrders/MyOrders";
import AddBook from "../pages/dashboard/librarian/addBooks/AddBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "all-books",
        element: <AllBooks />,
        errorElement: (
          <ErrorState
            config={{
              title: "Unable to load books",
              message: "Please check your internet connection and try again.",
              showRetry: true,
              showHome: false,
            }}
          />
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayouts />,
    children: [
      {
        path: "signup",
        element: (
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        ),
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "admin",
        element: <AdminRoute />,
        children: [
          { path: "all-users", element: <AllUsers /> },
          { path: "manage-books", element: <ManageBooks /> },
          { path: "profile", element: <Profile /> },
        ],
      },
      {
        path: "librarian",
        element: <LibrarianRoute />,
        children: [
          {path : "add-book", element: <AddBook></AddBook>},
          { path: "my-books", element: <MyBooks /> },
          { path: "my-orders", element: <MyOrders /> },
        ],
      },
    ],
  },
]);

export default router;

