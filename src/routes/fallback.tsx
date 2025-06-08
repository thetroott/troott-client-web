import Notfound from "@/screens/Error/NotFound";
import RouteFallback from "@/screens/Error/RouteFallback";
import Unauthorized from "@/screens/Error/UnathorizedPage";

export const fallbackRoutes = [
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "*",
    element: <Notfound />,
  },
  {
    path: "/route-fallback",
    element: <RouteFallback />,
  },
];
