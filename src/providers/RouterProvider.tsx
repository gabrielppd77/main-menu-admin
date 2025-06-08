import {
  RouterProvider as RouterProviderMain,
  createBrowserRouter,
} from "react-router-dom";

import PublicLayout from "@layouts/PublicLayout";
import MainLayout from "@layouts/MainLayout";

import Login from "@modules/authentication/Login";
import Register from "@modules/authentication/Register";
import ConfirmEmail from "@modules/authentication/ConfirmEmail";
import ForgotPassword from "@modules/recover-password/ForgotPassword";
import RecoverPassword from "@modules/recover-password/RecoverPassword";
import Home from "@modules/home";

export const routePaths = {
  initial: "/",
  register: "/register",
  home: "/home",
  confirmEmail: "/confirm-email",
  forgotPasword: "/forgot-pasword",
  recoverPassword: "/recover-password",
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
      {
        path: routePaths.forgotPasword,
        element: <ForgotPassword />,
      },
      {
        path: routePaths.recoverPassword,
        element: <RecoverPassword />,
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
