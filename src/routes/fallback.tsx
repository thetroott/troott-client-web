import Notfound from "@/screens/Error/NotFound";
import RouteFallback from "@/screens/Error/ErrorUI";
import Unauthorized from "@/screens/Error/Unathorized";

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
