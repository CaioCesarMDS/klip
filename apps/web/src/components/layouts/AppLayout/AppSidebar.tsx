import { CirclePlus } from "lucide-react";
import type * as React from "react";
import { Link, useLocation } from "react-router-dom";
import KlipLogo from "@/assets/klip-logo.png";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { isRouteActive, navigationConfig } from "@/config/navigation";

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { pathname } = useLocation();

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <img src={KlipLogo} alt="Klip Logo" width={30} />
          <h1 className="text-xl font-bold text-purple-900/70">Klip</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            <SidebarMenuItem>
              <SidebarMenuButton className="h-12 w-full bg-purple-500 hover:bg-purple-400 text-white hover:text-white shadow-sm mb-2">
                <CirclePlus className="h-5 w-5" />
                <span className="text-sm font-semibold">New Clip</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {navigationConfig.map((group) => (
              <SidebarMenuItem key={group.group}>
                <p className="px-2 py-1 mt-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  {group.group}
                </p>
                <SidebarMenuSub className="ml-0 border-l-0 px-0">
                  {group.items.map((item) => {
                    const isActive = isRouteActive(pathname, item.path);
                    const Icon = item.icon;
                    return (
                      <SidebarMenuSubItem key={item.label}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActive}
                          className={`h-10 px-3 transition-all ${
                            isActive
                              ? "bg-purple-100/80! text-purple-700/80!"
                              : "text-zinc-600 hover:text-zinc-900"
                          }`}
                        >
                          <Link to={item.path} className="flex items-center gap-3">
                            <Icon className={`h-5 w-5 ${isActive ? "text-purple-600!" : ""}`} />
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Separator />
        <div className="flex items-center gap-2 p-2 text-sm text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span>Klip v1.0.0 · Running</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
