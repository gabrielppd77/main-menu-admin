import {
  RouterProvider as RouterProviderMain,
  createBrowserRouter,
} from "react-router-dom";

import PublicLayout from "@layouts/PublicLayout";
import MainLayout from "@layouts/MainLayout";

import Login from "@modules/Authentication/Login";
import Register from "@modules/Authentication/Register";
import Home from "@modules/Home";

export const routePaths = {
  initial: "/",
  register: "/register",
  home: "/home",
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
