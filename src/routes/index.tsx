import { createBrowserRouter } from "react-router-dom";
import LandingLayout from "../layouts/LandingLayout";
import PricingLayout from "../layouts/PricingLayout";
import Landing from "../pages/Landing";
import Pricing from "../pages/Pricing";

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
    // 향후 추가될 라우트들
  },
  {
    path: "/pricing",
    element: <PricingLayout />,
    children: [
      {
        index: true,
        element: <Pricing />,
      },
    ],
  },
]);
