import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Verification from "../screens/auth/Verification";
import Preview from "../screens/Preview";

export const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/verify-otp", element: <Verification /> },
  { path: "/preview", element: <Preview /> },
];
