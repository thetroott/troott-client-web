import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger, useSidebar } from "../ui/sidebar";
import AppSidebar from "../containers/navigation/Sidebar";
import storage from "@/utils/storage.util";



const DashboardLayout = () => {
  const [defaultOpen] = React.useState(() => {
    const stored = storage.fetchData("sidebar-collapsed");
    return stored ? stored !== "true" : true; 
  });
  
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar userRole="preacher" />
      <main>
        <SidebarTriggerWithStorage />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};


const SidebarTriggerWithStorage = () => {
  const { open, setOpen } = useSidebar();

  React.useEffect(() => {
    storage.keepData("sidebar-collapsed", String(!open));
  }, [open]);

  return <SidebarTrigger onClick={() => setOpen(!open)} />;
};


export default DashboardLayout;
