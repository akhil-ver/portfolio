import * as React from "react";
import { 
  TrendingUp, 
  BookOpen, 
  Award, 
  Code2, 
  Trophy, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock,
  Target,
  GraduationCap,
  Briefcase,
  Sparkles,
  Zap,
  TrendingDown,
  BrainCircuit,
  Rocket,
  Star,
  Plus,
  Trash2
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { studentData } from "@/src/data/mockData";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useAdmin, AdminOnly } from "@/src/lib/admin";

const COLORS = ["#6366F1", "#8B5CF6", "#06B6D4", "#22C55E", "#F59E0B", "#EF4444"];
const DSA_TRACKER_QUESTIONS_KEY = "portfolio-dsa-questions";
const OVERVIEW_STORAGE_KEYS = {
  academics: "academics-cgpa-trend",
  goals: "overview-goals",
  achievements: "overview-achievements",
  roadmap: "overview-roadmap",
  reportNotes: "overview-report-notes",
  dsaTopics: "overview-dsa-topics",
  aiInsights: "overview-ai-insights",
  academicAiInsight: "overview-academic-ai-insight",
  dsaAiSuggestion: "overview-dsa-ai-suggestion",
  sectionTitles: "overview-section-titles",
} as const;

const iconMap: Record<string, any> = {
  Rocket, Target, Sparkles, Zap, BrainCircuit, Star, Award, Code2, Trophy, Briefcase, GraduationCap
};

function AnimatedCounter({ value, duration = 2 }: { value: number | string, duration?: number }) {
  const [count, setCount] = React.useState(0);
  const target = typeof value === "number" ? value : parseFloat(value);

  React.useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = (totalMiliseconds / end);

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{typeof value === "number" ? count : value}</span>;
}

function TypingHeader({ name }: { name: string }) {
  const [text, setText] = React.useState("");
  const fullText = `Welcome back, ${name} 👋`;

  React.useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <h1 className="rainbow-hover-title text-5xl md:text-6xl font-black tracking-tighter">
      {text}
    </h1>
  );
}

function TypingSubtext() {
  const [text, setText] = React.useState("");
  const fullText = "Software Development Engineer | Full Stack | AI Enthusiast";

  React.useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [fullText]);

  return <p className="text-indigo-400 font-black uppercase tracking-[0.4em] text-[10px] h-4">{text}</p>;
}

export default function Overview() {
  const { isAdmin } = useAdmin();
  const [realtimeStats, setRealtimeStats] = React.useState({
    totalSolved: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    topics: [] as { name: string, count: number }[]
  });
  const [goals, setGoals] = React.useState(studentData.goals);
  const [achievements, setAchievements] = React.useState(studentData.achievements);
  const [roadmap, setRoadmap] = React.useState([
    { id: 1, title: "Prepare for SDE internships", sub: "Focus on Core Subjects", color: "bg-blue-500" },
    { id: 2, title: "Improve DSA to 400+ problems", sub: "Target Hard Problems", color: "bg-amber-500" },
    { id: 3, title: "Build scalable system design project", sub: "Microservices Architecture", color: "bg-purple-500" },
    { id: 4, title: "Participate in hackathons", sub: "Team Collaboration", color: "bg-emerald-500" },
  ]);
  const [reportNotes, setReportNotes] = React.useState(
    "Portfolio snapshot: academics are improving, DSA consistency is strong, and project depth is aligned with SDE internship preparation."
  );
  const [academicPerformance, setAcademicPerformance] = React.useState(
    studentData.academics.cgpaTrend
  );
  const [dsaTopics, setDsaTopics] = React.useState(studentData.dsa.topics);
  const [saveState, setSaveState] = React.useState<Record<string, string>>({});
  
  const [sectionTitles, setSectionTitles] = React.useState({
    academics: "Academic Performance",
    dsa: "DSA Topic Mastery",
    goals: "Goal Tracking",
    achievements: "Achievements",
    roadmap: "Upcoming Goals",
    aiInsights: "AI Assistant Insights",
    report: "Executive Summary"
  });

  const updateSectionTitle = (key: keyof typeof sectionTitles, title: string) => {
    setSectionTitles(current => {
      const next = { ...current, [key]: title };
      window.localStorage.setItem(OVERVIEW_STORAGE_KEYS.sectionTitles, JSON.stringify(next));
      return next;
    });
  };
  
  const [academicAiInsight, setAcademicAiInsight] = React.useState({
    title: "AI Insight",
    content: "Your academic performance is stable with consistent improvement. You are on track for 8.5+ CGPA 📈"
  });

  const [dsaAiSuggestion, setDsaAiSuggestion] = React.useState({
    title: "AI Suggestion",
    content: "Focus on Dynamic Programming this week to boost your rank."
  });
  
  const [aiInsights, setAiInsights] = React.useState([
    { id: 1, title: "Readiness", desc: "You are 75% ready for SDE roles. Keep polishing your skills!", icon: "Rocket", color: "text-emerald-400" },
    { id: 2, title: "DSA Focus", desc: "Focus on Dynamic Programming to improve problem-solving depth.", icon: "Target", color: "text-cyan-400" },
    { id: 3, title: "Project Tip", desc: "Build one more full-stack project with system design concepts.", icon: "Sparkles", color: "text-purple-400" },
  ]);
  
  const [totalProjects, setTotalProjects] = React.useState(studentData.stats.totalProjects);
  const [totalCerts, setTotalCerts] = React.useState(studentData.stats.certifications);
  const [overallCgpa, setOverallCgpa] = React.useState(String(studentData.stats.cgpa));

  React.useEffect(() => {
    // Try syncing from other pages' local storage keys so the dashboard reflects the real totals
    const savedProjects = window.localStorage.getItem("portfolio-projects");
    if (savedProjects) {
      try { 
        const parsedSaved = JSON.parse(savedProjects);
        const newProjects = studentData.projects.filter(p => !parsedSaved.some((sp: any) => sp.id === p.id));
        setTotalProjects(parsedSaved.length + newProjects.length); 
      } catch {}
    }
    const savedCerts = window.localStorage.getItem("portfolio-certs");
    if (savedCerts) {
      try { setTotalCerts(JSON.parse(savedCerts).length); } catch {}
    }
    const savedOverallCgpa = window.localStorage.getItem("academics-overall-cgpa");
    if (savedOverallCgpa) {
      try {
        const parsed = JSON.parse(savedOverallCgpa);
        if (parsed && parsed.value) {
          setOverallCgpa(parsed.value);
        }
      } catch {}
    }

    const savedAcademics = window.localStorage.getItem(OVERVIEW_STORAGE_KEYS.academics);
    const savedGoals = window.localStorage.getItem(OVERVIEW_STORAGE_KEYS.goals);
    const savedAchievements = window.localStorage.getItem(OVERVIEW_STORAGE_KEYS.achievements);
    const savedRoadmap = window.localStorage.getItem(OVERVIEW_STORAGE_KEYS.roadmap);
    const savedReportNotes = window.localStorage.getItem(OVERVIEW_STORAGE_KEYS.reportNotes);
    const savedDsaTopics = window.localStorage.getItem(OVERVIEW_STORAGE_KEYS.dsaTopics);
    const savedAiInsights = window.localStorage.getItem(OVERVIEW_STORAGE_KEYS.aiInsights);
    const savedAcademicAiInsight = window.localStorage.getItem(OVERVIEW_STORAGE_KEYS.academicAiInsight);
    const savedDsaAiSuggestion = window.localStorage.getItem(OVERVIEW_STORAGE_KEYS.dsaAiSuggestion);
    const savedSectionTitles = window.localStorage.getItem(OVERVIEW_STORAGE_KEYS.sectionTitles);

    if (savedSectionTitles) {
      try { setSectionTitles(JSON.parse(savedSectionTitles)); } catch(e) {}
    }

    if (savedAcademics) {
      setAcademicPerformance(JSON.parse(savedAcademics));
    }
    if (savedAcademicAiInsight) {
      try { setAcademicAiInsight(JSON.parse(savedAcademicAiInsight)); } catch(e) {}
    }

    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }

    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }

    if (savedRoadmap) {
      setRoadmap(JSON.parse(savedRoadmap));
    }

    if (savedReportNotes) {
      setReportNotes(savedReportNotes);
    }

    if (savedDsaTopics) {
      setDsaTopics(JSON.parse(savedDsaTopics));
    }
    if (savedDsaAiSuggestion) {
      try { setDsaAiSuggestion(JSON.parse(savedDsaAiSuggestion)); } catch(e) {}
    }
    
    if (savedAiInsights) {
      setAiInsights(JSON.parse(savedAiInsights));
    }
  }, []);

  React.useEffect(() => {
    const syncRealtimeStats = () => {
      try {
        const savedQuestions = window.localStorage.getItem(DSA_TRACKER_QUESTIONS_KEY);
        const parsedQuestions = savedQuestions ? JSON.parse(savedQuestions) : [];
        const topicCounts = new Map<string, number>();

        parsedQuestions.forEach((question: any) => {
          const topicName = question.topicName || "Uncategorized";
          topicCounts.set(topicName, (topicCounts.get(topicName) || 0) + 1);
        });

        setRealtimeStats({
          totalSolved: parsedQuestions.length,
          easy: parsedQuestions.filter((question: any) => question.difficulty === "Easy").length,
          medium: parsedQuestions.filter((question: any) => question.difficulty === "Medium").length,
          hard: parsedQuestions.filter((question: any) => question.difficulty === "Hard").length,
          topics: Array.from(topicCounts.entries()).map(([name, count]) => ({ name, count })),
        });
      } catch {
        setRealtimeStats({
          totalSolved: 0,
          easy: 0,
          medium: 0,
          hard: 0,
          topics: [],
        });
      }
    };

    syncRealtimeStats();
    window.addEventListener("storage", syncRealtimeStats);
    window.addEventListener("focus", syncRealtimeStats);

    return () => {
      window.removeEventListener("storage", syncRealtimeStats);
      window.removeEventListener("focus", syncRealtimeStats);
    };
  }, []);

  const calculatedCgpa = React.useMemo(() => {
    if (academicPerformance && academicPerformance.length > 0) {
      const sum = academicPerformance.reduce((acc: number, curr: any) => acc + (Number(curr.gpa) || 0), 0);
      return (sum / academicPerformance.length).toFixed(2);
    }
    return studentData.stats.cgpa;
  }, [academicPerformance]);

  const [personalStats, setPersonalStats] = React.useState<any[]>([]);

  React.useEffect(() => {
    const savedStats = localStorage.getItem("portfolio-personal-stats");
    if (savedStats) {
      try { setPersonalStats(JSON.parse(savedStats)); } catch(e) {}
    }
  }, []);

  const kpiStats = [
    { title: "CGPA", value: calculatedCgpa, icon: GraduationCap, color: "text-indigo-400", bg: "bg-indigo-500/10", trend: "+0.3", trendUp: true, label: "Consistent academic growth" },
    { title: personalStats[1]?.label || "Projects", value: personalStats[1]?.value || totalProjects, icon: Briefcase, color: "text-cyan-400", bg: "bg-cyan-500/10", trend: "Major", trendUp: true, label: "Portfolio Projects Count" },
    { title: personalStats[2]?.label || "Certifications", value: personalStats[2]?.value || totalCerts, icon: Award, color: "text-amber-400", bg: "bg-amber-500/10", trend: "Total", trendUp: true, label: "All Certifications" },
    { title: personalStats[0]?.label || "DSA Solved", value: personalStats[0]?.value || realtimeStats.totalSolved || studentData.stats.dsaSolved, icon: Code2, color: "text-emerald-400", bg: "bg-emerald-500/10", trend: "200+", trendUp: true, label: "Strong problem-solving foundation" },
  ];

  const markSaved = (section: string, message: string) => {
    setSaveState((current) => ({ ...current, [section]: message }));
    window.setTimeout(() => {
      setSaveState((current) => ({ ...current, [section]: "" }));
    }, 2000);
  };

  const saveGoals = () => {
    window.localStorage.setItem(OVERVIEW_STORAGE_KEYS.goals, JSON.stringify(goals));
    markSaved("goals", "Goals saved");
  };

  const saveAcademics = () => {
    window.localStorage.setItem(
      OVERVIEW_STORAGE_KEYS.academics,
      JSON.stringify(academicPerformance)
    );
    window.localStorage.setItem(
      OVERVIEW_STORAGE_KEYS.academicAiInsight,
      JSON.stringify(academicAiInsight)
    );
    markSaved("academics", "Academic performance saved");
  };

  const saveAchievements = () => {
    window.localStorage.setItem(
      OVERVIEW_STORAGE_KEYS.achievements,
      JSON.stringify(achievements)
    );
    markSaved("achievements", "Awards saved");
  };

  const saveRoadmap = () => {
    window.localStorage.setItem(OVERVIEW_STORAGE_KEYS.roadmap, JSON.stringify(roadmap));
    markSaved("roadmap", "Roadmap saved");
  };

  const saveReport = () => {
    window.localStorage.setItem(OVERVIEW_STORAGE_KEYS.reportNotes, reportNotes);
    markSaved("report", "Report saved");
  };

  const saveDsaTopics = () => {
    window.localStorage.setItem(OVERVIEW_STORAGE_KEYS.dsaTopics, JSON.stringify(dsaTopics));
    window.localStorage.setItem(OVERVIEW_STORAGE_KEYS.dsaAiSuggestion, JSON.stringify(dsaAiSuggestion));
    markSaved("dsaTopics", "DSA mastery saved");
  };

  const saveAiInsights = () => {
    window.localStorage.setItem(OVERVIEW_STORAGE_KEYS.aiInsights, JSON.stringify(aiInsights));
    markSaved("aiInsights", "AI Insights saved");
  };

  return (
    <div className="dashboard-shell space-y-10 pb-20">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4">
        <div className="space-y-1">
          <TypingHeader name={studentData.profile.name.split(' ')[0]} />
          <TypingSubtext />
        </div>
        <p className="text-muted-foreground text-lg font-medium tracking-tight">
          Tracking your journey to becoming an SDE. You're doing great!
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
            className="premium-3d"
          >
            <Card className="premium-card border-none overflow-hidden group h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <div className={cn("rounded-2xl p-3 shadow-lg", stat.bg)}>
                    <stat.icon className={cn("h-6 w-6", stat.color)} />
                  </div>
                  <Badge variant="secondary" className={cn(
                    "font-black text-[10px] uppercase tracking-widest",
                    stat.trendUp ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                  )}>
                    {stat.trendUp ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                    {stat.trend}
                  </Badge>
                </div>
                <div className="mt-6 flex-1">
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">{stat.title}</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <h3 className="text-4xl font-black tracking-tighter text-premium">
                      <AnimatedCounter value={stat.value} />
                      {!String(stat.value).includes('+') && ["Projects", "Certifications", "DSA Solved"].includes(stat.title) && "+"}
                    </h3>
                    {stat.title === "CGPA" && <span className="text-lg font-bold text-muted-foreground">/10</span>}
                  </div>
                  <p className="text-[10px] font-bold text-muted-foreground mt-2 line-clamp-1">{stat.label}</p>
                </div>
                <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-white/5 blur-3xl rounded-full group-hover:bg-primary/10 transition-colors" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-7">
        {/* Academic Performance Chart */}
        <Card className="lg:col-span-4 premium-card border-none p-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-black text-premium tracking-tight">{sectionTitles.academics}</CardTitle>
                <CardDescription className="font-bold">Semester-wise GPA progression</CardDescription>
              </div>
              <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-indigo-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={academicPerformance}>
                  <defs>
                    <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} 
                    dy={15} 
                  />
                  <YAxis 
                    domain={[0, 10]} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} 
                    dx={-15} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 15, 20, 0.9)', 
                      borderRadius: '16px', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)'
                    }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="gpa" 
                    stroke="#6366F1" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorGpa)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <BrainCircuit className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-xs font-black text-indigo-400 uppercase tracking-widest">{academicAiInsight.title}</p>
                <p className="text-sm font-bold text-premium">{academicAiInsight.content}</p>
              </div>
            </div>
            {isAdmin && (
              <Dialog>
                <DialogTrigger
                  render={
                    <Button variant="outline" className="mt-4 w-full rounded-xl h-12 font-bold border-white/10 hover:bg-white/5">
                      Edit Academic Performance <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  }
                />
                <DialogContent className="glass-panel border-none sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-premium">Academic Performance Editor</DialogTitle>
                    <DialogDescription>
                      Add, edit, delete, and save semester GPA points for the dashboard chart.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3 mb-4">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Section Title</p>
                      <Input
                        value={sectionTitles.academics}
                        onChange={(e) => updateSectionTitle("academics", e.target.value)}
                        className="bg-black/20 border-white/10"
                        placeholder="Section Title"
                      />
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-indigo-500/10 p-4 space-y-3 mb-4">
                      <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Edit AI Insight</p>
                      <Input
                        value={academicAiInsight.title}
                        onChange={(e) => setAcademicAiInsight(c => ({ ...c, title: e.target.value }))}
                        className="bg-black/20 border-white/10"
                        placeholder="Insight Title"
                      />
                      <Textarea
                        value={academicAiInsight.content}
                        onChange={(e) => setAcademicAiInsight(c => ({ ...c, content: e.target.value }))}
                        className="bg-black/20 border-white/10 min-h-[80px]"
                        placeholder="Insight Content"
                      />
                    </div>
                    {academicPerformance.map((semester, index) => (
                      <div key={`${semester.name}-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <Input
                            value={semester.name}
                            onChange={(event) =>
                              setAcademicPerformance((current) =>
                                current.map((item, itemIndex) =>
                                  itemIndex === index ? { ...item, name: event.target.value } : item
                                )
                              )
                            }
                            className="border-white/10 bg-black/20"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 text-destructive hover:bg-destructive/10"
                            onClick={() =>
                              setAcademicPerformance((current) =>
                                current.filter((_, itemIndex) => itemIndex !== index)
                              )
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Input
                          type="number"
                          min="0"
                          max="10"
                          step="0.01"
                          value={semester.gpa}
                          onChange={(event) =>
                            setAcademicPerformance((current) =>
                              current.map((item, itemIndex) =>
                                itemIndex === index
                                  ? { ...item, gpa: Number(event.target.value || 0) }
                                  : item
                              )
                            )
                          }
                          className="border-white/10 bg-black/20"
                          placeholder="Semester GPA"
                        />
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-dashed border-white/10 hover:bg-white/5"
                      onClick={() =>
                        setAcademicPerformance((current) => [
                          ...current,
                          { name: `Sem ${current.length + 1}`, gpa: 0 },
                        ])
                      }
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Semester
                    </Button>
                  </div>
                  <DialogFooter showCloseButton>
                    <span className="mr-auto text-xs font-bold text-emerald-400">
                      {saveState.academics}
                    </span>
                    <Button onClick={saveAcademics} className="rounded-xl">
                      Save Academic Performance
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
        </Card>

        {/* DSA Topic Breakdown */}
        <Card className="lg:col-span-3 premium-card border-none p-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-black text-premium tracking-tight">{sectionTitles.dsa}</CardTitle>
                <CardDescription className="font-bold">Problems solved per category</CardDescription>
              </div>
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <Code2 className="h-5 w-5 text-cyan-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dsaTopics} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} 
                    width={100} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 15, 20, 0.9)', 
                      borderRadius: '16px', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Bar dataKey="solved" radius={[0, 8, 8, 0]} barSize={24}>
                    {dsaTopics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-xs font-black text-cyan-400 uppercase tracking-widest">{dsaAiSuggestion.title}</p>
                <p className="text-sm font-bold text-premium">{dsaAiSuggestion.content}</p>
              </div>
            </div>
            {isAdmin && (
              <Dialog>
                <DialogTrigger
                  render={
                    <Button variant="outline" className="mt-4 w-full rounded-xl h-12 font-bold border-white/10 hover:bg-white/5">
                      Edit DSA Mastery <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  }
                />
                <DialogContent className="glass-panel border-none sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-premium">DSA Mastery Editor</DialogTitle>
                    <DialogDescription>
                      Add, edit, or delete topic progress for the dashboard chart.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3 mb-4">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Section Title</p>
                      <Input
                        value={sectionTitles.dsa}
                        onChange={(e) => updateSectionTitle("dsa", e.target.value)}
                        className="bg-black/20 border-white/10"
                        placeholder="Section Title"
                      />
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-cyan-500/10 p-4 space-y-3 mb-4">
                      <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Edit AI Suggestion</p>
                      <Input
                        value={dsaAiSuggestion.title}
                        onChange={(e) => setDsaAiSuggestion(c => ({ ...c, title: e.target.value }))}
                        className="bg-black/20 border-white/10"
                        placeholder="Suggestion Title"
                      />
                      <Textarea
                        value={dsaAiSuggestion.content}
                        onChange={(e) => setDsaAiSuggestion(c => ({ ...c, content: e.target.value }))}
                        className="bg-black/20 border-white/10 min-h-[80px]"
                        placeholder="Suggestion Content"
                      />
                    </div>
                    {dsaTopics.map((topic, index) => (
                      <div key={`${topic.name}-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <Input
                            value={topic.name}
                            onChange={(event) =>
                              setDsaTopics((current) =>
                                current.map((item, itemIndex) =>
                                  itemIndex === index ? { ...item, name: event.target.value } : item
                                )
                              )
                            }
                            className="border-white/10 bg-black/20"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 text-destructive hover:bg-destructive/10"
                            onClick={() =>
                              setDsaTopics((current) => current.filter((_, itemIndex) => itemIndex !== index))
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <Input
                            type="number"
                            value={topic.solved}
                            onChange={(event) =>
                              setDsaTopics((current) =>
                                current.map((item, itemIndex) =>
                                  itemIndex === index ? { ...item, solved: Number(event.target.value || 0) } : item
                                )
                              )
                            }
                            className="border-white/10 bg-black/20"
                            placeholder="Solved"
                          />
                          <Input
                            type="number"
                            value={topic.total}
                            onChange={(event) =>
                              setDsaTopics((current) =>
                                current.map((item, itemIndex) =>
                                  itemIndex === index ? { ...item, total: Number(event.target.value || 0) } : item
                                )
                              )
                            }
                            className="border-white/10 bg-black/20"
                            placeholder="Total"
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-dashed border-white/10 hover:bg-white/5"
                      onClick={() =>
                        setDsaTopics((current) => [
                          ...current,
                          { name: "New Topic", solved: 0, total: 0 },
                        ])
                      }
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add DSA Topic
                    </Button>
                  </div>
                  <DialogFooter showCloseButton>
                    <span className="mr-auto text-xs font-bold text-emerald-400">
                      {saveState.dsaTopics}
                    </span>
                    <Button onClick={saveDsaTopics} className="rounded-xl">
                      Save DSA Mastery
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Goal Tracking */}
        <Card className="premium-card border-none p-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-black text-premium uppercase tracking-widest">{sectionTitles.goals}</CardTitle>
              <Target className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            {goals.map((goal) => (
              <div key={goal.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-premium">{goal.title}</span>
                  <span className="text-xs font-black text-muted-foreground">{goal.progress}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={cn("h-full rounded-full", 
                      goal.id === 1 ? "bg-indigo-500" : 
                      goal.id === 2 ? "bg-purple-500" : 
                      goal.id === 3 ? "bg-cyan-500" : "bg-emerald-500"
                    )}
                  />
                </div>
              </div>
            ))}
            {isAdmin && (
              <Dialog>
                <DialogTrigger
                  render={
                    <Button className="w-full rounded-xl h-12 font-bold glow-primary mt-4">
                      Manage All Goals <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  }
                />
                <DialogContent className="glass-panel border-none sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-premium">Goal Management</DialogTitle>
                    <DialogDescription>
                      Track all goals here. Admin mode lets you update progress.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3 mb-4">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Section Title</p>
                      <Input
                        value={sectionTitles.goals}
                        onChange={(e) => updateSectionTitle("goals", e.target.value)}
                        className="bg-black/20 border-white/10"
                        placeholder="Section Title"
                      />
                    </div>
                    {goals.map((goal) => (
                      <div key={goal.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <Input
                            value={goal.title}
                            onChange={(event) =>
                              setGoals((current) =>
                                current.map((item) =>
                                  item.id === goal.id ? { ...item, title: event.target.value } : item
                                )
                              )
                            }
                            className="border-white/10 bg-black/20"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 text-destructive hover:bg-destructive/10"
                            onClick={() =>
                              setGoals((current) => current.filter((item) => item.id !== goal.id))
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <Progress value={goal.progress} className="h-2 flex-1 bg-white/5" />
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={goal.progress}
                            onChange={(event) =>
                              setGoals((current) =>
                                current.map((item) =>
                                  item.id === goal.id
                                    ? { ...item, progress: Number(event.target.value || 0) }
                                    : item
                                )
                              )
                            }
                            className="w-20 border-white/10 bg-black/20"
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-dashed border-white/10 hover:bg-white/5"
                      onClick={() =>
                        setGoals((current) => [
                          ...current,
                          { id: Date.now(), title: "New Goal", progress: 0 },
                        ])
                      }
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Goal
                    </Button>
                  </div>
                  <DialogFooter showCloseButton>
                    <span className="mr-auto text-xs font-bold text-emerald-400">
                      {saveState.goals}
                    </span>
                    <Button onClick={saveGoals} className="rounded-xl">
                      Save Goals
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card className="premium-card border-none p-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-black text-premium uppercase tracking-widest">{sectionTitles.achievements}</CardTitle>
              <Trophy className="h-5 w-5 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-5 pt-4">
            {achievements.slice(0, 3).map((achievement, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors group"
              >
                <div className="mt-1 rounded-xl bg-amber-500/10 p-2 group-hover:bg-amber-500/20 transition-colors">
                  <Star className="h-4 w-4 text-amber-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-premium leading-none">{achievement.title}</p>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
            {isAdmin && (
              <Dialog>
                <DialogTrigger
                  render={
                    <Button variant="outline" className="w-full rounded-xl h-12 font-bold border-white/10 hover:bg-white/5 mt-4">
                      View All Awards <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  }
                />
                <DialogContent className="glass-panel border-none sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-premium">All Awards & Achievements</DialogTitle>
                    <DialogDescription>
                      Admin can adjust titles and descriptions.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3 mb-4">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Section Title</p>
                      <Input
                        value={sectionTitles.achievements}
                        onChange={(e) => updateSectionTitle("achievements", e.target.value)}
                        className="bg-black/20 border-white/10"
                        placeholder="Section Title"
                      />
                    </div>
                    {achievements.map((achievement, index) => (
                      <div key={`${achievement.title}-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
                        <div className="flex items-center gap-3">
                          <Input
                            value={achievement.title}
                            onChange={(event) =>
                              setAchievements((current) =>
                                current.map((item, itemIndex) =>
                                  itemIndex === index
                                    ? { ...item, title: event.target.value }
                                    : item
                                )
                              )
                            }
                            className="border-white/10 bg-black/20"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 text-destructive hover:bg-destructive/10"
                            onClick={() =>
                              setAchievements((current) => current.filter((_, itemIndex) => itemIndex !== index))
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Textarea
                          value={achievement.description}
                          onChange={(event) =>
                            setAchievements((current) =>
                              current.map((item, itemIndex) =>
                                itemIndex === index
                                  ? { ...item, description: event.target.value }
                                  : item
                              )
                            )
                          }
                          className="min-h-24 border-white/10 bg-black/20"
                        />
                        <Badge variant="secondary" className="bg-white/10 text-muted-foreground">
                          {achievement.category} • {achievement.date}
                        </Badge>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-dashed border-white/10 hover:bg-white/5"
                      onClick={() =>
                        setAchievements((current) => [
                          ...current,
                          {
                            title: "New Achievement",
                            description: "Add achievement details here.",
                            category: "General",
                            date: new Date().getFullYear().toString(),
                          },
                        ])
                      }
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Award
                    </Button>
                  </div>
                  <DialogFooter showCloseButton>
                    <span className="mr-auto text-xs font-bold text-emerald-400">
                      {saveState.achievements}
                    </span>
                    <Button onClick={saveAchievements} className="rounded-xl">
                      Save Awards
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Goals */}
        <Card className="premium-card border-none p-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-black text-premium uppercase tracking-widest">{sectionTitles.roadmap}</CardTitle>
              <Clock className="h-5 w-5 text-red-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-5 pt-4">
            {roadmap.map((goal, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors">
                <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center text-white font-black", goal.color)}>
                  <Rocket className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-premium leading-none">{goal.title}</p>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">{goal.sub}</p>
                </div>
              </div>
            ))}
            {isAdmin && (
              <Dialog>
                <DialogTrigger
                  render={
                    <Button variant="outline" className="w-full rounded-xl h-12 font-bold border-white/10 hover:bg-white/5 mt-4">
                      View Roadmap <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  }
                />
                <DialogContent className="glass-panel border-none sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-premium">Career Roadmap</DialogTitle>
                    <DialogDescription>
                      Admin can edit roadmap items here.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3 mb-4">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Section Title</p>
                      <Input
                        value={sectionTitles.roadmap}
                        onChange={(e) => updateSectionTitle("roadmap", e.target.value)}
                        className="bg-black/20 border-white/10"
                        placeholder="Section Title"
                      />
                    </div>
                    {roadmap.map((item) => (
                      <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-start gap-4">
                        <div className={cn("mt-1 h-10 w-10 rounded-xl flex items-center justify-center text-white", item.color)}>
                          <Rocket className="h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <Input
                              value={item.title}
                              onChange={(event) =>
                                setRoadmap((current) =>
                                  current.map((entry) =>
                                    entry.id === item.id ? { ...entry, title: event.target.value } : entry
                                  )
                                )
                              }
                              className="border-white/10 bg-black/20"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="shrink-0 text-destructive hover:bg-destructive/10"
                              onClick={() =>
                                setRoadmap((current) => current.filter((entry) => entry.id !== item.id))
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <Input
                            value={item.sub}
                            onChange={(event) =>
                              setRoadmap((current) =>
                                current.map((entry) =>
                                  entry.id === item.id ? { ...entry, sub: event.target.value } : entry
                                )
                              )
                            }
                            className="border-white/10 bg-black/20"
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-dashed border-white/10 hover:bg-white/5"
                      onClick={() =>
                        setRoadmap((current) => [
                          ...current,
                          {
                            id: Date.now(),
                            title: "New Roadmap Item",
                            sub: "Add milestone details",
                            color: "bg-blue-500",
                          },
                        ])
                      }
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Roadmap Item
                    </Button>
                  </div>
                  <DialogFooter showCloseButton>
                    <span className="mr-auto text-xs font-bold text-emerald-400">
                      {saveState.roadmap}
                    </span>
                    <Button onClick={saveRoadmap} className="rounded-xl">
                      Save Roadmap
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="premium-3d"
      >
        <Card className="premium-card border-none bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10 p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
            <BrainCircuit className="h-48 w-48 text-white" />
          </div>
          <div className="relative z-10 flex flex-col gap-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/40 shrink-0">
                <Zap className="h-10 w-10 text-white animate-pulse" />
              </div>
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div className="space-y-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-3xl font-black text-premium tracking-tighter">{sectionTitles.aiInsights}</h3>
                      <p className="text-indigo-300 font-bold uppercase tracking-[0.3em] text-[10px]">Powered by EduTrack Intelligence</p>
                    </div>
                    <AdminOnly>
                      <Dialog>
                        <DialogTrigger 
                          render={
                            <Button variant="outline" size="sm" className="border-white/10 bg-white/5 hover:bg-white/10 shrink-0">
                              Edit Insights
                            </Button>
                          }
                        />
                        <DialogContent className="glass-panel border-none sm:max-w-3xl">
                          <DialogHeader>
                            <DialogTitle className="text-premium">Edit AI Assistant Insights</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3 mb-4">
                              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Section Title</p>
                              <Input
                                value={sectionTitles.aiInsights}
                                onChange={(e) => updateSectionTitle("aiInsights", e.target.value)}
                                className="bg-black/20 border-white/10"
                                placeholder="Section Title"
                              />
                            </div>
                            {aiInsights.map((insight, index) => (
                              <div key={insight.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                                <div className="flex gap-3">
                                  <Input
                                    value={insight.title}
                                    onChange={(e) => setAiInsights(current => current.map((item, i) => i === index ? { ...item, title: e.target.value } : item))}
                                    placeholder="Title (e.g. Readiness)"
                                    className="border-white/10 bg-black/20"
                                  />
                                  <Input
                                    value={insight.icon}
                                    onChange={(e) => setAiInsights(current => current.map((item, i) => i === index ? { ...item, icon: e.target.value } : item))}
                                    placeholder="Icon (e.g. Rocket)"
                                    className="border-white/10 bg-black/20 w-32"
                                  />
                                  <Input
                                    value={insight.color}
                                    onChange={(e) => setAiInsights(current => current.map((item, i) => i === index ? { ...item, color: e.target.value } : item))}
                                    placeholder="Color class"
                                    className="border-white/10 bg-black/20 w-40"
                                  />
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="shrink-0 text-destructive hover:bg-destructive/10"
                                    onClick={() => setAiInsights(current => current.filter((_, i) => i !== index))}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                                <Textarea
                                  value={insight.desc}
                                  onChange={(e) => setAiInsights(current => current.map((item, i) => i === index ? { ...item, desc: e.target.value } : item))}
                                  placeholder="Insight description..."
                                  className="border-white/10 bg-black/20"
                                />
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              className="w-full rounded-xl border-dashed border-white/10 hover:bg-white/5"
                              onClick={() => setAiInsights(current => [...current, { id: Date.now(), title: "New Insight", desc: "Description here", icon: "Sparkles", color: "text-white" }])}
                            >
                              <Plus className="mr-2 h-4 w-4" /> Add Insight
                            </Button>
                          </div>
                          <DialogFooter showCloseButton>
                            <span className="mr-auto text-xs font-bold text-emerald-400">{saveState.aiInsights}</span>
                            <Button onClick={saveAiInsights} className="rounded-xl glow-primary">Save Insights</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </AdminOnly>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {aiInsights.map((insight) => {
                    const Icon = iconMap[insight.icon] || Sparkles;
                    return (
                      <div key={insight.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                        <div className={cn("flex items-center gap-2", insight.color)}>
                          <Icon className="h-4 w-4" />
                          <span className="text-xs font-black uppercase tracking-widest">{insight.title}</span>
                        </div>
                        <p className="text-sm font-bold text-premium">{insight.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </Card>
      </motion.div>
    </div>
  );
}
