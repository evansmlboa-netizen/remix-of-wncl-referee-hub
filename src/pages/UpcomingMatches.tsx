import { useNavigate } from "react-router-dom";
import { MatchCard } from "@/components/ui/match-card";

const upcomingMatches = [
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
];

const UpcomingMatches = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Upcoming Matches
        </h1>
        <p className="text-muted-foreground mt-1">
          All scheduled matches in the coming weeks
        </p>
      </div>

      <div className="space-y-4">
        {upcomingMatches.map((match, index) => (
          <MatchCard
            key={match.id}
            {...match}
            isHero={index === 0}
            onClick={() => navigate(`/match/${match.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingMatches;
