import Notfound from "@/screens/Tell-me/NotFound";
import RouteFallback from "@/screens/Tell-me/ErrorUI";
import Unauthorized from "@/screens/Tell-me/Unauthorized";

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
