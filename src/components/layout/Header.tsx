import { Bell, Menu, ToggleLeft, ToggleRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface HeaderProps {
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
}

export function Header({ onMenuToggle, showMenuButton = false }: HeaderProps) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [hasNotifications] = useState(true);

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuToggle}
              className="md:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}

          {/* Mobile Logo */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-primary">WNCL</span>
          </div>

          {/* Referee Info - Desktop */}
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold text-foreground">
              Michael Richardson
            </h1>
            <p className="text-sm text-muted-foreground">
              Badge #4721 • Level 4 Referee • 2024/25 Season
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Availability Toggle */}
          <button
            onClick={() => setIsAvailable(!isAvailable)}
            className={cn(
              "hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
              isAvailable
                ? "bg-success/10 text-success"
                : "bg-muted text-muted-foreground"
            )}
          >
            {isAvailable ? (
              <ToggleRight className="w-5 h-5" />
            ) : (
              <ToggleLeft className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">
              {isAvailable ? "Available" : "Unavailable"}
            </span>
          </button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative touch-target"
          >
            <Bell className="w-5 h-5" />
            {hasNotifications && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-accent rounded-full pulse-gold" />
            )}
          </Button>

          {/* Avatar */}
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
            MR
          </div>
        </div>
      </div>
    </header>
  );
}
