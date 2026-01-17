import { createBrowserRouter } from "react-router";

import { Children } from "react";
import Home from "../pages/Home";
import MainLayouts from "../mainLayouts/mainLayouts";
import AllBooks from "../pages/AllBooks";
import ErrorPage from "../pages/ErrorPage";
import ErrorState from "../components/shared/ErrorState";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/all-books",
        element: <AllBooks></AllBooks>,
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
]);
export default router;
