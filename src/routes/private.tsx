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
import UserAccount from "@/screens/account/GetVerified";
import UserProfile from "@/screens/profile/UserProfile";
import PersonalInfo from "@/screens/account/VerifyUserInfo";
import VerifyDocument from "@/screens/account/VerifyDocument";
import SelectDocumentType from "@/components/containers/dashboard/SelectDocumentType";
import UploadDocument from "@/components/containers/dashboard/UploadDocument";
import VerifyDocumentForm from "@/components/containers/dashboard/verify-document";
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

      // get-started landing page
      {
        path: "get-started",
        element: <GetStarted />,
        roles: ["admin", "staff", "preacher"],
      },

      // get-started sub routes using InnerLayout
      {
        path: "get-started",
        element: <InnerLayout />,
        roles: ["admin", "staff", "preacher"],
        children: [
          {
            path: "verify-account",
            element: <UserAccount />,
          },
          {
            path: "verify-account/personal-information",
            element: <PersonalInfo />,
          },
          {
            path: "verify-account/verify-document",
            element: <VerifyDocument />,
            children: [
              { path: "", element: <VerifyDocumentForm /> }, 
              { path: "select", element: <SelectDocumentType /> }, 
              { path: "upload", element: <UploadDocument /> }
            ],
          },
          {
            path: "complete-profile",
            element: <UserProfile />,
          },
        ],
      },

      // get-started tour guide

      {
        path: "get-started/tour-guide",
        element: <UploadSermon />,
      },

      // other dashboard routes
      {
        path: "upload-sermon",
        element: <Upload />,
        roles: ["admin", "staff", "preacher"],
      },
      {
        path: "get-sermons",
        element: <Sermons />,
        roles: ["admin", "staff", "preacher"],
      },
      {
        path: "my-analytics",
        element: <Analytics />,
        roles: ["admin", "staff", "preacher"],
      },
      {
        path: "my-drafts",
        element: <Drafts />,
        roles: ["admin", "staff", "preacher"],
      },
      {
        path: "my-series",
        element: <Series />,
        roles: ["admin", "staff", "preacher"],
      },
      {
        path: "my-trash",
        element: <Trash />,
        roles: ["admin", "staff", "preacher"],
      },
    ],
  },
];
