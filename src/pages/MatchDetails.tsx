import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Navigation,
  Phone,
  Users,
  Car,
  Cloud,
  ThermometerSun,
  Shirt,
  AlertCircle,
} from "lucide-react";

const MatchDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const matchData = {
    homeTeam: "Westfield Strikers",
    awayTeam: "Northern Challengers",
    date: "Saturday, December 28, 2024",
    time: "15:00",
    venue: "Westfield Stadium",
    address: "123 Stadium Road, Westfield, WF1 2AB",
    competition: "Premier Division",
    role: "Centre Referee",
    status: "confirmed",
    expectedAttendance: "~2,500",
    weather: {
      temp: "8°C",
      condition: "Partly Cloudy",
      wind: "12 mph NW",
    },
    officials: [
      { name: "Michael Richardson", role: "Centre", badge: "4721" },
      { name: "Sarah Thompson", role: "AR1", badge: "5234" },
      { name: "James Wilson", role: "AR2", badge: "4892" },
    ],
    contacts: [
      { name: "Tom Harris", role: "Home Club Secretary", phone: "+44 7700 900123" },
      { name: "Emma Davies", role: "Away Team Manager", phone: "+44 7700 900456" },
    ],
    notes: {
      parking: "Officials parking available in Car Park B. Enter via Gate 3.",
      changingRoom: "Match Officials Room 2 (adjacent to home changing rooms)",
      arrival: "Please arrive at least 75 minutes before kickoff.",
    },
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="gap-2 -ml-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      {/* Match Header */}
      <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <Badge variant="outline" className="status-confirmed">
            Confirmed
          </Badge>
          <Badge variant="outline">{matchData.competition}</Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Teams */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
                WS
              </div>
              <div>
                <h2 className="text-xl font-bold">{matchData.homeTeam}</h2>
                <span className="text-sm text-muted-foreground">Home</span>
              </div>
            </div>

            <div className="text-sm text-muted-foreground font-medium mb-3 ml-1">
              vs
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground">
                NC
              </div>
              <div>
                <h2 className="text-xl font-bold">{matchData.awayTeam}</h2>
                <span className="text-sm text-muted-foreground">Away</span>
              </div>
            </div>
          </div>

          {/* Your Role */}
          <div className="flex flex-col justify-center">
            <p className="text-sm text-muted-foreground mb-2">Your Role</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <Shirt className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">
                  {matchData.role}
                </p>
                <p className="text-sm text-muted-foreground">
                  Badge #{matchData.officials[0].badge}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Time & Location */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date & Time</p>
              <p className="font-semibold">{matchData.date}</p>
              <p className="text-lg font-bold text-primary">{matchData.time}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Venue</p>
              <p className="font-semibold">{matchData.venue}</p>
              <p className="text-sm text-muted-foreground">{matchData.address}</p>
            </div>
          </div>
          <Button className="w-full gap-2" onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(matchData.address)}`, '_blank')}>
            <Navigation className="w-4 h-4" />
            Get Directions
          </Button>
        </div>
      </div>

      {/* Venue Map Placeholder */}
      <div className="bg-muted rounded-xl h-48 md:h-64 flex items-center justify-center border border-border overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
        <div className="text-center z-10">
          <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Interactive Map</p>
          <Button variant="outline" size="sm" className="mt-2" onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(matchData.address)}`, '_blank')}>
            Open in Maps
          </Button>
        </div>
      </div>

      {/* Weather & Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <ThermometerSun className="w-5 h-5 text-accent mx-auto mb-2" />
          <p className="text-lg font-bold">{matchData.weather.temp}</p>
          <p className="text-xs text-muted-foreground">{matchData.weather.condition}</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <Cloud className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm font-medium">{matchData.weather.wind}</p>
          <p className="text-xs text-muted-foreground">Wind</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <Users className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-lg font-bold">{matchData.expectedAttendance}</p>
          <p className="text-xs text-muted-foreground">Expected</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <Car className="w-5 h-5 text-success mx-auto mb-2" />
          <p className="text-sm font-medium">45 min</p>
          <p className="text-xs text-muted-foreground">Drive Time</p>
        </div>
      </div>

      {/* Officials Team */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Match Officials
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {matchData.officials.map((official, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                index === 0
                  ? "bg-primary/5 border-primary/20"
                  : "bg-muted/50 border-border"
              }`}
            >
              <p className="font-medium">{official.name}</p>
              <p className="text-sm text-muted-foreground">
                {official.role} • #{official.badge}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-primary" />
          Team Contacts
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {matchData.contacts.map((contact, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border"
            >
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-muted-foreground">{contact.role}</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href={`tel:${contact.phone}`}>
                  <Phone className="w-4 h-4" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-accent/10 rounded-xl border border-accent/20 p-5">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-accent-foreground" />
          Important Notes
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <Car className="w-4 h-4 text-accent-foreground mt-0.5 flex-shrink-0" />
            <p><strong>Parking:</strong> {matchData.notes.parking}</p>
          </div>
          <div className="flex items-start gap-2">
            <Shirt className="w-4 h-4 text-accent-foreground mt-0.5 flex-shrink-0" />
            <p><strong>Changing Room:</strong> {matchData.notes.changingRoom}</p>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-accent-foreground mt-0.5 flex-shrink-0" />
            <p><strong>Arrival:</strong> {matchData.notes.arrival}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 pb-4">
        <Button className="flex-1 md:flex-none gap-2">
          <Navigation className="w-4 h-4" />
          Start Navigation
        </Button>
        <Button variant="outline" className="flex-1 md:flex-none" onClick={() => navigate('/report')}>
          Pre-Match Checklist
        </Button>
      </div>
    </div>
  );
};

export default MatchDetails;
