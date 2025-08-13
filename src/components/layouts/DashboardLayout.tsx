import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "../containers/navigation/Sidebar";
import storage from "@/utils/storage.util";
import NavBar from "../containers/navigation/NavBar";

const DashboardLayout = () => {
  const [defaultOpen] = React.useState(() => {
    const stored = storage.fetch("sidebar-collapsed");
    return stored ? stored !== "true" : true;
  });

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex h-screen w-full bg-neutral-900/60">
        <AppSidebar userRole="preacher" />

        <div className="flex flex-col flex-1">
          <NavBar />
          <main className="flex-1 m-3 pl-6 pt-2 pr-6 bg-neutral-900 rounded-md overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
