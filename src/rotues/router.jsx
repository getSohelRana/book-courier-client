import { createBrowserRouter } from "react-router";

import { Children } from "react";
import Home from "../pages/Home";
import MainLayouts from "../mainLayouts/mainLayouts";
import AllBooks from "../pages/AllBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/all-books",
        element: <AllBooks></AllBooks>
      }
    ],
  },
]);
export default router;
