import type { JSX } from "react";

export type Theme = "light" | "dark" | "system";

export type RouteType = {
    path: string;
    element: JSX.Element;
    roles?: string[];
  };
  