
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  PackageSearch,
  ClipboardList,
  BarChart3,
  Settings,
  BookUser,
  MessageSquare,
  CalendarClock,
  Building2,
  TrendingUp,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SidebarItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

const mainItems: SidebarItem[] = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: "/",
  },
  {
    title: "Leads",
    icon: <Users className="h-5 w-5" />,
    href: "/leads",
  },
  {
    title: "Manufacturers",
    icon: <Building2 className="h-5 w-5" />,
    href: "/manufacturers",
  },
  {
    title: "Orders",
    icon: <PackageSearch className="h-5 w-5" />,
    href: "/orders",
  },
  {
    title: "Documents",
    icon: <ClipboardList className="h-5 w-5" />,
    href: "/documents",
  },
];

const salesItems: SidebarItem[] = [
  {
    title: "Calendar",
    icon: <CalendarClock className="h-5 w-5" />,
    href: "/calendar",
  },
  {
    title: "Contacts",
    icon: <BookUser className="h-5 w-5" />,
    href: "/contacts",
  },
  {
    title: "Messages",
    icon: <MessageSquare className="h-5 w-5" />,
    href: "/messages",
  },
];

const insightItems: SidebarItem[] = [
  {
    title: "Performance",
    icon: <TrendingUp className="h-5 w-5" />,
    href: "/performance",
  },
  {
    title: "Reports",
    icon: <BarChart3 className="h-5 w-5" />,
    href: "/reports",
  },
  {
    title: "Settings",
    icon: <Settings className="h-5 w-5" />,
    href: "/settings",
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const isMobile = useIsMobile();
  
  return (
    <>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed top-0 bottom-0 z-50 w-[270px] border-r bg-card transition-transform duration-300 ease-in-out",
          isOpen || !isMobile ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center px-4 border-b">
          <div className="flex items-center gap-2">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <span className="text-xl font-bold">Pavittar Pharma</span>
          </div>
          
          {isMobile && (
            <Button variant="ghost" size="icon" className="ml-auto" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-[calc(100vh-64px)] scrollbar-fancy">
          <div className="space-y-4 py-4">
            <div className="px-4 py-2">
              <h2 className="px-2 text-xs font-semibold tracking-tight text-muted-foreground">
                MAIN
              </h2>
              <div className="mt-2 space-y-1">
                {mainItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      cn("nav-item", isActive && "nav-item-active")
                    }
                    onClick={isMobile ? onClose : undefined}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </NavLink>
                ))}
              </div>
            </div>
            
            <Separator className="mx-4" />
            
            <div className="px-4 py-2">
              <h2 className="px-2 text-xs font-semibold tracking-tight text-muted-foreground">
                SALES TOOLS
              </h2>
              <div className="mt-2 space-y-1">
                {salesItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      cn("nav-item", isActive && "nav-item-active")
                    }
                    onClick={isMobile ? onClose : undefined}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </NavLink>
                ))}
              </div>
            </div>
            
            <Separator className="mx-4" />
            
            <div className="px-4 py-2">
              <h2 className="px-2 text-xs font-semibold tracking-tight text-muted-foreground">
                INSIGHTS
              </h2>
              <div className="mt-2 space-y-1">
                {insightItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      cn("nav-item", isActive && "nav-item-active")
                    }
                    onClick={isMobile ? onClose : undefined}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </NavLink>
                ))}
              </div>
            </div>
            
            <Separator className="mx-4" />
            
            <div className="p-4 mt-6">
              <div className="rounded-md bg-muted p-3">
                <div className="flex flex-col items-center text-center">
                  <p className="text-xs text-muted-foreground mb-1">A custom build for</p>
                  <p className="font-semibold">Pavittar Pharmaceuticals</p>
                  <p className="text-xs text-muted-foreground mt-2">A Rishul Chanana Production</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};

export default Sidebar;
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  UserCog,
  Factory,
  ShoppingBag,
  BarChart2,
  FileText,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12 w-60 border-r min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Dashboard
          </h2>
          <div className="space-y-1">
            <NavLink to="/" end>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Overview
                </Button>
              )}
            </NavLink>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Sales & Leads
          </h2>
          <div className="space-y-1">
            <NavLink to="/leads">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Leads
                </Button>
              )}
            </NavLink>
            <NavLink to="/lead-management">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <UserCog className="mr-2 h-4 w-4" />
                  Lead Management
                </Button>
              )}
            </NavLink>
            <NavLink to="/manufacturers">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <Factory className="mr-2 h-4 w-4" />
                  Manufacturers
                </Button>
              )}
            </NavLink>
            <NavLink to="/orders">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Orders
                </Button>
              )}
            </NavLink>
            <NavLink to="/documents">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Documents
                </Button>
              )}
            </NavLink>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Analytics
          </h2>
          <div className="space-y-1">
            <NavLink to="/performance">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Performance
                </Button>
              )}
            </NavLink>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            System
          </h2>
          <div className="space-y-1">
            <NavLink to="/settings">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
