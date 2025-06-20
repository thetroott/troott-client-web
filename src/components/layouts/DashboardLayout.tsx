import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../containers/navigation/Sidebar";


const DashboardLayout = () => {
    
  return (
    <SidebarProvider>
      <AppSidebar userRole="preacher" />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
