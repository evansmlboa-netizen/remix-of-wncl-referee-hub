import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MatchCard } from "@/components/ui/match-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  CalendarDays, 
  List, 
  Search, 
  Filter,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const assignments = [
  {
    id: "1",
    homeTeam: "Westfield Strikers",
    awayTeam: "Northern Challengers",
    date: "Dec 28",
    time: "15:00",
    venue: "Westfield Stadium",
    competition: "Premier Division",
    role: "Centre" as const,
    status: "confirmed" as const,
  },
  {
    id: "2",
    homeTeam: "Riverside Rangers",
    awayTeam: "Ocean View FC",
    date: "Jan 4",
    time: "14:00",
    venue: "Riverside Park",
    competition: "Premier Division",
    role: "AR1" as const,
    status: "upcoming" as const,
  },
  {
    id: "3",
    homeTeam: "Mountain United",
    awayTeam: "Valley Town",
    date: "Jan 11",
    time: "15:00",
    venue: "Mountain Arena",
    competition: "Cup Quarter-Final",
    role: "Centre" as const,
    status: "pending" as const,
  },
  {
    id: "4",
    homeTeam: "Lakeside FC",
    awayTeam: "Central City",
    date: "Jan 18",
    time: "14:30",
    venue: "Lake View Ground",
    competition: "Premier Division",
    role: "AR2" as const,
    status: "upcoming" as const,
  },
];

const Assignments = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAssignments = assignments.filter(
    (match) =>
      match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.venue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            My Assignments
          </h1>
          <p className="text-muted-foreground mt-1">
            {assignments.length} matches assigned this season
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "calendar" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("calendar")}
          >
            <CalendarDays className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search matches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Status Summary */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="status-confirmed">
          2 Confirmed
        </Badge>
        <Badge variant="outline" className="status-assigned">
          1 Upcoming
        </Badge>
        <Badge variant="outline" className="status-pending">
          1 Pending Confirmation
        </Badge>
      </div>

      {/* Calendar View */}
      {viewMode === "calendar" && (
        <div className="bg-card rounded-xl border border-border p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-lg font-semibold">December 2024</h2>
            <Button variant="ghost" size="icon">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-xs font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 6 + 1;
              const isValid = day > 0 && day <= 31;
              const hasMatch = day === 28;
              const isToday = day === 28;
              
              return (
                <div
                  key={i}
                  className={`
                    aspect-square flex items-center justify-center rounded-lg text-sm relative cursor-pointer
                    ${!isValid ? "text-muted-foreground/30" : "hover:bg-muted"}
                    ${isToday ? "bg-primary text-primary-foreground font-bold" : ""}
                  `}
                >
                  {isValid ? day : ""}
                  {hasMatch && !isToday && (
                    <div className="absolute bottom-1 w-1.5 h-1.5 bg-accent rounded-full" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {filteredAssignments.map((match) => (
            <MatchCard
              key={match.id}
              {...match}
              onClick={() => navigate(`/match/${match.id}`)}
            />
          ))}
        </div>
      )}

      {filteredAssignments.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <CalendarDays className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No assignments found</p>
        </div>
      )}
    </div>
  );
};

export default Assignments;
