import { createBrowserRouter } from "react-router";

import { Children } from "react";
import Home from "../pages/Home";
import MainLayouts from "../mainLayouts/mainLayouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
    ],
  },
]);
export default router;
