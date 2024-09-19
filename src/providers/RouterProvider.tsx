import {
  RouterProvider as RouterProviderMain,
  createBrowserRouter,
} from "react-router-dom";

import PublicLayout from "@layouts/PublicLayout";
import MainLayout from "@layouts/MainLayout";

import SignIn from "@pages/SignIn";
import Company from "@pages/Company";
import Home from "@pages/Home";
import Category from "@pages/Category";
import Product from "@pages/Product";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <>signup</>,
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/company",
        element: <Company />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/product",
        element: <Product />,
      },
    ],
  },
]);

export default function RouterProvider() {
  return <RouterProviderMain router={routes} />;
}
