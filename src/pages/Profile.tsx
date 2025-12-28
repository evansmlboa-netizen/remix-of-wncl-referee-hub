import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Shield,
  Award,
  FileText,
  Upload,
  CheckCircle2,
  Clock,
  CreditCard,
  Settings,
  Bell,
  ChevronRight,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const referee = {
    name: "Michael Richardson",
    email: "m.richardson@email.com",
    phone: "+44 7700 900789",
    badge: "4721",
    level: "Level 4",
    county: "Western County FA",
    registeredSince: "2019",
    currentSeason: "2024/25",
  };

  const qualifications = [
    { name: "Level 4 Referee", status: "active", expires: "June 2025" },
    { name: "Safeguarding Certificate", status: "active", expires: "March 2025" },
    { name: "First Aid Training", status: "expiring", expires: "January 2025" },
  ];

  const documents = [
    { name: "DBS Certificate", uploaded: "Oct 2024", status: "verified" },
    { name: "Photo ID", uploaded: "Aug 2024", status: "verified" },
    { name: "Insurance Document", uploaded: "Sep 2024", status: "verified" },
  ];

  const payments = [
    { match: "Valley FC vs Hilltop United", amount: "£65.00", date: "Dec 21", status: "pending" },
    { match: "Coastal City vs Harbor Town", amount: "£45.00", date: "Dec 14", status: "paid" },
    { match: "Forest Green vs Meadow FC", amount: "£65.00", date: "Dec 7", status: "paid" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Profile Header */}
      <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground text-3xl font-bold">
              MR
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-success flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success-foreground" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold">{referee.name}</h1>
              <Badge className="bg-accent text-accent-foreground">
                {referee.level}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-4">
              Badge #{referee.badge} • {referee.county}
            </p>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Since {referee.registeredSince}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-accent-foreground" />
                <span>Season {referee.currentSeason}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            <Settings className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        {/* Contact Info */}
        {isEditing && (
          <div className="mt-6 pt-6 border-t border-border space-y-4 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input defaultValue={referee.name} className="mt-2" />
              </div>
              <div>
                <Label>Email</Label>
                <Input defaultValue={referee.email} className="mt-2" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input defaultValue={referee.phone} className="mt-2" />
              </div>
              <div>
                <Label>Badge Number</Label>
                <Input defaultValue={referee.badge} disabled className="mt-2" />
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => {
                setIsEditing(false);
                toast({ title: "Profile updated", description: "Your changes have been saved." });
              }}>
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Qualifications */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Qualifications</h3>
          </div>
          <div className="space-y-3">
            {qualifications.map((qual, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  qual.status === "expiring"
                    ? "bg-warning/10 border border-warning/20"
                    : "bg-muted/50"
                }`}
              >
                <div>
                  <p className="font-medium text-sm">{qual.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Expires: {qual.expires}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    qual.status === "expiring"
                      ? "status-pending"
                      : "status-confirmed"
                  }
                >
                  {qual.status === "expiring" ? (
                    <>
                      <Clock className="w-3 h-3 mr-1" />
                      Expiring
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Active
                    </>
                  )}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Documents</h3>
            </div>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-1" />
              Upload
            </Button>
          </div>
          <div className="space-y-3">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Uploaded {doc.uploaded}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="status-confirmed"
                >
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Payment History</h3>
          </div>
          <Button variant="ghost" size="sm">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground py-3">
                  Match
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3">
                  Date
                </th>
                <th className="text-right text-xs font-medium text-muted-foreground py-3">
                  Amount
                </th>
                <th className="text-right text-xs font-medium text-muted-foreground py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index} className="border-b border-border last:border-0">
                  <td className="py-3 text-sm font-medium">{payment.match}</td>
                  <td className="py-3 text-sm text-muted-foreground">
                    {payment.date}
                  </td>
                  <td className="py-3 text-sm text-right font-medium">
                    {payment.amount}
                  </td>
                  <td className="py-3 text-right">
                    <Badge
                      variant="outline"
                      className={
                        payment.status === "paid"
                          ? "status-confirmed"
                          : "status-pending"
                      }
                    >
                      {payment.status === "paid" ? "Paid" : "Pending"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Pending Payments</p>
              <p className="text-sm text-muted-foreground">1 payment awaiting processing</p>
            </div>
            <p className="text-xl font-bold text-accent-foreground">£65.00</p>
          </div>
        </div>
      </div>

      {/* Quick Settings */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Settings</h3>
        </div>
        
        <div className="space-y-2">
          {[
            { icon: Bell, label: "Notification Preferences", desc: "Email, SMS, Push" },
            { icon: Shield, label: "Privacy Settings", desc: "Manage your data" },
            { icon: User, label: "Account Settings", desc: "Password, 2FA" },
          ].map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
