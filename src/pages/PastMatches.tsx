import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  ChevronRight,
  CheckCircle2,
  FileText,
  Calendar,
} from "lucide-react";

const pastMatches = [
  {
    id: "pm1",
    homeTeam: "Valley FC",
    awayTeam: "Hilltop United",
    date: "Dec 21, 2024",
    score: "2-1",
    role: "Centre",
    reportStatus: "submitted",
    competition: "Premier Division",
    cards: { yellow: 3, red: 0 },
  },
  {
    id: "pm2",
    homeTeam: "Coastal City",
    awayTeam: "Harbor Town",
    date: "Dec 14, 2024",
    score: "0-0",
    role: "AR1",
    reportStatus: "submitted",
    competition: "Premier Division",
    cards: { yellow: 1, red: 0 },
  },
  {
    id: "pm3",
    homeTeam: "Forest Green",
    awayTeam: "Meadow FC",
    date: "Dec 7, 2024",
    score: "3-2",
    role: "Centre",
    reportStatus: "submitted",
    competition: "Cup Round 3",
    cards: { yellow: 4, red: 1 },
  },
  {
    id: "pm4",
    homeTeam: "Mountain Eagles",
    awayTeam: "Lake District",
    date: "Nov 30, 2024",
    score: "1-1",
    role: "4th Official",
    reportStatus: "submitted",
    competition: "Premier Division",
    cards: { yellow: 2, red: 0 },
  },
  {
    id: "pm5",
    homeTeam: "Riverside United",
    awayTeam: "Valley FC",
    date: "Nov 23, 2024",
    score: "4-0",
    role: "Centre",
    reportStatus: "submitted",
    competition: "Premier Division",
    cards: { yellow: 2, red: 0 },
  },
];

const PastMatches = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMatches = pastMatches.filter(
    (match) =>
      match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Past Matches
          </h1>
          <p className="text-muted-foreground mt-1">
            {pastMatches.length} completed matches this season
          </p>
        </div>
        <Badge variant="outline" className="w-fit">
          <CheckCircle2 className="w-4 h-4 mr-1 text-success" />
          All reports submitted
        </Badge>
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

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <p className="text-2xl font-bold text-primary">24</p>
          <p className="text-sm text-muted-foreground">Total Matches</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <p className="text-2xl font-bold">15</p>
          <p className="text-sm text-muted-foreground">As Centre</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <div className="w-3 h-4 bg-accent rounded-sm" />
            <span className="text-2xl font-bold">42</span>
          </div>
          <p className="text-sm text-muted-foreground">Yellow Cards</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <div className="w-3 h-4 bg-destructive rounded-sm" />
            <span className="text-2xl font-bold">3</span>
          </div>
          <p className="text-sm text-muted-foreground">Red Cards</p>
        </div>
      </div>

      {/* Match List */}
      <div className="space-y-3">
        {filteredMatches.map((match) => (
          <div
            key={match.id}
            className="bg-card rounded-xl border border-border p-4 md:p-5 cursor-pointer card-interactive"
            onClick={() => navigate(`/past-match/${match.id}`)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {match.competition}
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                    {match.role}
                  </Badge>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {match.homeTeam.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold">{match.homeTeam}</p>
                      <p className="text-xs text-muted-foreground">Home</p>
                    </div>
                  </div>

                  <div className="text-center px-4">
                    <p className="text-xl font-bold">{match.score}</p>
                    <p className="text-xs text-muted-foreground">FT</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                      {match.awayTeam.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold">{match.awayTeam}</p>
                      <p className="text-xs text-muted-foreground">Away</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{match.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-4 bg-accent rounded-sm" />
                      <span>{match.cards.yellow}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-4 bg-destructive rounded-sm" />
                      <span>{match.cards.red}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 ml-4">
                <div className="hidden sm:flex items-center gap-2 text-success">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">Report</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMatches.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No matches found</p>
        </div>
      )}
    </div>
  );
};

export default PastMatches;
