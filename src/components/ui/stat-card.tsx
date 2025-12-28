import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  variant?: "default" | "warning" | "success" | "accent";
}

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  variant = "default",
}: StatCardProps) {
  const variantStyles = {
    default: {
      bg: "bg-card",
      iconBg: "bg-muted",
      iconColor: "text-muted-foreground",
      valueColor: "text-foreground",
    },
    warning: {
      bg: "bg-card",
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
      valueColor: "text-warning",
    },
    success: {
      bg: "bg-card",
      iconBg: "bg-success/10",
      iconColor: "text-success",
      valueColor: "text-success",
    },
    accent: {
      bg: "bg-card",
      iconBg: "bg-accent/20",
      iconColor: "text-accent-foreground",
      valueColor: "text-foreground",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "rounded-xl border border-border p-4 md:p-5",
        styles.bg
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            styles.iconBg
          )}
        >
          <Icon className={cn("w-5 h-5", styles.iconColor)} />
        </div>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              trend.positive
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive"
            )}
          >
            {trend.positive ? "+" : ""}
            {trend.value}%
          </span>
        )}
      </div>
      <p
        className={cn(
          "text-2xl md:text-3xl font-bold animate-count-up",
          styles.valueColor
        )}
      >
        {value}
      </p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
