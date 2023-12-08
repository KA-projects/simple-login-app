import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root";
import Register from "../components/Register";
import Login from "../components/Login";
import User from "../components/User";

import { loader as UserLoader } from "../components/User";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/user/:username",
        element: <User />,
        loader: UserLoader,
      },
    ],
  },
]);
