import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "../containers/navigation/Sidebar";
import storage from "@/utils/storage.util";
import NavBar from "../containers/navigation/NavBar";

const DashboardLayout = () => {
  const [defaultOpen] = React.useState(() => {
    const stored = storage.fetchData("sidebar-collapsed");
    return stored ? stored !== "true" : true;
  });

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      // style={
      //   {
      //     "--sidebar-width": "300px",
      //     "--sidebar-width-icon": "55px",
      //   } as React.CSSProperties
      // }
      className="flex"
    >
      <AppSidebar userRole="preacher" />

      <main className="flex-1 overflow-auto">
        <NavBar />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
