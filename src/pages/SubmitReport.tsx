import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Square,
  FileText,
  Send,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CardEntry {
  id: string;
  type: "yellow" | "red";
  playerName: string;
  team: string;
  minute: string;
  reason: string;
}

interface GoalEntry {
  id: string;
  playerName: string;
  team: string;
  minute: string;
}

const SubmitReport = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const [goals, setGoals] = useState<GoalEntry[]>([]);
  const [cards, setCards] = useState<CardEntry[]>([]);
  const [incidents, setIncidents] = useState("");
  const [attendance, setAttendance] = useState("");
  const [pitchCondition, setPitchCondition] = useState("");

  const match = {
    homeTeam: "Valley FC",
    awayTeam: "Hilltop United",
    date: "December 21, 2024",
    venue: "Valley Stadium",
  };

  const addGoal = () => {
    setGoals([
      ...goals,
      { id: Date.now().toString(), playerName: "", team: "", minute: "" },
    ]);
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  const addCard = (type: "yellow" | "red") => {
    setCards([
      ...cards,
      {
        id: Date.now().toString(),
        type,
        playerName: "",
        team: "",
        minute: "",
        reason: "",
      },
    ]);
  };

  const removeCard = (id: string) => {
    setCards(cards.filter((c) => c.id !== id));
  };

  const handleSubmit = () => {
    toast({
      title: "Report Submitted Successfully",
      description: "Your match report has been submitted and recorded.",
    });
    navigate("/");
  };

  const totalSteps = 4;

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}
        className="gap-2 -ml-2"
      >
        <ArrowLeft className="w-4 h-4" />
        {step > 1 ? "Previous Step" : "Back"}
      </Button>

      {/* Match Info */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="status-pending">
            Report Pending
          </Badge>
        </div>
        <h2 className="text-lg font-bold">
          {match.homeTeam} vs {match.awayTeam}
        </h2>
        <p className="text-sm text-muted-foreground">
          {match.date} • {match.venue}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex-1 flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                i + 1 <= step
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i + 1 < step ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                i + 1
              )}
            </div>
            {i < totalSteps - 1 && (
              <div
                className={`flex-1 h-1 rounded-full ${
                  i + 1 < step ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Score */}
      {step === 1 && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="text-center mb-6">
            <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="text-xl font-bold">Final Score</h3>
            <p className="text-sm text-muted-foreground">
              Enter the final score for this match
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-center">
              <Label className="text-sm text-muted-foreground mb-2 block">
                {match.homeTeam}
              </Label>
              <Input
                type="number"
                min="0"
                value={homeScore}
                onChange={(e) => setHomeScore(e.target.value)}
                className="text-center text-3xl font-bold h-16"
                placeholder="0"
              />
            </div>
            <div className="text-center text-2xl font-bold text-muted-foreground">
              -
            </div>
            <div className="text-center">
              <Label className="text-sm text-muted-foreground mb-2 block">
                {match.awayTeam}
              </Label>
              <Input
                type="number"
                min="0"
                value={awayScore}
                onChange={(e) => setAwayScore(e.target.value)}
                className="text-center text-3xl font-bold h-16"
                placeholder="0"
              />
            </div>
          </div>

          {/* Goal Scorers */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">Goal Scorers</h4>
              <Button variant="outline" size="sm" onClick={addGoal}>
                <Plus className="w-4 h-4 mr-1" />
                Add Goal
              </Button>
            </div>

            <div className="space-y-3">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className="grid grid-cols-12 gap-2 items-center bg-muted/50 p-3 rounded-lg"
                >
                  <Input
                    placeholder="Player"
                    className="col-span-4"
                    value={goal.playerName}
                    onChange={(e) =>
                      setGoals(
                        goals.map((g) =>
                          g.id === goal.id
                            ? { ...g, playerName: e.target.value }
                            : g
                        )
                      )
                    }
                  />
                  <Select
                    value={goal.team}
                    onValueChange={(value) =>
                      setGoals(
                        goals.map((g) =>
                          g.id === goal.id ? { ...g, team: value } : g
                        )
                      )
                    }
                  >
                    <SelectTrigger className="col-span-4">
                      <SelectValue placeholder="Team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">{match.homeTeam}</SelectItem>
                      <SelectItem value="away">{match.awayTeam}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Min"
                    type="number"
                    className="col-span-2"
                    value={goal.minute}
                    onChange={(e) =>
                      setGoals(
                        goals.map((g) =>
                          g.id === goal.id
                            ? { ...g, minute: e.target.value }
                            : g
                        )
                      )
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="col-span-2"
                    onClick={() => removeGoal(goal.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
              {goals.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No goals recorded yet
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Cards */}
      {step === 2 && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="text-center mb-6">
            <Square className="w-8 h-8 text-accent mx-auto mb-2" fill="currentColor" />
            <h3 className="text-xl font-bold">Disciplinary Cards</h3>
            <p className="text-sm text-muted-foreground">
              Record all cautions and send-offs
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => addCard("yellow")}
              className="gap-2 border-accent text-accent-foreground hover:bg-accent/10"
            >
              <div className="w-4 h-6 bg-accent rounded-sm" />
              Yellow Card
            </Button>
            <Button
              variant="outline"
              onClick={() => addCard("red")}
              className="gap-2 border-destructive text-destructive hover:bg-destructive/10"
            >
              <div className="w-4 h-6 bg-destructive rounded-sm" />
              Red Card
            </Button>
          </div>

          <div className="space-y-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`p-4 rounded-lg border ${
                  card.type === "yellow"
                    ? "bg-accent/10 border-accent/30"
                    : "bg-destructive/10 border-destructive/30"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-6 rounded-sm ${
                        card.type === "yellow" ? "bg-accent" : "bg-destructive"
                      }`}
                    />
                    <span className="font-medium capitalize">
                      {card.type} Card
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCard(card.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Input
                    placeholder="Player Name"
                    value={card.playerName}
                    onChange={(e) =>
                      setCards(
                        cards.map((c) =>
                          c.id === card.id
                            ? { ...c, playerName: e.target.value }
                            : c
                        )
                      )
                    }
                  />
                  <Select
                    value={card.team}
                    onValueChange={(value) =>
                      setCards(
                        cards.map((c) =>
                          c.id === card.id ? { ...c, team: value } : c
                        )
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">{match.homeTeam}</SelectItem>
                      <SelectItem value="away">{match.awayTeam}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Minute"
                    type="number"
                    value={card.minute}
                    onChange={(e) =>
                      setCards(
                        cards.map((c) =>
                          c.id === card.id
                            ? { ...c, minute: e.target.value }
                            : c
                        )
                      )
                    }
                  />
                  <Select
                    value={card.reason}
                    onValueChange={(value) =>
                      setCards(
                        cards.map((c) =>
                          c.id === card.id ? { ...c, reason: value } : c
                        )
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unsporting">
                        Unsporting Behaviour
                      </SelectItem>
                      <SelectItem value="dissent">Dissent</SelectItem>
                      <SelectItem value="persistent">
                        Persistent Offences
                      </SelectItem>
                      <SelectItem value="delaying">Delaying Restart</SelectItem>
                      <SelectItem value="distance">
                        Failing to Respect Distance
                      </SelectItem>
                      <SelectItem value="violent">Violent Conduct</SelectItem>
                      <SelectItem value="spitting">Spitting</SelectItem>
                      <SelectItem value="dogso">
                        Denying Goal Opportunity
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
            {cards.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Square className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p>No cards issued</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Incidents */}
      {step === 3 && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="text-center mb-6">
            <AlertTriangle className="w-8 h-8 text-warning mx-auto mb-2" />
            <h3 className="text-xl font-bold">Match Incidents</h3>
            <p className="text-sm text-muted-foreground">
              Report any misconduct or notable incidents
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Incident Report</Label>
              <Textarea
                placeholder="Describe any incidents that occurred during the match..."
                className="mt-2 min-h-[150px]"
                value={incidents}
                onChange={(e) => setIncidents(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Attendance</Label>
                <Input
                  type="number"
                  placeholder="Estimated attendance"
                  className="mt-2"
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                />
              </div>
              <div>
                <Label>Pitch Condition</Label>
                <Select
                  value={pitchCondition}
                  onValueChange={setPitchCondition}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                    <SelectItem value="unplayable">
                      Nearly Unplayable
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Review & Submit */}
      {step === 4 && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="text-center mb-6">
            <Send className="w-8 h-8 text-success mx-auto mb-2" />
            <h3 className="text-xl font-bold">Review & Submit</h3>
            <p className="text-sm text-muted-foreground">
              Please review your report before submitting
            </p>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Final Score</p>
              <p className="text-2xl font-bold">
                {match.homeTeam} {homeScore || "0"} - {awayScore || "0"}{" "}
                {match.awayTeam}
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">
                Goals Recorded
              </p>
              <p className="font-medium">{goals.length} goals</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">
                Cards Issued
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-6 bg-accent rounded-sm" />
                  <span className="font-medium">
                    {cards.filter((c) => c.type === "yellow").length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-6 bg-destructive rounded-sm" />
                  <span className="font-medium">
                    {cards.filter((c) => c.type === "red").length}
                  </span>
                </div>
              </div>
            </div>

            {incidents && (
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Incidents Reported
                </p>
                <p className="text-sm">{incidents.substring(0, 100)}...</p>
              </div>
            )}
          </div>

          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="w-5 h-5" />
              <p className="font-medium">Ready to submit</p>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Once submitted, your report will be sent to the league office.
            </p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        {step < totalSteps ? (
          <Button className="flex-1" onClick={() => setStep(step + 1)}>
            Continue
          </Button>
        ) : (
          <Button className="flex-1 bg-success hover:bg-success/90" onClick={handleSubmit}>
            <Send className="w-4 h-4 mr-2" />
            Submit Report
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubmitReport;
