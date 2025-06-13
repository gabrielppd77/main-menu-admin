import {
  RouterProvider as RouterProviderMain,
  createBrowserRouter,
} from "react-router-dom";

import PublicLayout from "@modules/core/layouts/PublicLayout";
import MainLayout from "@modules/core/layouts/MainLayout";
import UserSettingsLayout from "@modules/user-settings/layouts/UserSettingsLayout";
import CompanyLayout from "@modules/company/layouts/CompanyLayout";

import Version from "@modules/app/Version";
import Login from "@modules/authentication/Login";
import Register from "@modules/authentication/Register";
import ConfirmEmail from "@modules/authentication/ConfirmEmail";
import ForgotPassword from "@modules/recover-password/ForgotPassword";
import RecoverPassword from "@modules/recover-password/RecoverPassword";
import Home from "@modules/home";
import Profile from "@modules/user-settings/Profile";
import MainCompany from "@modules/company/MainCompany";

import { routes as routesPaths } from "@modules/routing/consts/routes";

const routes = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: routesPaths.version,
        element: <Version />,
      },
      {
        path: routesPaths.initial,
        element: <Login />,
      },
      {
        path: routesPaths.register,
        element: <Register />,
      },
      {
        path: routesPaths.confirmEmail,
        element: <ConfirmEmail />,
      },
      {
        path: routesPaths.forgotPasword,
        element: <ForgotPassword />,
      },
      {
        path: routesPaths.recoverPassword,
        element: <RecoverPassword />,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: routesPaths.home,
        element: <Home />,
      },
      {
        element: <UserSettingsLayout />,
        children: [
          {
            path: routesPaths.profile,
            element: <Profile />,
          },
        ],
      },
      {
        element: <CompanyLayout />,
        children: [
          {
            path: routesPaths.companyMain,
            element: <MainCompany />,
          },
        ],
      },
    ],
  },
]);

export default function RouterProvider() {
  return <RouterProviderMain router={routes} />;
}
