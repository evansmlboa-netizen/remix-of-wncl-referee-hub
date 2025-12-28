import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Assignments from "./pages/Assignments";
import UpcomingMatches from "./pages/UpcomingMatches";
import MatchDetails from "./pages/MatchDetails";
import SubmitReport from "./pages/SubmitReport";
import Availability from "./pages/Availability";
import PastMatches from "./pages/PastMatches";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/upcoming" element={<UpcomingMatches />} />
            <Route path="/match/:id" element={<MatchDetails />} />
            <Route path="/report" element={<SubmitReport />} />
            <Route path="/availability" element={<Availability />} />
            <Route path="/past-matches" element={<PastMatches />} />
            <Route path="/past-match/:id" element={<PastMatches />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
