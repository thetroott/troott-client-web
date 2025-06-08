import Home from "../screens/home/Home";

// Example private routes with role metadata
export const privateRoutes = [
  {
    path: "/",
    element: <Home />,
    roles: ["admin", "staff", "listener"], // allowed roles
  },
  // add more private routes here as needed
];
