import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  Calendar,
  History,
  User,
  ChevronLeft,
  Shield,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/assignments", label: "My Assignments", icon: CalendarCheck },
  { to: "/upcoming", label: "Upcoming Matches", icon: CalendarDays },
  { to: "/report", label: "Submit Report", icon: ClipboardList },
  { to: "/availability", label: "Availability", icon: Calendar },
  { to: "/past-matches", label: "Past Matches", icon: History },
  { to: "/profile", label: "Profile", icon: User },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col bg-sidebar text-sidebar-foreground h-screen sticky top-0 transition-all duration-300 ease-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-4 py-6 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
          <Shield className="w-6 h-6 text-accent-foreground" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <p className="font-bold text-lg tracking-tight">WNCL</p>
            <p className="text-xs text-sidebar-foreground/70">Referee Portal</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 touch-target group",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 flex-shrink-0 transition-colors",
                  isActive ? "text-sidebar-primary" : "group-hover:text-sidebar-primary"
                )}
              />
              {!collapsed && (
                <span className="font-medium text-sm animate-fade-in">{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center gap-2 px-4 py-4 border-t border-sidebar-border hover:bg-sidebar-accent/30 transition-colors"
      >
        <ChevronLeft
          className={cn(
            "w-5 h-5 transition-transform duration-300",
            collapsed && "rotate-180"
          )}
        />
        {!collapsed && <span className="text-sm">Collapse</span>}
      </button>
    </aside>
  );
}
