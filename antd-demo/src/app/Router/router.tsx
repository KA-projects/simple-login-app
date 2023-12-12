import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";

import { loader as UserLoader } from "../../entities/user/ui/User";
import { Login, Register } from "../../pages/auth";
import { UserPage } from "../../pages/user";

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
        element: <UserPage />,
        loader: UserLoader,
      },
    ],
  },
]);
