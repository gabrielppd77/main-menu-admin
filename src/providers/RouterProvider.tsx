import {
  RouterProvider as RouterProviderMain,
  createBrowserRouter,
} from "react-router-dom";

import PublicLayout from "@modules/core/layouts/PublicLayout";
import MainLayout from "@modules/core/layouts/MainLayout";
import UserSettingsLayout from "@modules/user-settings/layouts/UserSettingsLayout";

import Version from "@modules/app/Version";
import Login from "@modules/authentication/Login";
import Register from "@modules/authentication/Register";
import ConfirmEmail from "@modules/authentication/ConfirmEmail";
import ForgotPassword from "@modules/recover-password/ForgotPassword";
import RecoverPassword from "@modules/recover-password/RecoverPassword";
import Home from "@modules/home";
import Profile from "@modules/user-settings/Profile";

export const routePaths = {
  version: "/version",
  initial: "/",
  register: "/register",
  home: "/home",
  confirmEmail: "/confirm-email",
  forgotPasword: "/forgot-pasword",
  recoverPassword: "/recover-password",
  profile: "/settings/profile",
};

const routes = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: routePaths.version,
        element: <Version />,
      },
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
    element: <MainLayout />,
    children: [
      {
        path: routePaths.home,
        element: <Home />,
      },
      {
        element: <UserSettingsLayout />,
        children: [
          {
            path: routePaths.profile,
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

export default function RouterProvider() {
  return <RouterProviderMain router={routes} />;
}
