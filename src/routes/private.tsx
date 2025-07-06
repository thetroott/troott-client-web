import DashboardLayout from "@/components/layouts/DashboardLayout";
import Home from "../screens/home/Home";
import Dashboard from "@/screens/dashboard/Dashboard";
import Upload from "@/components/containers/modal/upload-sermon";
import Drafts from "@/screens/dashboard/Drafts";
import Series from "@/screens/dashboard/Series";
import Trash from "@/screens/dashboard/Trash";
import GetStarted from "@/screens/dashboard/GetStarted";
import Sermons from "@/screens/dashboard/MySermons";
import Analytics from "@/screens/dashboard/Analytics";
import InnerLayout from "@/components/layouts/InnerLayout";
import UploadSermon from "@/screens/upload/UploadSermon";
import UserAccount from "@/screens/account/UserAccount";
import UserProfile from "@/screens/profile/UserProfile";

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

      {
        path: "/get-started",
        element: <InnerLayout />,
        children: [
          {
            path: "verify-account",
            element: <UserAccount />,
            roles: ["admin", "staff", "preacher"],
          },
          {
            path: "complete-profile",
            element: <UserProfile />,
            roles: ["admin", "staff", "preacher"],
          },
          {
            path: "tour-guide",
            element: <UploadSermon />,
            roles: ["admin", "staff", "preacher"],
          },
        ],
      },
    ],
  },
];
