import { cn } from "@/lib/utils";
import { MapPin, Clock, Users, ChevronRight } from "lucide-react";
import { Badge } from "./badge";

export interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  competition: string;
  role: "Centre" | "AR1" | "AR2" | "4th Official";
  status: "upcoming" | "confirmed" | "pending" | "completed";
  onClick?: () => void;
  isHero?: boolean;
}

export function MatchCard({
  homeTeam,
  awayTeam,
  date,
  time,
  venue,
  competition,
  role,
  status,
  onClick,
  isHero = false,
}: MatchCardProps) {
  const statusStyles = {
    upcoming: "status-assigned",
    confirmed: "status-confirmed",
    pending: "status-pending",
    completed: "bg-muted text-muted-foreground border-border",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-card rounded-xl border border-border p-4 md:p-5 cursor-pointer card-interactive",
        isHero && "bg-primary text-primary-foreground border-primary"
      )}
    >
      {/* Competition & Status */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={cn(
            "text-xs font-medium",
            isHero ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {competition}
        </span>
        <Badge
          variant="outline"
          className={cn(
            "text-xs capitalize",
            isHero
              ? "border-accent bg-accent/20 text-accent"
              : statusStyles[status]
          )}
        >
          {status}
        </Badge>
      </div>

      {/* Teams */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold",
              isHero
                ? "bg-primary-foreground/10 text-primary-foreground"
                : "bg-primary/10 text-primary"
            )}
          >
            {homeTeam.substring(0, 2).toUpperCase()}
          </div>
          <span className="font-semibold">{homeTeam}</span>
        </div>
        <div
          className={cn(
            "text-xs font-medium px-3 py-0.5 w-fit rounded",
            isHero
              ? "text-primary-foreground/60"
              : "text-muted-foreground"
          )}
        >
          vs
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold",
              isHero
                ? "bg-primary-foreground/10 text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {awayTeam.substring(0, 2).toUpperCase()}
          </div>
          <span className="font-semibold">{awayTeam}</span>
        </div>
      </div>

      {/* Match Details */}
      <div
        className={cn(
          "flex flex-wrap gap-4 text-sm mb-4",
          isHero ? "text-primary-foreground/80" : "text-muted-foreground"
        )}
      >
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>
            {date} • {time}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          <span>{venue}</span>
        </div>
      </div>

      {/* Role & Action */}
      <div className="flex items-center justify-between pt-3 border-t border-border/30">
        <div className="flex items-center gap-2">
          <Users
            className={cn(
              "w-4 h-4",
              isHero ? "text-accent" : "text-primary"
            )}
          />
          <span
            className={cn(
              "text-sm font-medium",
              isHero ? "text-accent" : "text-primary"
            )}
          >
            {role}
          </span>
        </div>
        <ChevronRight
          className={cn(
            "w-5 h-5",
            isHero ? "text-primary-foreground/50" : "text-muted-foreground"
          )}
        />
      </div>
    </div>
  );
}
