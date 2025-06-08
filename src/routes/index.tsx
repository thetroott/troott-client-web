import { useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { publicRoutes } from "./public";
import { privateRoutes } from "./private";
import { fallbackRoutes } from "./fallback";
import ProtectedRoute from "./ProtectedRoute";
import type { RouteType } from "@/utils/types.util";


const parseRoutes = (routes: RouteType[], isPrivate = false): RouteObject[] => {
  return routes.map(({ path, element, roles }) => ({
    path,
    element: isPrivate ? (
      <ProtectedRoute roles={roles}>{element}</ProtectedRoute>
    ) : (
      element
    ),
  }));
};

const AppRoutes = () => {
  const allRoutes: RouteObject[] = [
    ...parseRoutes(publicRoutes),
    ...parseRoutes(privateRoutes, true),
    ...parseRoutes(fallbackRoutes),
  ];

  const routing = useRoutes(allRoutes);

  return <>{routing}</>;
};

export default AppRoutes;
