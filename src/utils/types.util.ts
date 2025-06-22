import type { JSX } from "react";

export type Theme = "light" | "dark" | "system";

export type RouteType = {
    path: string;
    element: JSX.Element;
    roles?: string[];
    children?: RouteType[]
  };

  export interface IFallbackandError {
    element: JSX.Element
    fallbackUI?: React.ReactNode;
    errorUI?: React.ReactNode; 
  }