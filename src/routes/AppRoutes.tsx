import { useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { publicRoutes } from "./public";
import { privateRoutes } from "./private";
import { fallbackRoutes } from "./fallback";
import ProtectedRoute from "./ProtectedRoute";
import type { IFallbackandError, RouteType } from "@/utils/types.util";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorUI from "@/screens/error/ErrorUI";

function withFallbackAndErrorBoundary(data: IFallbackandError) {
  
  const {
    element,
    fallbackUI = <Skeleton className="h-40 w-full rounded-md" />,
    errorUI = <ErrorUI />,
  } = data;

  return (
    <ErrorBoundary fallback={errorUI}>
      <Suspense fallback={fallbackUI}>{element}</Suspense>
    </ErrorBoundary>
  );
}

const parseRoutes = (routes: RouteType[], isPrivate = false): RouteObject[] => {
  return routes.map(({ path, element, roles }) => ({
    path,
    element: withFallbackAndErrorBoundary({
      element: isPrivate ? (
        <ProtectedRoute roles={roles}>{element}</ProtectedRoute>
      ) : (
        element
      ),
    }),
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
