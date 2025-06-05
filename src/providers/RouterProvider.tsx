import {
  RouterProvider as RouterProviderMain,
  createBrowserRouter,
} from "react-router-dom";

import PublicLayout from "@layouts/PublicLayout";
import MainLayout from "@layouts/MainLayout";

import Login from "@modules/authentication/Login";
import Register from "@modules/authentication/Register";
import Home from "@modules/home";
import ConfirmEmail from "@modules/authentication/ConfirmEmail";

export const routePaths = {
  initial: "/",
  register: "/register",
  home: "/home",
  confirmEmail: "/confirm-email",
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: routePaths.initial,
        element: <Login />,
      },
      {
        path: routePaths.register,
        element: <Register />,
      },
      {
        path: routePaths.confirmEmail,
        element: <ConfirmEmail />,
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: routePaths.home,
        element: <Home />,
      },
    ],
  },
]);

export default function RouterProvider() {
  return <RouterProviderMain router={routes} />;
}
