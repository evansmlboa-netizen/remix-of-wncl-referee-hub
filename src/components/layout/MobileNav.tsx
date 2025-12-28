import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CalendarCheck,
  ClipboardList,
  Calendar,
  User,
  MoreHorizontal,
  CalendarDays,
  History,
  X,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const mobileNavItems = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/assignments", label: "Matches", icon: CalendarCheck },
  { to: "/report", label: "Report", icon: ClipboardList },
  { to: "/availability", label: "Schedule", icon: Calendar },
];

const moreMenuItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/assignments", label: "My Assignments", icon: CalendarCheck },
  { to: "/upcoming", label: "Upcoming Matches", icon: CalendarDays },
  { to: "/report", label: "Submit Report", icon: ClipboardList },
  { to: "/availability", label: "Availability", icon: Calendar },
  { to: "/past-matches", label: "Past Matches", icon: History },
  { to: "/profile", label: "Profile & Documents", icon: User },
];

export function MobileNav() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-sidebar glass border-t border-sidebar-border z-50 pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {mobileNavItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 touch-target min-w-[60px]",
                isActive
                  ? "text-sidebar-primary"
                  : "text-sidebar-foreground/70"
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-xl transition-all duration-200",
                  isActive && "bg-sidebar-accent"
                )}
              >
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}

        {/* More Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 touch-target min-w-[60px] text-sidebar-foreground/70"
            >
              <div className="p-2 rounded-xl transition-all duration-200">
                <MoreHorizontal className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">More</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="bg-sidebar text-sidebar-foreground rounded-t-2xl pb-safe">
            <SheetHeader className="pb-4 border-b border-sidebar-border">
              <SheetTitle className="text-sidebar-foreground">Menu</SheetTitle>
            </SheetHeader>
            <div className="py-4 space-y-1">
              {moreMenuItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <NavLink
                    key={item.to + item.label}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "w-5 h-5",
                        isActive && "text-sidebar-primary"
                      )}
                    />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
