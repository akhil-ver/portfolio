import * as React from "react";
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp,
  FileText,
  Download,
  BrainCircuit,
  Sparkles,
  Target,
  ArrowUpRight,
  BarChart3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Zap,
  Star,
  Clock,
  CheckCircle2,
  Plus,
  Trash2,
  Edit3
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Progress, 
  ProgressTrack, 
  ProgressIndicator 
} from "@/components/ui/progress";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { studentData } from "@/src/data/mockData";
import { useAdmin, AdminOnly } from "@/src/lib/admin";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const COLORS = ["#6366F1", "#8B5CF6", "#06B6D4", "#22C55E", "#F59E0B"];
const ACADEMICS_STORAGE_KEYS = {
  semesters: "academics-semesters",
  cgpaTrend: "academics-cgpa-trend",
  stats: "academics-stats",
  overallCgpa: "academics-overall-cgpa",
  subjectAnalysis: "academics-subject-analysis",
  predictiveAnalytics: "academics-predictive-analytics",
  academicGoals: "academics-goals",
  aiInsights: "academics-ai-insights",
  sectionTitles: "academics-section-titles",
} as const;

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
      start += 0.01;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(parseFloat(start.toFixed(2)));
      }
    }, incrementTime / 100);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count.toFixed(2)}</span>;
}

export default function Academics() {
  const { isAdmin } = useAdmin();
  const [semesters, setSemesters] = React.useState(studentData.academics.semesters);
  const [cgpaTrend, setCgpaTrend] = React.useState(studentData.academics.cgpaTrend);
  const [academicStats, setAcademicStats] = React.useState([
    { label: "Total Credits", value: "142 / 180", icon: "BookOpen", color: "text-indigo-400" },
    { label: "Attendance", value: "94%", icon: "CheckCircle2", color: "text-emerald-400" },
    { label: "Backlogs", value: "0", icon: "Award", color: "text-amber-400" }
  ]);
  const [saveMessage, setSaveMessage] = React.useState("");

  const [sectionTitles, setSectionTitles] = React.useState({
    header: "Academic Journey",
    headerSub: "Track your academic performance and growth over time",
    gpaTrend: "GPA Progression",
    gpaTrendSub: "Semester-wise GPA progression",
    stats: "Academic Stats"
  });
  
  const updateSectionTitle = (key, value) => {
    setSectionTitles(prev => {
      const next = { ...prev, [key]: value };
      window.localStorage.setItem(ACADEMICS_STORAGE_KEYS.sectionTitles, JSON.stringify(next));
      return next;
    });
  };

  const [overallCgpaState, setOverallCgpaState] = React.useState({
    title: "Overall CGPA",
    value: String(studentData.stats.cgpa),
    standing: "Top Performer",
    insight: "+0.3 improvement over last semesters"
  });

  const [subjectAnalysisState, setSubjectAnalysisState] = React.useState({
    title: "Subject-wise Analysis",
    subtitle: "Performance in core CS subjects",
    strongestSubject: "Data Structures & Algorithms",
    strongestGrade: "O",
    data: [
      { name: "DSA", score: 95, grade: "O" },
      { name: "DBMS", score: 92, grade: "O" },
      { name: "OS", score: 88, grade: "A+" },
      { name: "CN", score: 90, grade: "A+" },
      { name: "AI/ML", score: 94, grade: "O" },
    ]
  });

  const [predictiveAnalyticsState, setPredictiveAnalyticsState] = React.useState({
    title: "Predictive Analytics",
    subtitle: "EduTrack Intelligence",
    predictedMin: "8.5",
    predictedMax: "8.7",
    confidence: 92,
    insight: "If current performance continues, you are projected to reach an 8.7 CGPA by graduation. Focus on maintaining your current trajectory in core subjects."
  });

  const [academicGoalsState, setAcademicGoalsState] = React.useState({
    title: "Academic Goals",
    goals: [
      { title: "Maintain CGPA above 8.5", progress: 85, color: "bg-indigo-500" },
      { title: "Improve System Design knowledge", progress: 65, color: "bg-purple-500" },
      { title: "Focus on Core CS subjects", progress: 90, color: "bg-cyan-500" },
    ]
  });

  const [aiInsightsState, setAiInsightsState] = React.useState({
    title: "AI Academic Insights",
    subtitle: "Powered by EduTrack Intelligence",
    insights: [
      { type: "Growth", text: "Your GPA shows a consistent upward trend across all semesters. 📈", icon: "TrendingUp", color: "text-emerald-400" },
      { type: "Focus", text: "Strong performance in recent semesters indicates improved focus and mastery.", icon: "Target", color: "text-cyan-400" },
      { type: "Projection", text: "You are on track to graduate with a stellar 8.5+ CGPA. Keep it up!", icon: "Sparkles", color: "text-purple-400" },
    ]
  });

  React.useEffect(() => {
    const savedSemesters = window.localStorage.getItem(ACADEMICS_STORAGE_KEYS.semesters);
    const savedCgpaTrend = window.localStorage.getItem(ACADEMICS_STORAGE_KEYS.cgpaTrend);
    const savedStats = window.localStorage.getItem(ACADEMICS_STORAGE_KEYS.stats);
    const savedOverallCgpa = window.localStorage.getItem(ACADEMICS_STORAGE_KEYS.overallCgpa);
    const savedSubjectAnalysis = window.localStorage.getItem(ACADEMICS_STORAGE_KEYS.subjectAnalysis);
    const savedPredictiveAnalytics = window.localStorage.getItem(ACADEMICS_STORAGE_KEYS.predictiveAnalytics);
    const savedAcademicGoals = window.localStorage.getItem(ACADEMICS_STORAGE_KEYS.academicGoals);
    const savedAiInsights = window.localStorage.getItem(ACADEMICS_STORAGE_KEYS.aiInsights);
    const savedSectionTitles = window.localStorage.getItem(ACADEMICS_STORAGE_KEYS.sectionTitles);

    if (savedSemesters) {
      try {
        const parsed = JSON.parse(savedSemesters);
        const merged = parsed.map((savedSem: any) => {
          const defaultSem = studentData.academics.semesters.find(s => s.sem === savedSem.sem);
          return {
            ...savedSem,
            time: savedSem.time || defaultSem?.time
          };
        });
        
        const newSemesters = studentData.academics.semesters.filter(
          defaultSem => !parsed.some((savedSem: any) => savedSem.sem === defaultSem.sem)
        );
        
        setSemesters([...merged, ...newSemesters]);
      } catch(e) {}
    }
    if (savedCgpaTrend) {
      try {
        const parsed = JSON.parse(savedCgpaTrend);
        const newTrends = studentData.academics.cgpaTrend.filter(
          defaultTrend => !parsed.some((savedTrend: any) => savedTrend.name === defaultTrend.name)
        );
        setCgpaTrend([...parsed, ...newTrends]);
      } catch(e) {}
    }
    if (savedStats) try { setAcademicStats(JSON.parse(savedStats)); } catch(e) {}
    if (savedOverallCgpa) try { setOverallCgpaState(JSON.parse(savedOverallCgpa)); } catch(e) {}
    if (savedSubjectAnalysis) try { setSubjectAnalysisState(JSON.parse(savedSubjectAnalysis)); } catch(e) {}
    if (savedPredictiveAnalytics) try { setPredictiveAnalyticsState(JSON.parse(savedPredictiveAnalytics)); } catch(e) {}
    if (savedAcademicGoals) try { setAcademicGoalsState(JSON.parse(savedAcademicGoals)); } catch(e) {}
    if (savedAiInsights) try { setAiInsightsState(JSON.parse(savedAiInsights)); } catch(e) {}
    if (savedSectionTitles) try { setSectionTitles(JSON.parse(savedSectionTitles)); } catch(e) {}
  }, []);

  const markSaved = (message: string) => {
    setSaveMessage(message);
    window.setTimeout(() => setSaveMessage(""), 2000);
  };

  const saveStateToStorage = (key: string, value: any, message: string) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    markSaved(message);
  };

  const saveAcademicChanges = () => {
    window.localStorage.setItem(ACADEMICS_STORAGE_KEYS.semesters, JSON.stringify(semesters));
    window.localStorage.setItem(ACADEMICS_STORAGE_KEYS.cgpaTrend, JSON.stringify(cgpaTrend));
    markSaved("Academic changes saved");
  };

  const saveAcademicStats = (newStats: typeof academicStats) => {
    setAcademicStats(newStats);
    saveStateToStorage(ACADEMICS_STORAGE_KEYS.stats, newStats, "Academic stats saved");
  };

  const saveOverallCgpa = (newState: typeof overallCgpaState) => {
    setOverallCgpaState(newState);
    saveStateToStorage(ACADEMICS_STORAGE_KEYS.overallCgpa, newState, "Overall CGPA saved");
  };

  const saveSubjectAnalysis = (newState: typeof subjectAnalysisState) => {
    setSubjectAnalysisState(newState);
    saveStateToStorage(ACADEMICS_STORAGE_KEYS.subjectAnalysis, newState, "Subject Analysis saved");
  };

  const savePredictiveAnalytics = (newState: typeof predictiveAnalyticsState) => {
    setPredictiveAnalyticsState(newState);
    saveStateToStorage(ACADEMICS_STORAGE_KEYS.predictiveAnalytics, newState, "Predictive Analytics saved");
  };

  const saveAcademicGoals = (newState: typeof academicGoalsState) => {
    setAcademicGoalsState(newState);
    saveStateToStorage(ACADEMICS_STORAGE_KEYS.academicGoals, newState, "Academic Goals saved");
  };

  const saveAiInsights = (newState: typeof aiInsightsState) => {
    setAiInsightsState(newState);
    saveStateToStorage(ACADEMICS_STORAGE_KEYS.aiInsights, newState, "AI Insights saved");
  };

  const downloadTranscript = () => {
    const transcript = semesters
      .map((semester) =>
        [
          `Semester ${semester.sem} - GPA ${semester.gpa}`,
          ...semester.subjects.map(
            (subject: any) =>
              `${subject.code || "N/A"} | ${subject.name} | Result: ${subject.result ?? "--"} | Grade: ${subject.grade}`
          ),
          "",
        ].join("\n")
      )
      .join("\n");

    const blob = new Blob([transcript], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "akhil-academic-transcript.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const calculatedCgpa = React.useMemo(() => {
    if (cgpaTrend && cgpaTrend.length > 0) {
      const sum = cgpaTrend.reduce((acc: number, curr: any) => acc + (Number(curr.gpa) || 0), 0);
      return (sum / cgpaTrend.length).toFixed(2);
    }
    return studentData.stats.cgpa;
  }, [cgpaTrend]);

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-premium">{sectionTitles.header}</h1>
          <p className="text-muted-foreground text-lg font-medium tracking-tight">
            {sectionTitles.headerSub}
          </p>
        </div>
        <div className="flex gap-3">
          <AdminOnly>
            <Dialog>
              <DialogTrigger render={<Button variant="outline" className="rounded-2xl h-12 px-6 font-bold border-white/10 hover:bg-white/5"><Edit3 className="mr-2 h-4 w-4" /> Edit Header</Button>} />
              <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-white/10">
                <DialogHeader><DialogTitle className="text-premium">Edit Header Titles</DialogTitle></DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Header Title</label>
                    <Input value={sectionTitles.header} onChange={e => updateSectionTitle("header", e.target.value)} className="bg-black/20 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Header Subtitle</label>
                    <Input value={sectionTitles.headerSub} onChange={e => updateSectionTitle("headerSub", e.target.value)} className="bg-black/20 border-white/10" />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </AdminOnly>
          <Dialog>
            <DialogTrigger
              render={
                <Button variant="outline" className="rounded-2xl h-12 px-6 font-bold border-white/10 hover:bg-white/5">
                  <FileText className="mr-2 h-4 w-4" /> View Detailed Analysis
                </Button>
              }
            />
            <DialogContent className="glass-panel border-none sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-premium">Academic Overview</DialogTitle>
                <DialogDescription>
                  Semester-by-semester summary of GPA and subjects.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                {semesters.map((semester) => (
                  <div key={semester.sem} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-black text-premium">Semester {semester.sem}</p>
                      <Badge variant="secondary" className="bg-white/10 text-muted-foreground">
                        GPA {semester.gpa}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      {semester.subjects.map((subject: any, index: number) => (
                        <p key={index} className="text-xs text-muted-foreground">
                          {subject.code || "N/A"} • {subject.name} • Result {subject.result ?? "--"} • Grade {subject.grade}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <DialogFooter showCloseButton />
            </DialogContent>
          </Dialog>
          <Button className="rounded-2xl h-12 px-6 font-bold glow-primary" onClick={downloadTranscript}>
            <Download className="mr-2 h-4 w-4" /> Download Transcript
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-7">
        {/* GPA Progression Chart */}
        <Card className="lg:col-span-5 premium-card border-none p-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-black text-premium tracking-tight">{sectionTitles.gpaTrend}</CardTitle>
                <CardDescription className="font-bold">{sectionTitles.gpaTrendSub}</CardDescription>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <LineChartIcon className="h-6 w-6 text-indigo-500" />
              </div>
              {isAdmin && (
                <Dialog>
                  <DialogTrigger
                    render={
                      <Button variant="outline" className="rounded-xl border-white/10 hover:bg-white/5">
                        Edit GPA Chart
                      </Button>
                    }
                  />
                  <DialogContent className="glass-panel border-none sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-premium">Edit GPA Progression</DialogTitle>
                      <div className="grid gap-2 grid-cols-2 mt-4">
                        <Input value={sectionTitles.gpaTrend} onChange={e => updateSectionTitle("gpaTrend", e.target.value)} className="bg-black/20 border-white/10" placeholder="Title" />
                        <Input value={sectionTitles.gpaTrendSub} onChange={e => updateSectionTitle("gpaTrendSub", e.target.value)} className="bg-black/20 border-white/10" placeholder="Subtitle" />
                      </div>
                      <DialogDescription>
                        Add, remove, and save semester GPA points.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                      {cgpaTrend.map((item, index) => (
                        <div key={`${item.name}-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                          <div className="flex items-center gap-3">
                            <Input
                              value={item.name}
                              onChange={(event) =>
                                setCgpaTrend((current) =>
                                  current.map((entry, itemIndex) =>
                                    itemIndex === index ? { ...entry, name: event.target.value } : entry
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
                                setCgpaTrend((current) => current.filter((_, itemIndex) => itemIndex !== index))
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
                            value={item.gpa}
                            onChange={(event) =>
                              setCgpaTrend((current) =>
                                current.map((entry, itemIndex) =>
                                  itemIndex === index ? { ...entry, gpa: Number(event.target.value || 0) } : entry
                                )
                              )
                            }
                            className="border-white/10 bg-black/20"
                          />
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        className="w-full rounded-xl border-dashed border-white/10 hover:bg-white/5"
                        onClick={() =>
                          setCgpaTrend((current) => [
                            ...current,
                            { name: `Sem ${current.length + 1}`, gpa: 0 },
                          ])
                        }
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Semester Point
                      </Button>
                    </div>
                    <DialogFooter showCloseButton>
                      <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                      <Button onClick={saveAcademicChanges}>Save GPA Chart</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cgpaTrend}>
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
                    tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 'bold' }} 
                    dy={15} 
                  />
                  <YAxis 
                    domain={[0, 10]} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 'bold' }} 
                    dx={-15} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 15, 20, 0.9)', 
                      borderRadius: '20px', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)'
                    }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="gpa" 
                    stroke="#6366F1" 
                    strokeWidth={5} 
                    fillOpacity={1} 
                    fill="url(#colorGpa)" 
                    animationDuration={2500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Academic Summary */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="premium-3d"
          >
            <Card className="premium-card border-none bg-gradient-to-br from-indigo-600 to-purple-700 text-white overflow-hidden relative group">
              <div className="absolute -right-8 -top-8 h-32 w-32 bg-white/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
              <CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
                <CardTitle className="text-xs font-black uppercase tracking-[0.3em] opacity-80">{overallCgpaState.title}</CardTitle>
                <AdminOnly>
                  <Dialog>
                    <DialogTrigger render={
                      <Button type="button" variant="ghost" size="sm" className="h-6 w-6 p-0 text-white/70 hover:bg-white/10 hover:text-white relative z-20 cursor-pointer">
                        <Edit3 className="h-3 w-3 pointer-events-none" />
                      </Button>
                    } />
                    <DialogContent className="sm:max-w-md bg-card/90 backdrop-blur-xl border-white/10 text-foreground">
                      <DialogHeader>
                        <DialogTitle className="text-premium">Edit Overall CGPA</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={(e) => { e.preventDefault(); saveOverallCgpa(overallCgpaState); }}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground">Title</label>
                            <Input
                              value={overallCgpaState.title}
                              onChange={(e) => setOverallCgpaState(prev => ({ ...prev, title: e.target.value }))}
                              className="bg-black/20 border-white/10"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground">CGPA Value (Calculated Automatically)</label>
                            <Input
                              value={calculatedCgpa}
                              disabled
                              className="bg-black/20 border-white/10 opacity-50"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground">Standing</label>
                            <Input
                              value={overallCgpaState.standing}
                              onChange={(e) => setOverallCgpaState(prev => ({ ...prev, standing: e.target.value }))}
                              className="bg-black/20 border-white/10"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground">Insight Text</label>
                            <Input
                              value={overallCgpaState.insight}
                              onChange={(e) => setOverallCgpaState(prev => ({ ...prev, insight: e.target.value }))}
                              className="bg-black/20 border-white/10"
                            />
                          </div>
                        </div>
                        <DialogFooter className="mt-6">
                          <span className="mr-auto text-xs font-bold text-emerald-400 self-center">{saveMessage}</span>
                          <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                          <DialogClose render={<Button type="submit" className="glow-primary" />}>Save changes</DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </AdminOnly>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-6xl font-black tracking-tighter">
                    <AnimatedCounter value={calculatedCgpa} />
                  </h3>
                  <span className="text-2xl font-bold opacity-60">/10</span>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Academic Standing</p>
                    <p className="text-sm font-bold">{overallCgpaState.standing}</p>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-xl bg-white/10 border border-white/10 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-300 shrink-0" />
                  <span className="text-xs font-bold">{overallCgpaState.insight}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <Card className="premium-card border-none p-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-premium flex items-center justify-between gap-3">
                <span>{sectionTitles.stats}</span>
                <AdminOnly>
                  <Dialog>
                    <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>
                      <Edit3 className="mr-2 h-4 w-4" /> Edit
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl bg-card/90 backdrop-blur-xl border-white/10">
                      <DialogHeader>
                        <DialogTitle className="text-premium">Edit Academic Stats</DialogTitle>
                      </DialogHeader>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3 mb-4 mx-6 mt-4">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Section Title</p>
                        <Input
                          value={sectionTitles.stats}
                          onChange={(e) => updateSectionTitle("stats", e.target.value)}
                          className="bg-black/20 border-white/10"
                        />
                      </div>
                      <form onSubmit={(e) => { e.preventDefault(); saveAcademicStats(academicStats); }}>
                        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                          {academicStats.map((stat, statIndex) => (
                            <div key={`${stat.label}-${statIndex}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 grid gap-3 md:grid-cols-[1fr_140px_52px]">
                              <Input
                                value={stat.label}
                                onChange={(event) =>
                                  setAcademicStats((current) =>
                                    current.map((item, itemIndex) =>
                                      itemIndex === statIndex ? { ...item, label: event.target.value } : item
                                    )
                                  )
                                }
                                className="bg-black/20 border-white/10"
                                placeholder="Label"
                              />
                              <Input
                                value={stat.value}
                                onChange={(event) =>
                                  setAcademicStats((current) =>
                                    current.map((item, itemIndex) =>
                                      itemIndex === statIndex ? { ...item, value: event.target.value } : item
                                    )
                                  )
                                }
                                className="bg-black/20 border-white/10"
                                placeholder="Value"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                type="button"
                                className="text-destructive hover:bg-destructive/10"
                                onClick={() =>
                                  setAcademicStats((current) => current.filter((_, itemIndex) => itemIndex !== statIndex))
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            type="button"
                            className="w-full border-dashed border-white/10 hover:bg-white/5"
                            onClick={() =>
                              setAcademicStats((current) => [
                                ...current,
                                { label: "New Stat", value: "0", icon: "BookOpen", color: "text-primary" },
                              ])
                            }
                          >
                            <Plus className="mr-2 h-4 w-4" /> Add Stat
                          </Button>
                        </div>
                        <DialogFooter>
                          <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                          <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                          <DialogClose render={<Button type="submit" className="glow-primary" />}>Save changes</DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </AdminOnly>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              {academicStats.map((stat, i) => {
                const Icon = (LucideIcons as any)[stat.icon] || LucideIcons.BookOpen;
                return (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <Icon className={cn("h-4 w-4", stat.color)} />
                      <span className="text-xs font-bold text-muted-foreground">{stat.label}</span>
                    </div>
                    <span className={cn("text-sm font-black", stat.label === "Total Credits" ? "text-premium" : (stat.color || "text-premium"))}>{stat.value}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Subject-wise Analysis */}
        <Card className="premium-card border-none p-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-black text-premium tracking-tight">{subjectAnalysisState.title}</CardTitle>
                <CardDescription className="font-bold">{subjectAnalysisState.subtitle}</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <AdminOnly>
                  <Dialog>
                    <DialogTrigger render={
                      <Button type="button" variant="outline" size="sm" className="border-white/10 bg-white/5 relative z-20 cursor-pointer">
                        <Edit3 className="mr-2 h-4 w-4 pointer-events-none" /> Edit
                      </Button>
                    } />
                    <DialogContent className="sm:max-w-2xl bg-card/90 backdrop-blur-xl border-white/10 text-foreground">
                      <DialogHeader>
                        <DialogTitle className="text-premium">Edit Subject Analysis</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={(e) => { e.preventDefault(); saveSubjectAnalysis(subjectAnalysisState); }}>
                        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                          <div className="space-y-4">
                            <div className="grid gap-3 md:grid-cols-2">
                              <div className="space-y-1">
                                <label className="text-xs font-bold text-muted-foreground">Title</label>
                                <Input
                                  value={subjectAnalysisState.title}
                                  onChange={(e) => setSubjectAnalysisState(prev => ({ ...prev, title: e.target.value }))}
                                  className="bg-black/20 border-white/10"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-xs font-bold text-muted-foreground">Subtitle</label>
                                <Input
                                  value={subjectAnalysisState.subtitle}
                                  onChange={(e) => setSubjectAnalysisState(prev => ({ ...prev, subtitle: e.target.value }))}
                                  className="bg-black/20 border-white/10"
                                />
                              </div>
                            </div>
                            <div className="grid gap-3 md:grid-cols-2">
                              <div className="space-y-1">
                                <label className="text-xs font-bold text-muted-foreground">Strongest Subject</label>
                                <Input
                                  value={subjectAnalysisState.strongestSubject}
                                  onChange={(e) => setSubjectAnalysisState(prev => ({ ...prev, strongestSubject: e.target.value }))}
                                  className="bg-black/20 border-white/10"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-xs font-bold text-muted-foreground">Strongest Grade</label>
                                <Input
                                  value={subjectAnalysisState.strongestGrade}
                                  onChange={(e) => setSubjectAnalysisState(prev => ({ ...prev, strongestGrade: e.target.value }))}
                                  className="bg-black/20 border-white/10"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <Separator className="bg-white/10" />
                          <p className="text-xs font-bold text-premium uppercase tracking-widest">Chart Data</p>
                          
                          {subjectAnalysisState.data.map((item, index) => (
                            <div key={`${item.name}-${index}`} className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto] items-center p-3 rounded-2xl border border-white/10 bg-white/5">
                              <Input
                                value={item.name}
                                onChange={(e) => setSubjectAnalysisState(prev => ({
                                  ...prev,
                                  data: prev.data.map((d, i) => i === index ? { ...d, name: e.target.value } : d)
                                }))}
                                placeholder="Subject Name"
                                className="bg-black/20 border-white/10"
                              />
                              <Input
                                type="number"
                                value={item.score}
                                onChange={(e) => setSubjectAnalysisState(prev => ({
                                  ...prev,
                                  data: prev.data.map((d, i) => i === index ? { ...d, score: Number(e.target.value) } : d)
                                }))}
                                placeholder="Score (0-100)"
                                className="bg-black/20 border-white/10"
                              />
                              <Input
                                value={item.grade}
                                onChange={(e) => setSubjectAnalysisState(prev => ({
                                  ...prev,
                                  data: prev.data.map((d, i) => i === index ? { ...d, grade: e.target.value } : d)
                                }))}
                                placeholder="Grade"
                                className="bg-black/20 border-white/10"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                type="button"
                                className="text-destructive hover:bg-destructive/10"
                                onClick={() => setSubjectAnalysisState(prev => ({
                                  ...prev,
                                  data: prev.data.filter((_, i) => i !== index)
                                }))}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          
                          <Button
                            variant="outline"
                            type="button"
                            className="w-full border-dashed border-white/10 hover:bg-white/5"
                            onClick={() => setSubjectAnalysisState(prev => ({
                              ...prev,
                              data: [...prev.data, { name: "New Sub", score: 80, grade: "A" }]
                            }))}
                          >
                            <Plus className="mr-2 h-4 w-4" /> Add Subject
                          </Button>
                        </div>
                        <DialogFooter className="mt-6">
                          <span className="mr-auto text-xs font-bold text-emerald-400 self-center">{saveMessage}</span>
                          <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                          <DialogClose render={<Button type="submit" className="glow-primary" />}>Save changes</DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </AdminOnly>
                <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-cyan-500" />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectAnalysisState.data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 'bold' }} 
                    dy={10} 
                  />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 15, 20, 0.9)', 
                      borderRadius: '16px', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={40}>
                    {subjectAnalysisState.data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <Star className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-xs font-black text-cyan-400 uppercase tracking-widest">Strongest Subject</p>
                <p className="text-sm font-bold text-premium">{subjectAnalysisState.strongestSubject} (Grade: {subjectAnalysisState.strongestGrade})</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Predictive Analytics & Goals */}
        <div className="space-y-8">
          {/* Predictive Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="premium-3d"
          >
            <Card className="premium-card border-none bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10 p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <BrainCircuit className="h-32 w-32 text-white" />
              </div>
              <CardHeader className="p-0 pb-4 flex flex-row items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/40">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-black text-premium uppercase tracking-widest">{predictiveAnalyticsState.title}</CardTitle>
                    <p className="text-[8px] font-black text-indigo-300 uppercase tracking-[0.3em]">{predictiveAnalyticsState.subtitle}</p>
                  </div>
                </div>
                <AdminOnly>
                  <Dialog>
                    <DialogTrigger render={
                      <Button type="button" variant="ghost" size="sm" className="h-6 w-6 p-0 text-white/70 hover:bg-white/10 hover:text-white relative z-20 cursor-pointer">
                        <Edit3 className="h-3 w-3 pointer-events-none" />
                      </Button>
                    } />
                    <DialogContent className="sm:max-w-md bg-card/90 backdrop-blur-xl border-white/10 text-foreground">
                      <DialogHeader>
                        <DialogTitle className="text-premium">Edit Predictive Analytics</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={(e) => { e.preventDefault(); savePredictiveAnalytics(predictiveAnalyticsState); }}>
                        <div className="space-y-4">
                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-muted-foreground">Title</label>
                              <Input
                                value={predictiveAnalyticsState.title}
                                onChange={(e) => setPredictiveAnalyticsState(prev => ({ ...prev, title: e.target.value }))}
                                className="bg-black/20 border-white/10"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-muted-foreground">Subtitle</label>
                              <Input
                                value={predictiveAnalyticsState.subtitle}
                                onChange={(e) => setPredictiveAnalyticsState(prev => ({ ...prev, subtitle: e.target.value }))}
                                className="bg-black/20 border-white/10"
                              />
                            </div>
                          </div>
                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-muted-foreground">Predicted Min CGPA</label>
                              <Input
                                value={predictiveAnalyticsState.predictedMin}
                                onChange={(e) => setPredictiveAnalyticsState(prev => ({ ...prev, predictedMin: e.target.value }))}
                                className="bg-black/20 border-white/10"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-muted-foreground">Predicted Max CGPA</label>
                              <Input
                                value={predictiveAnalyticsState.predictedMax}
                                onChange={(e) => setPredictiveAnalyticsState(prev => ({ ...prev, predictedMax: e.target.value }))}
                                className="bg-black/20 border-white/10"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-muted-foreground">Confidence (%)</label>
                            <Input
                              type="number"
                              value={predictiveAnalyticsState.confidence}
                              onChange={(e) => setPredictiveAnalyticsState(prev => ({ ...prev, confidence: Number(e.target.value) }))}
                              className="bg-black/20 border-white/10"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-muted-foreground">Insight Text</label>
                            <Input
                              value={predictiveAnalyticsState.insight}
                              onChange={(e) => setPredictiveAnalyticsState(prev => ({ ...prev, insight: e.target.value }))}
                              className="bg-black/20 border-white/10"
                            />
                          </div>
                        </div>
                        <DialogFooter className="mt-6">
                          <span className="mr-auto text-xs font-bold text-emerald-400 self-center">{saveMessage}</span>
                          <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                          <DialogClose render={<Button type="submit" className="glow-primary" />}>Save changes</DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </AdminOnly>
              </CardHeader>
              <CardContent className="p-0 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-premium">Predicted Final CGPA</p>
                    <p className="text-lg font-black text-indigo-400 tracking-tighter">{predictiveAnalyticsState.predictedMin} – {predictiveAnalyticsState.predictedMax}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                      <span>Confidence Meter</span>
                      <span>{predictiveAnalyticsState.confidence}%</span>
                    </div>
                    <Progress value={predictiveAnalyticsState.confidence} className="h-2 bg-white/5">
                      <ProgressTrack className="h-2 bg-white/5">
                        <ProgressIndicator className="bg-gradient-to-r from-indigo-500 to-cyan-500" />
                      </ProgressTrack>
                    </Progress>
                  </div>
                </div>
                <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                  "{predictiveAnalyticsState.insight}"
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Academic Goals */}
          <Card className="premium-card border-none p-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-black text-premium uppercase tracking-widest flex items-center gap-3">
                  <span>{academicGoalsState.title}</span>
                  <AdminOnly>
                    <Dialog>
                      <DialogTrigger render={
                        <Button type="button" variant="ghost" size="sm" className="h-6 w-6 p-0 text-white/70 hover:bg-white/10 hover:text-white relative z-20 cursor-pointer">
                          <Edit3 className="h-3 w-3 pointer-events-none" />
                        </Button>
                      } />
                      <DialogContent className="sm:max-w-2xl bg-card/90 backdrop-blur-xl border-white/10 text-foreground">
                        <DialogHeader>
                          <DialogTitle className="text-premium">Edit Academic Goals</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={(e) => { e.preventDefault(); saveAcademicGoals(academicGoalsState); }}>
                          <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-muted-foreground">Title</label>
                              <Input
                                value={academicGoalsState.title}
                                onChange={(e) => setAcademicGoalsState(prev => ({ ...prev, title: e.target.value }))}
                                className="bg-black/20 border-white/10"
                              />
                            </div>
                            
                            <Separator className="bg-white/10" />
                            <p className="text-xs font-bold text-premium uppercase tracking-widest">Goals List</p>
                            
                            {academicGoalsState.goals.map((goal, index) => (
                              <div key={`${goal.title}-${index}`} className="grid gap-3 md:grid-cols-[1fr_100px_auto] items-center p-3 rounded-2xl border border-white/10 bg-white/5">
                                <Input
                                  value={goal.title}
                                  onChange={(e) => setAcademicGoalsState(prev => ({
                                    ...prev,
                                    goals: prev.goals.map((g, i) => i === index ? { ...g, title: e.target.value } : g)
                                  }))}
                                  placeholder="Goal Title"
                                  className="bg-black/20 border-white/10"
                                />
                                <Input
                                  type="number"
                                  value={goal.progress}
                                  onChange={(e) => setAcademicGoalsState(prev => ({
                                    ...prev,
                                    goals: prev.goals.map((g, i) => i === index ? { ...g, progress: Number(e.target.value) } : g)
                                  }))}
                                  placeholder="Progress (%)"
                                  className="bg-black/20 border-white/10"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  type="button"
                                  className="text-destructive hover:bg-destructive/10"
                                  onClick={() => setAcademicGoalsState(prev => ({
                                    ...prev,
                                    goals: prev.goals.filter((_, i) => i !== index)
                                  }))}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            
                            <Button
                              variant="outline"
                              type="button"
                              className="w-full border-dashed border-white/10 hover:bg-white/5"
                              onClick={() => setAcademicGoalsState(prev => ({
                                ...prev,
                                goals: [...prev.goals, { title: "New Goal", progress: 50, color: "bg-indigo-500" }]
                              }))}
                            >
                              <Plus className="mr-2 h-4 w-4" /> Add Goal
                            </Button>
                          </div>
                          <DialogFooter className="mt-6">
                            <span className="mr-auto text-xs font-bold text-emerald-400 self-center">{saveMessage}</span>
                            <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                            <DialogClose render={<Button type="submit" className="glow-primary" />}>Save changes</DialogClose>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </AdminOnly>
                </CardTitle>
                <Target className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              {academicGoalsState.goals.map((goal, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-premium">{goal.title}</span>
                    <span className="text-xs font-black text-muted-foreground">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-1.5 bg-white/5">
                    <ProgressTrack className="h-1.5 bg-white/5">
                      <ProgressIndicator className={goal.color} />
                    </ProgressTrack>
                  </Progress>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Semester Breakdown */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-3xl font-black text-premium tracking-tighter">Semester Breakdown</h2>
          <div className="flex gap-2">
            <Badge variant="outline" className="rounded-lg bg-white/5 border-white/10 text-[10px] font-bold py-1 px-3">
              Total Semesters: {semesters.length}
            </Badge>
            {isAdmin && (
              <Dialog>
                <DialogTrigger
                  render={
                    <Button variant="outline" className="rounded-lg border-white/10 hover:bg-white/5">
                      Edit Semesters
                    </Button>
                  }
                />
                <DialogContent className="glass-panel border-none sm:max-w-3xl">
                  <DialogHeader>
                    <DialogTitle className="text-premium">Edit Semester Breakdown</DialogTitle>
                    <DialogDescription>
                      Add, remove, and save semester subject entries.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                    {semesters.map((semester, semesterIndex) => (
                      <div key={semester.sem} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-4">
                        <div className="flex items-center gap-3">
                          <Input
                            value={semester.sem}
                            onChange={(event) =>
                              setSemesters((current) =>
                                current.map((entry, itemIndex) =>
                                  itemIndex === semesterIndex
                                    ? { ...entry, sem: Number(event.target.value || 0) }
                                    : entry
                                )
                              )
                            }
                            className="w-24 border-white/10 bg-black/20"
                          />
                          <Input
                            type="number"
                            min="0"
                            max="10"
                            step="0.01"
                            value={semester.gpa}
                            onChange={(event) =>
                              setSemesters((current) =>
                                current.map((entry, itemIndex) =>
                                  itemIndex === semesterIndex
                                    ? { ...entry, gpa: Number(event.target.value || 0) }
                                    : entry
                                )
                              )
                            }
                            className="w-32 border-white/10 bg-black/20"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 text-destructive hover:bg-destructive/10"
                            onClick={() =>
                              setSemesters((current) => current.filter((_, itemIndex) => itemIndex !== semesterIndex))
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-3">
                          {semester.subjects.map((subject: any, subjectIndex: number) => (
                            <div key={`${subject.code || subject.name}-${subjectIndex}`} className="grid gap-3 rounded-2xl border border-white/10 bg-black/10 p-3 md:grid-cols-4">
                              <Input
                                value={subject.code || ""}
                                onChange={(event) =>
                                  setSemesters((current) =>
                                    current.map((entry, itemIndex) =>
                                      itemIndex === semesterIndex
                                        ? {
                                            ...entry,
                                            subjects: entry.subjects.map((item: any, index: number) =>
                                              index === subjectIndex ? { ...item, code: event.target.value } : item
                                            ),
                                          }
                                        : entry
                                    )
                                  )
                                }
                                className="border-white/10 bg-black/20"
                                placeholder="Code"
                              />
                              <Input
                                value={subject.name}
                                onChange={(event) =>
                                  setSemesters((current) =>
                                    current.map((entry, itemIndex) =>
                                      itemIndex === semesterIndex
                                        ? {
                                            ...entry,
                                            subjects: entry.subjects.map((item: any, index: number) =>
                                              index === subjectIndex ? { ...item, name: event.target.value } : item
                                            ),
                                          }
                                        : entry
                                    )
                                  )
                                }
                                className="border-white/10 bg-black/20 md:col-span-2"
                                placeholder="Subject"
                              />
                              <div className="flex gap-3">
                                <Input
                                  value={subject.result ?? ""}
                                  onChange={(event) =>
                                    setSemesters((current) =>
                                      current.map((entry, itemIndex) =>
                                        itemIndex === semesterIndex
                                          ? {
                                              ...entry,
                                              subjects: entry.subjects.map((item: any, index: number) =>
                                                index === subjectIndex ? { ...item, result: Number(event.target.value || 0) } : item
                                              ),
                                            }
                                          : entry
                                      )
                                    )
                                  }
                                  className="border-white/10 bg-black/20"
                                  placeholder="Result"
                                />
                                <Input
                                  value={subject.grade}
                                  onChange={(event) =>
                                    setSemesters((current) =>
                                      current.map((entry, itemIndex) =>
                                        itemIndex === semesterIndex
                                          ? {
                                              ...entry,
                                              subjects: entry.subjects.map((item: any, index: number) =>
                                                index === subjectIndex ? { ...item, grade: event.target.value } : item
                                              ),
                                            }
                                          : entry
                                      )
                                    )
                                  }
                                  className="border-white/10 bg-black/20"
                                  placeholder="Grade"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="shrink-0 text-destructive hover:bg-destructive/10"
                                  onClick={() =>
                                    setSemesters((current) =>
                                      current.map((entry, itemIndex) =>
                                        itemIndex === semesterIndex
                                          ? {
                                              ...entry,
                                              subjects: entry.subjects.filter((_: any, index: number) => index !== subjectIndex),
                                            }
                                          : entry
                                      )
                                    )
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            className="w-full rounded-xl border-dashed border-white/10 hover:bg-white/5"
                            onClick={() =>
                              setSemesters((current) =>
                                current.map((entry, itemIndex) =>
                                  itemIndex === semesterIndex
                                    ? {
                                        ...entry,
                                        subjects: [
                                          ...entry.subjects,
                                          { code: "", name: "New Subject", result: 0, grade: "P" },
                                        ],
                                      }
                                    : entry
                                )
                              )
                            }
                          >
                            <Plus className="mr-2 h-4 w-4" /> Add Subject
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-dashed border-white/10 hover:bg-white/5"
                      onClick={() =>
                        setSemesters((current) => [
                          ...current,
                          { sem: current.length + 1, gpa: 0, subjects: [] },
                        ])
                      }
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Semester
                    </Button>
                  </div>
                  <DialogFooter showCloseButton>
                    <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                    <Button onClick={saveAcademicChanges}>Save Semesters</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
        <div className="grid gap-4">
          {semesters.map((sem, index) => (
            <motion.div
              key={sem.sem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="premium-card border-none overflow-hidden group">
                <Accordion>
                  <AccordionItem value={`sem-${sem.sem}`} className="border-none">
                    <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-white/5 transition-all">
                      <div className="flex w-full items-center justify-between pr-4">
                        <div className="flex items-center gap-6">
                          <div className={cn(
                            "flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-black shadow-lg",
                            index === semesters.length - 1 ? "bg-indigo-500 text-white shadow-indigo-500/20" : "bg-white/5 text-premium"
                          )}>
                            S{sem.sem}
                          </div>
                          <div className="text-left space-y-1">
                            <p className="text-lg font-black text-premium tracking-tight">Semester {sem.sem}</p>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{sem.time || `Academic Year 202${Math.floor((sem.sem-1)/2) + 1}`}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                          <div className="text-right space-y-1">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">GPA</p>
                            <p className="text-2xl font-black text-primary tracking-tighter">{sem.gpa}</p>
                          </div>
                          <Badge className={cn(
                            "hidden sm:inline-flex font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-lg",
                            sem.gpa >= 9.0 ? "bg-emerald-500/10 text-emerald-500" : "bg-indigo-500/10 text-indigo-500"
                          )}>
                            {sem.gpa >= 9.5 ? "Outstanding" : sem.gpa >= 9.0 ? "Excellent" : "Very Good"}
                          </Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-8 pt-4">
                      <div className="grid gap-4 md:grid-cols-3">
                        {sem.subjects.map((subject, idx) => (
                          <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-4 group/sub hover:bg-white/10 transition-colors">
                            <div className="space-y-1 min-w-0">
                              <p className="text-sm font-bold text-premium group-hover/sub:text-primary transition-colors">{subject.name}</p>
                              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                {subject.code ? `${subject.code} • ` : ""}Result: {subject.result ?? "--"}
                              </p>
                            </div>
                            <div className="h-10 min-w-10 px-3 rounded-xl bg-primary/10 flex items-center justify-center">
                              <span className="text-lg font-black text-primary">{subject.grade}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="premium-3d"
      >
        <Card className="premium-card border-none bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10 p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
            <BrainCircuit className="h-48 w-48 text-white" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/40">
              <Zap className="h-10 w-10 text-white animate-pulse" />
            </div>
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-1 flex items-center gap-3">
                <div>
                  <h3 className="text-3xl font-black text-premium tracking-tighter">{aiInsightsState.title}</h3>
                  <p className="text-indigo-300 font-bold uppercase tracking-[0.3em] text-[10px]">{aiInsightsState.subtitle}</p>
                </div>
                <AdminOnly>
                  <Dialog>
                    <DialogTrigger render={
                      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 text-white/70 hover:bg-white/10 hover:text-white relative z-20 cursor-pointer">
                        <Edit3 className="h-4 w-4 pointer-events-none" />
                      </Button>
                    } />
                    <DialogContent className="sm:max-w-2xl bg-card/90 backdrop-blur-xl border-white/10 text-foreground">
                      <DialogHeader>
                        <DialogTitle className="text-premium">Edit AI Insights</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={(e) => { e.preventDefault(); saveAiInsights(aiInsightsState); }}>
                        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-muted-foreground">Title</label>
                            <Input
                              value={aiInsightsState.title}
                              onChange={(e) => setAiInsightsState(prev => ({ ...prev, title: e.target.value }))}
                              className="bg-black/20 border-white/10"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-muted-foreground">Subtitle</label>
                            <Input
                              value={aiInsightsState.subtitle}
                              onChange={(e) => setAiInsightsState(prev => ({ ...prev, subtitle: e.target.value }))}
                              className="bg-black/20 border-white/10"
                            />
                          </div>
                          
                          <Separator className="bg-white/10" />
                          <p className="text-xs font-bold text-premium uppercase tracking-widest">Insights List</p>
                          
                          {aiInsightsState.insights.map((insight, index) => (
                            <div key={`${insight.type}-${index}`} className="grid gap-3 items-center p-3 rounded-2xl border border-white/10 bg-white/5">
                              <div className="grid md:grid-cols-2 gap-3">
                                <Input
                                  value={insight.type}
                                  onChange={(e) => setAiInsightsState(prev => ({
                                    ...prev,
                                    insights: prev.insights.map((ins, i) => i === index ? { ...ins, type: e.target.value } : ins)
                                  }))}
                                  placeholder="Type (e.g. Growth)"
                                  className="bg-black/20 border-white/10"
                                />
                                <Input
                                  value={insight.icon}
                                  onChange={(e) => setAiInsightsState(prev => ({
                                    ...prev,
                                    insights: prev.insights.map((ins, i) => i === index ? { ...ins, icon: e.target.value } : ins)
                                  }))}
                                  placeholder="Icon Name (e.g. TrendingUp)"
                                  className="bg-black/20 border-white/10"
                                />
                              </div>
                              <div className="flex gap-3">
                                <Input
                                  value={insight.text}
                                  onChange={(e) => setAiInsightsState(prev => ({
                                    ...prev,
                                    insights: prev.insights.map((ins, i) => i === index ? { ...ins, text: e.target.value } : ins)
                                  }))}
                                  placeholder="Insight Text"
                                  className="bg-black/20 border-white/10 flex-1"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  type="button"
                                  className="text-destructive hover:bg-destructive/10 shrink-0"
                                  onClick={() => setAiInsightsState(prev => ({
                                    ...prev,
                                    insights: prev.insights.filter((_, i) => i !== index)
                                  }))}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                          
                          <Button
                            variant="outline"
                            type="button"
                            className="w-full border-dashed border-white/10 hover:bg-white/5"
                            onClick={() => setAiInsightsState(prev => ({
                              ...prev,
                              insights: [...prev.insights, { type: "New Insight", text: "New insight text.", icon: "Sparkles", color: "text-white" }]
                            }))}
                          >
                            <Plus className="mr-2 h-4 w-4" /> Add Insight
                          </Button>
                        </div>
                        <DialogFooter className="mt-6">
                          <span className="mr-auto text-xs font-bold text-emerald-400 self-center">{saveMessage}</span>
                          <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                          <DialogClose render={<Button type="submit" className="glow-primary" />}>Save changes</DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </AdminOnly>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {aiInsightsState.insights.map((insight, idx) => {
                  const Icon = (LucideIcons as any)[insight.icon] || LucideIcons.Sparkles;
                  return (
                    <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                      <div className={`flex items-center gap-2 ${insight.color}`}>
                        <Icon className="h-4 w-4" />
                        <span className="text-xs font-black uppercase tracking-widest">{insight.type}</span>
                      </div>
                      <p className="text-sm font-bold text-premium">{insight.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
