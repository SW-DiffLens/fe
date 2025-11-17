import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import PanelLayout from "@/layouts/PanelLayout";
import AllResponses from "@/pages/AllResponses";
import Compare from "@/pages/Compare";
import Dashboard from "@/pages/Dashboard";
import Library from "@/pages/Library";
import Panel from "@/pages/Panel";
import BasicLayout from "../layouts/BasicLayout";
import HomeLayout from "../layouts/HomeLayout";
import LandingLayout from "../layouts/LandingLayout";
import Home from "../pages/Home";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Onboarding from "../pages/Onboarding";
import Pricing from "../pages/Pricing";
import Signup from "../pages/Signup";

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
  {
    path: "/home",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "library",
        children: [
          {
            index: true,
            element: <Library />,
          },
          {
            path: "compare",
            element: <Compare />,
          },
        ],
      },
    ],
  },
  {
    path: "/panel",
    element: <PanelLayout />,
    children: [
      {
        index: true,
        element: <Panel />,
      },
      {
        path: ":id",
        element: <Panel />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: ":id",
        element: <Dashboard />,
      },
      {
        path: "library/:id",
        element: <Dashboard />,
      },
      {
        path: "all-responses",
        element: <AllResponses />,
      },
    ],
  },
]);
