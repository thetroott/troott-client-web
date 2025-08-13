import { lazy } from "react";

const Register = lazy(() => import("../screens/auth/Register"));
const Verification = lazy(() => import("../screens/auth/Verification"));
const Login = lazy(() => import("../screens/auth/Login"));
const ForgotPassword = lazy(() => import("../screens/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../screens/auth/ResetPassword"));
const Preview = lazy(() => import("../screens/Preview"));

export const publicRoutes = [
  
  { path: "/register", element: <Register /> },
  { path: "/verify-otp", element: <Verification /> },
  { path: "/login", element: <Login /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },  
  { path: "/preview", element: <Preview /> },
];
