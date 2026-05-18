import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardLayout } from "@/src/components/layout/DashboardLayout";
import Overview from "@/src/pages/Overview";
import Profile from "@/src/pages/Profile";
import Academics from "@/src/pages/Academics";
import Projects from "@/src/pages/Projects";
import CodingAnalytics from "@/src/pages/CodingAnalytics";
import Certifications from "@/src/pages/Certifications";
import Clubs from "@/src/pages/Clubs";
import Resume from "@/src/pages/Resume";
import Contact from "@/src/pages/Contact";

export default function App() {
  return (
    <TooltipProvider>
      <Router>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/coding-analytics" element={<CodingAnalytics />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </DashboardLayout>
      </Router>
    </TooltipProvider>
  );
}
