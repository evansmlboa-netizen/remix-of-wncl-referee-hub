import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Calendar as CalendarIcon,
  Plane,
  Briefcase,
  Heart,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface DayStatus {
  available: boolean;
  assigned: boolean;
  reason?: string;
}

const Availability = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availability, setAvailability] = useState<Record<string, DayStatus>>({
    "2024-12-28": { available: true, assigned: true },
    "2025-01-04": { available: true, assigned: true },
    "2025-01-11": { available: true, assigned: true },
    "2024-12-24": { available: false, assigned: false, reason: "Holiday" },
    "2024-12-25": { available: false, assigned: false, reason: "Holiday" },
    "2024-12-26": { available: false, assigned: false, reason: "Holiday" },
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [blockReason, setBlockReason] = useState("");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDayClick = (day: number) => {
    const dateKey = formatDateKey(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const status = availability[dateKey];
    
    if (status?.assigned) {
      toast({
        title: "Cannot modify",
        description: "You have an assignment on this date.",
        variant: "destructive",
      });
      return;
    }

    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    setDialogOpen(true);
  };

  const toggleAvailability = (makeUnavailable: boolean) => {
    if (!selectedDate) return;
    
    const dateKey = formatDateKey(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );

    if (makeUnavailable) {
      setAvailability({
        ...availability,
        [dateKey]: { available: false, assigned: false, reason: blockReason },
      });
      toast({
        title: "Date blocked",
        description: `Marked as unavailable: ${blockReason || "Personal"}`,
      });
    } else {
      const newAvailability = { ...availability };
      delete newAvailability[dateKey];
      setAvailability(newAvailability);
      toast({
        title: "Date available",
        description: "You're now available for assignments.",
      });
    }
    
    setDialogOpen(false);
    setBlockReason("");
  };

  const legendItems = [
    { color: "bg-success", label: "Available" },
    { color: "bg-muted", label: "Unavailable" },
    { color: "bg-primary", label: "Assigned" },
  ];

  const reasonIcons = {
    Holiday: Plane,
    Work: Briefcase,
    Personal: Heart,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Availability Calendar
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your availability for match assignments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-success text-success-foreground">
            24 days available
          </Badge>
          <Badge variant="outline">6 blocked</Badge>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${item.color}`} />
            <span className="text-sm text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="bg-card rounded-2xl border border-border p-4 md:p-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" onClick={prevMonth}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-bold">
            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <Button variant="ghost" size="icon" onClick={nextMonth}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before first of month */}
          {Array.from({ length: firstDay }, (_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* Days of month */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const dateKey = formatDateKey(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              day
            );
            const status = availability[dateKey];
            const isToday =
              new Date().toDateString() ===
              new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth(),
                day
              ).toDateString();

            let bgColor = "bg-success/20 hover:bg-success/30";
            let textColor = "text-success";
            let icon = <Check className="w-3 h-3" />;

            if (status?.assigned) {
              bgColor = "bg-primary hover:bg-primary/90";
              textColor = "text-primary-foreground";
              icon = <CalendarIcon className="w-3 h-3" />;
            } else if (status && !status.available) {
              bgColor = "bg-muted hover:bg-muted/80";
              textColor = "text-muted-foreground";
              icon = <X className="w-3 h-3" />;
            }

            return (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                className={`
                  aspect-square flex flex-col items-center justify-center rounded-lg
                  transition-all duration-200 relative touch-target
                  ${bgColor} ${textColor}
                  ${isToday ? "ring-2 ring-accent ring-offset-2" : ""}
                `}
              >
                <span className="text-sm font-medium">{day}</span>
                <span className="absolute bottom-1 opacity-70">{icon}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Blocked Dates Summary */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-semibold text-foreground mb-4">Blocked Dates</h3>
        <div className="space-y-3">
          {Object.entries(availability)
            .filter(([_, status]) => !status.available && !status.assigned)
            .map(([dateKey, status]) => {
              const [year, month, day] = dateKey.split("-");
              const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
              const ReasonIcon = reasonIcons[status.reason as keyof typeof reasonIcons] || Heart;
              
              return (
                <div
                  key={dateKey}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <ReasonIcon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {date.toLocaleDateString("en-GB", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {status.reason || "Personal"}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newAvailability = { ...availability };
                      delete newAvailability[dateKey];
                      setAvailability(newAvailability);
                      toast({
                        title: "Date unblocked",
                        description: "You're now available for this date.",
                      });
                    }}
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
          {Object.values(availability).filter((s) => !s.available && !s.assigned)
            .length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No blocked dates
            </p>
          )}
        </div>
      </div>

      {/* Block Date Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedDate?.toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Label>Reason for blocking (optional)</Label>
              <Select value={blockReason} onValueChange={setBlockReason}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Holiday">Holiday</SelectItem>
                  <SelectItem value="Work">Work Commitment</SelectItem>
                  <SelectItem value="Injury">Injury</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => toggleAvailability(false)}
              >
                <Check className="w-4 h-4 mr-2 text-success" />
                Mark Available
              </Button>
              <Button
                variant="default"
                className="flex-1"
                onClick={() => toggleAvailability(true)}
              >
                <X className="w-4 h-4 mr-2" />
                Block Date
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Availability;
