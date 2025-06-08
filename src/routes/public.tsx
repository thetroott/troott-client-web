import { lazy } from "react";


const Login = lazy(() => import("../screens/auth/Login"));
const Register = lazy(() => import("../screens/auth/Register"));
const Verification = lazy(() => import("../screens/auth/Verification"));
const Preview = lazy(() => import("../screens/Preview"));

export const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/verify-otp", element: <Verification /> },
  { path: "/preview", element: <Preview /> },
];
