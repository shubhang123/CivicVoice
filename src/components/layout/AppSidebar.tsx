
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  Home,
  LayoutDashboard,
  MessageSquare,
  ClipboardList,
  Users,
  Settings,
  Clock,
  LogOut,
  AlertOctagon,
  UserRound,
  ShieldCheck,
  ChartLine,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation } from "react-router-dom";

export function AppSidebar() {
  const location = useLocation();
  
  const mainMenuItems = [
    // {
    //   title: "Overview",
    //   icon: Home,
    //   url: "/",
    // },
    {
      title: "Complaints",
      icon: AlertOctagon,
      url: "/complaint",
    },
    {
      title: "Staff",
      icon: UserRound,
      url: "/staff",
    },
    {
      title: "SLA Monitoring",
      icon: ShieldCheck,
      url: "/sla",
    },
    {
      title: "Analytics",
      icon: ChartLine,
      url: "/analytics",
    },
    // {
    //   title: "Communication",
    //   icon: MessageSquare,
    //   url: "/communication",
    // },
  ];

  const secondaryMenuItems = [
    {
      title: "Settings",
      icon: Settings,
      url: "/settings",
    },
    {
      title: "Logout",
      icon: LogOut,
      url: "/logout",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 pt-4 pb-2">
        <div className="flex items-center space-x-2">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">DeptManager</span>
        </div>
        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>
      
      <SidebarContent>
        <div className="px-4 py-2">
          <div className="flex items-center space-x-3 mb-6 p-2 rounded-lg bg-secondary/50">
            <Avatar className="h-10 w-10 border-2 border-primary">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Jane Smith</p>
              <p className="text-xs text-muted-foreground">Department Manager</p>
            </div>
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
