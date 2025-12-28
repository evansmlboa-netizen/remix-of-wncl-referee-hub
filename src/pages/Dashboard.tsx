import { 
  CalendarDays, 
  ClipboardList, 
  MapPin, 
  Navigation, 
  Clock,
  TrendingUp,
  Car,
  FileText,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Next match date (3 days from now for demo)
const nextMatchDate = new Date();
nextMatchDate.setDate(nextMatchDate.getDate() + 3);
nextMatchDate.setHours(15, 0, 0, 0);

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Hello, Michael
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back. Here's your match overview.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/availability')}>
            <CalendarDays className="w-4 h-4 mr-2" />
            Set Availability
          </Button>
          <Button variant="default">
            <FileText className="w-4 h-4 mr-2" />
            Laws Updates
          </Button>
        </div>
      </div>

      {/* Next Assignment Hero Card */}
      <div className="bg-primary text-primary-foreground rounded-2xl p-6 md:p-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full border-[40px] border-primary-foreground" />
          <div className="absolute -left-10 -bottom-10 w-60 h-60 rounded-full border-[30px] border-primary-foreground" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="border-accent bg-accent/20 text-accent">
              Next Assignment
            </Badge>
            <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground/70">
              Premier Division
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Match Info */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center text-lg font-bold">
                  WS
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">Westfield Strikers</h2>
                  <span className="text-sm text-primary-foreground/60">Home</span>
                </div>
              </div>
              
              <div className="text-sm text-primary-foreground/50 font-medium mb-3 ml-1">vs</div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center text-lg font-bold">
                  NC
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">Northern Challengers</h2>
                  <span className="text-sm text-primary-foreground/60">Away</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Saturday, 15:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Westfield Stadium</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <span className="text-accent font-semibold">Your Role:</span>
                <Badge className="bg-accent text-accent-foreground">Centre Referee</Badge>
              </div>
            </div>

            {/* Countdown & Actions */}
            <div className="flex flex-col items-start md:items-end justify-between">
              <div className="mb-4">
                <p className="text-sm text-primary-foreground/60 mb-2 md:text-right">Kickoff in</p>
                <CountdownTimer targetDate={nextMatchDate} />
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                <Button 
                  variant="secondary" 
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  onClick={() => navigate('/match/1')}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
                <Button 
                  variant="outline" 
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => navigate('/match/1')}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="This Week"
          value={2}
          icon={CalendarDays}
          variant="accent"
        />
        <StatCard
          label="Reports Pending"
          value={1}
          icon={ClipboardList}
          variant="warning"
        />
        <StatCard
          label="Total This Season"
          value={24}
          icon={TrendingUp}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          label="Travel Estimate"
          value="186 mi"
          icon={Car}
        />
      </div>

      {/* Quick Actions & Recent */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { text: "Report submitted for Valley FC vs Hilltop United", time: "2 hours ago", type: "success" },
              { text: "New assignment: Riverside vs Ocean View", time: "1 day ago", type: "info" },
              { text: "Availability updated for December", time: "2 days ago", type: "default" },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-success' : 
                  activity.type === 'info' ? 'bg-primary' : 'bg-muted-foreground'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-foreground">{activity.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Reports */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Pending Reports</h3>
            <Badge variant="outline" className="status-pending">1 pending</Badge>
          </div>
          
          <div 
            className="bg-warning/5 border border-warning/20 rounded-lg p-4 cursor-pointer hover:bg-warning/10 transition-colors"
            onClick={() => navigate('/report')}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-foreground">Valley FC vs Hilltop United</span>
              <ClipboardList className="w-4 h-4 text-warning" />
            </div>
            <p className="text-sm text-muted-foreground">Match completed Dec 21, 2024</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-3 border-warning text-warning hover:bg-warning/10"
            >
              Submit Report
            </Button>
          </div>

          <div className="mt-4 p-4 border border-border rounded-lg">
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium">All other reports submitted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
