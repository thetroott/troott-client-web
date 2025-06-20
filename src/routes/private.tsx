import DashboardLayout from "@/components/layouts/DashboardLayout";
import Home from "../screens/home/Home";
import Dashboard from "@/screens/dashboard/Dashboard";

// Example private routes with role metadata
export const privateRoutes = [
  {
    path: "/",
    element: <Home />,
    roles: ["admin", "staff", "listener"], 
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        roles: ["admin", "staff", "listener"], 
      },
      {
        path: "settings",
        element: <Dashboard />,
        roles: ["admin", "staff", "listener"], 
      },
    ],
  },

  
];
