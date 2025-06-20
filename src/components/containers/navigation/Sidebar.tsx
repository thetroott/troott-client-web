import {
  navDataItems,
  navFooterItems,
  navMainItems,
  navSermonItems,
} from "@/_data/navdata";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SearchForm } from "../dialog/Search.tsx";

interface ISideBar {
  props?: React.ComponentProps<typeof Sidebar>
}

const AppSidebar = (data: ISideBar) => {
  const { ...props } = data
 
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        
          <img
            src="/images/assets/troott-logo.svg"
            alt="logo"
            className="w-20 h-10 rounded-md px-2"
          />
        <SearchForm className="mt-3" />
        
      </SidebarHeader>

      <SidebarContent>


        <SidebarGroup>
        <SidebarGroupLabel className="uppercase text-muted-foreground/60">
              {navMainItems.title}

            </SidebarGroupLabel>
          <SidebarGroupContent >
            <SidebarMenu>
              {navMainItems.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
        <SidebarGroupLabel className="uppercase text-muted-foreground/60">
              {navSermonItems.title}

            </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navSermonItems.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
        <SidebarGroupLabel className="uppercase text-muted-foreground/60">
              {navDataItems.title}

            </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navDataItems.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
         <hr className="border-t border-border mx-2 -mt-px" />
        <SidebarMenu className="font-medium gap-3 rounded-md bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto">
          {navFooterItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
