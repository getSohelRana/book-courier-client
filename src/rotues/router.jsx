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
import UserRoute from "./UserRoute";
import UserOrder from "../pages/dashboard/user/userOrder/UserOrder";
import Invoices from "../pages/dashboard/user/invoices/invoices";
import UserProfile from "../pages/dashboard/user/userProfile/userProfile";

const Router = createBrowserRouter([
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
      {
        path : 'user',
        element: <UserRoute></UserRoute>,
        children : [
          {path : "orders", element: <UserOrder></UserOrder>},
          {path : "invoices", element: <Invoices></Invoices>},
          {path : "profile", element: <UserProfile></UserProfile>},
        ]
      }
    ],
  },
]);

export default Router;

