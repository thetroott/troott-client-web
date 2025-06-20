import DashboardLayout from "@/components/layouts/DashboardLayout";
import Home from "../screens/home/Home";
import Dashboard from "@/screens/dashboard/Dashboard";
import Upload from "@/components/containers/modal/Upload";
import Drafts from "@/screens/dashboard/Drafts";
import Series from "@/screens/dashboard/Series";
import Trash from "@/screens/dashboard/Trash";
import GetStarted from "@/screens/dashboard/GetStarted";
import Sermons from "@/screens/dashboard/mySermons";
import Analytics from "@/screens/dashboard/Analytics";

// Example private routes with role metadata
export const privateRoutes = [
  {
    path: "/",
    element: <Home />,
    roles: ["admin", "staff", "preacher"],
  },
  {
    path: "",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard",

        element: <Dashboard />,
        roles: ["admin", "staff", "preacher"],
      },
      {
        path: "/get-started",
        element: <GetStarted />,
        roles: ["admin", "staff", "preacher"], 
      },
      {
        path: "/upload-sermon",
        element: <Upload />,
        roles: ["admin", "staff", "preacher"],
      },
      {
        path: "/get-sermons",
        element: <Sermons />,
        roles: ["admin", "staff", "preacher"],
      },
      {
        path: "/my-analytics",
        element: <Analytics />,
        roles: ["admin", "staff", "preacher"],
      },

      {
        path: "/my-drafts",
        element: <Drafts />,
        roles: ["admin", "staff", "preacher"],
      },
      {
        path: "/my-series",
        element: <Series />,
        roles: ["admin", "staff", "preacher"],
      },
      {
        path: "/my-trash",
        element: <Trash />,
        roles: ["admin", "staff", "preacher"],
      },
    ],
  },
];
