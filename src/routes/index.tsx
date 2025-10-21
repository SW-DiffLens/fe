import { createBrowserRouter } from "react-router-dom";
import LandingLayout from "../layouts/LandingLayout";
import BasicLayout from "../layouts/BasicLayout";
import Landing from "../pages/Landing";
import Pricing from "../pages/Pricing";
import Signup from "../pages/Signup";
import Onboarding from "../pages/Onboarding";
import Login from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
    ],
  },
  {
    path: "/pricing",
    element: <BasicLayout />,
    children: [
      {
        index: true,
        element: <Pricing />,
      },
    ],
  },
  {
    path: "/signup",
    element: <BasicLayout />,
    children: [
      {
        index: true,
        element: <Signup />,
      },
      {
        path: "onboarding",
        element: <Onboarding />,
      },
    ],
  },
  {
    path: "/login",
    element: <BasicLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
]);
