import * as React from "react";
import {  
  TrendingUp, 
  Zap, 
  Target, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Activity, 
  Brain, 
  Clock,
  ChevronRight,
  ArrowUpRight,
  Trophy,
  AlertCircle
, Edit3 } from "lucide-react";
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
  PieChart,
  Pie,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { studentData } from "@/src/data/mockData";
import { AdminOnly } from "@/src/lib/admin";
import { motion } from "motion/react";

const COLORS = ['#22C55E', '#F59E0B', '#EF4444'];
const CODING_ANALYTICS_STORAGE_KEYS = {
  sectionTitles: "analytics-section-titles",
  analytics: "coding-analytics-stats",
  velocity: "coding-analytics-velocity",
  difficulty: "coding-analytics-difficulty",
  topicMastery: "coding-analytics-topic-mastery",
  platform: "coding-analytics-platform",
  strengths: "coding-analytics-strengths",
  weaknesses: "coding-analytics-weaknesses",
  recommendations: "coding-analytics-recommendations",
  prediction: "coding-analytics-prediction",
} as const;

export default function CodingAnalytics() {
  const [analyticsStats, setAnalyticsStats] = React.useState([
    { title: "Consistency Score", value: "92%", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10", trend: "+2.4%" },
    { title: "Avg. Solve Time", value: "24m", icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10", trend: "+2.4%" },
    { title: "Accuracy Rate", value: "78%", icon: Target, color: "text-emerald-500", bg: "bg-emerald-500/10", trend: "+2.4%" },
    { title: "Global Rank", value: "Top 12%", icon: Trophy, color: "text-purple-500", bg: "bg-purple-500/10", trend: "+2.4%" },
  ]);
  const [solvingVelocity, setSolvingVelocity] = React.useState(studentData.dsa.progressTrend);
  const [difficultyData, setDifficultyData] = React.useState([
    { name: "Easy", value: studentData.dsa.breakdown.easy },
    { name: "Medium", value: studentData.dsa.breakdown.medium },
    { name: "Hard", value: studentData.dsa.breakdown.hard },
  ]);
  const [topicPerformanceData, setTopicPerformanceData] = React.useState(
    studentData.dsa.topics.map((t) => ({
      subject: t.name,
      A: (t.solved / t.total) * 100,
      fullMark: 100,
    }))
  );
  const [platformData, setPlatformData] = React.useState([
    { name: "LeetCode", solved: studentData.dsa.platforms.leetcode.solved, color: "#FFA116" },
    { name: "GFG", solved: studentData.dsa.platforms.geeksforgeeks.solved, color: "#2F8D46" },
    { name: "Other", solved: 20, color: "#6366F1" },
  ]);
  const [strengths, setStrengths] = React.useState([
    { topic: "Dynamic Programming", level: 85 },
    { topic: "Arrays & Strings", level: 92 },
    { topic: "Recursion", level: 78 },
  ]);
  const [weaknesses, setWeaknesses] = React.useState([
    { topic: "Graphs", level: 45 },
    { topic: "Tries", level: 30 },
    { topic: "Segment Trees", level: 25 },
  ]);
  const [recommendations, setRecommendations] = React.useState([
    "Solve 10 medium Graph problems",
    "Revise Dijkstra's Algorithm",
    "Participate in LeetCode Biweekly Contest",
    "Complete 3 system design case studies",
  ]);
  const [predictionText, setPredictionText] = React.useState(
    "Based on your current velocity, you will reach your 500 problems goal by August 15, 2024."
  );
  const [saveMessage, setSaveMessage] = React.useState("");

  const [sectionTitles, setSectionTitles] = React.useState({
    header: "Coding Analytics",
    headerSub: "Deep dive into your problem-solving patterns and performance metrics.",
    leetcodeLink: "https://leetcode.com",
    analytics: "Coding Analytics",
    velocity: "Solving Velocity",
    difficulty: "Difficulty Distribution",
    mastery: "Topic Mastery",
    platform: "Platform Comparison",
    strengths: "Strengths & Weaknesses",
    recommendation: "Recommendation"
  });
  
  const updateSectionTitle = (key, value) => {
    setSectionTitles(prev => {
      const next = { ...prev, [key]: value };
      window.localStorage.setItem(CODING_ANALYTICS_STORAGE_KEYS.sectionTitles, JSON.stringify(next));
      return next;
    });
  };

  React.useEffect(() => {
    const savedTitles = localStorage.getItem(CODING_ANALYTICS_STORAGE_KEYS.sectionTitles);
    const savedAnalytics = localStorage.getItem(CODING_ANALYTICS_STORAGE_KEYS.analytics);
    const savedVelocity = localStorage.getItem(CODING_ANALYTICS_STORAGE_KEYS.velocity);
    const savedDifficulty = localStorage.getItem(CODING_ANALYTICS_STORAGE_KEYS.difficulty);
    const savedTopicMastery = localStorage.getItem(CODING_ANALYTICS_STORAGE_KEYS.topicMastery);
    const savedPlatform = localStorage.getItem(CODING_ANALYTICS_STORAGE_KEYS.platform);
    const savedStrengths = localStorage.getItem(CODING_ANALYTICS_STORAGE_KEYS.strengths);
    const savedWeaknesses = localStorage.getItem(CODING_ANALYTICS_STORAGE_KEYS.weaknesses);
    const savedRecommendations = localStorage.getItem(CODING_ANALYTICS_STORAGE_KEYS.recommendations);
    const savedPrediction = localStorage.getItem(CODING_ANALYTICS_STORAGE_KEYS.prediction);

    if (savedTitles) {
      try {
        const parsed = JSON.parse(savedTitles);
        setSectionTitles(prev => ({ ...prev, ...parsed }));
      } catch {}
    }
    if (savedAnalytics) {
      try {
        const parsed = JSON.parse(savedAnalytics);
        setAnalyticsStats((current) =>
          parsed.map((item: any, index: number) => ({
            ...current[index % current.length],
            ...item,
            icon: current[index % current.length]?.icon || Zap,
          }))
        );
      } catch {}
    }
    if (savedVelocity) {
      try { setSolvingVelocity(JSON.parse(savedVelocity)); } catch {}
    }
    if (savedDifficulty) {
      try { setDifficultyData(JSON.parse(savedDifficulty)); } catch {}
    }
    if (savedTopicMastery) {
      try { setTopicPerformanceData(JSON.parse(savedTopicMastery)); } catch {}
    }
    if (savedPlatform) {
      try { setPlatformData(JSON.parse(savedPlatform)); } catch {}
    }
    if (savedStrengths) {
      try { setStrengths(JSON.parse(savedStrengths)); } catch {}
    }
    if (savedWeaknesses) {
      try { setWeaknesses(JSON.parse(savedWeaknesses)); } catch {}
    }
    if (savedRecommendations) {
      try { setRecommendations(JSON.parse(savedRecommendations)); } catch {}
    }
    if (savedPrediction) {
      setPredictionText(savedPrediction);
    }
  }, []);

  const markSaved = (message: string) => {
    setSaveMessage(message);
    window.setTimeout(() => setSaveMessage(""), 2000);
  };

  const saveAnalyticsStats = () => {
    localStorage.setItem(
      CODING_ANALYTICS_STORAGE_KEYS.analytics,
      JSON.stringify(analyticsStats.map(({ title, value, color, bg, trend }) => ({ title, value, color, bg, trend })))
    );
    markSaved("Coding analytics saved");
  };

  const saveVelocity = () => {
    localStorage.setItem(CODING_ANALYTICS_STORAGE_KEYS.velocity, JSON.stringify(solvingVelocity));
    markSaved("Solving velocity saved");
  };

  const saveDifficulty = () => {
    localStorage.setItem(CODING_ANALYTICS_STORAGE_KEYS.difficulty, JSON.stringify(difficultyData));
    markSaved("Difficulty distribution saved");
  };

  const saveTopicMastery = () => {
    localStorage.setItem(CODING_ANALYTICS_STORAGE_KEYS.topicMastery, JSON.stringify(topicPerformanceData));
    markSaved("Topic mastery saved");
  };

  const savePlatform = () => {
    localStorage.setItem(CODING_ANALYTICS_STORAGE_KEYS.platform, JSON.stringify(platformData));
    localStorage.setItem(CODING_ANALYTICS_STORAGE_KEYS.prediction, predictionText);
    markSaved("Platform comparison saved");
  };

  const saveStrengthWeakness = () => {
    localStorage.setItem(CODING_ANALYTICS_STORAGE_KEYS.strengths, JSON.stringify(strengths));
    localStorage.setItem(CODING_ANALYTICS_STORAGE_KEYS.weaknesses, JSON.stringify(weaknesses));
    markSaved("Strengths & weaknesses saved");
  };

  const saveRecommendations = () => {
    localStorage.setItem(CODING_ANALYTICS_STORAGE_KEYS.recommendations, JSON.stringify(recommendations));
    markSaved("AI recommendation saved");
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">{sectionTitles.header}</h1>
          <p className="text-muted-foreground">{sectionTitles.headerSub}</p>
        </div>
        <div className="flex gap-2">
          <AdminOnly>
            <Dialog>
              <DialogTrigger render={<Button variant="outline" size="sm" className="gap-2"><Edit3 className="h-4 w-4" /> Edit Header</Button>} />
              <DialogContent className="sm:max-w-md bg-card/95 border-white/10">
                <DialogHeader><DialogTitle>Edit Header & Links</DialogTitle></DialogHeader>
                <div className="space-y-4">
                  <Input value={sectionTitles.header} onChange={e => updateSectionTitle("header", e.target.value)} placeholder="Header Title" className="bg-black/20 border-white/10" />
                  <Input value={sectionTitles.headerSub} onChange={e => updateSectionTitle("headerSub", e.target.value)} placeholder="Header Subtitle" className="bg-black/20 border-white/10" />
                  <Input value={sectionTitles.leetcodeLink} onChange={e => updateSectionTitle("leetcodeLink", e.target.value)} placeholder="LeetCode Profile URL" className="bg-black/20 border-white/10" />
                </div>
              </DialogContent>
            </Dialog>
          </AdminOnly>
          <Button variant="outline" size="sm" className="gap-2">
            <Clock className="h-4 w-4" /> Last 30 Days
          </Button>
          <a href={sectionTitles.leetcodeLink} target="_blank" rel="noreferrer">
            <Button size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700">
              <Trophy className="h-4 w-4" /> View Leaderboard
            </Button>
          </a>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {analyticsStats.map((stat, i) => (
          <motion.div
            key={`${stat.title}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-none bg-card/50 backdrop-blur-xl shadow-sm hover:shadow-md transition-all group overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <Badge variant="outline" className="text-[10px] border-emerald-500/20 text-emerald-500 bg-emerald-500/5">
                    {stat.trend}
                  </Badge>
                </div>
                <div className="mt-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
                </div>
              </CardContent>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Card>
          </motion.div>
        ))}
      </div>
      <AdminOnly>
        <Dialog>
          <DialogTrigger render={<Button variant="outline" className="border-white/10 bg-white/5" />}>
            Edit Coding Analytics
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl bg-card/95 border-white/10">
            <DialogHeader>
              <DialogTitle>Edit Coding Analytics</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mb-4">
               <Input value={sectionTitles.analytics} onChange={e => updateSectionTitle("analytics", e.target.value)} placeholder="Section Title" className="bg-black/20 border-white/10" />
            </div>
            <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
              {analyticsStats.map((stat, index) => (
                <div key={`${stat.title}-${index}`} className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-4">
                  <Input value={stat.title} onChange={(e) => setAnalyticsStats((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, title: e.target.value } : item))} className="bg-black/20 border-white/10" />
                  <Input value={stat.value} onChange={(e) => setAnalyticsStats((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, value: e.target.value } : item))} className="bg-black/20 border-white/10" />
                  <Input value={stat.trend} onChange={(e) => setAnalyticsStats((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, trend: e.target.value } : item))} className="bg-black/20 border-white/10" />
                  <Button variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => setAnalyticsStats((current) => current.filter((_, itemIndex) => itemIndex !== index))}>Remove</Button>
                </div>
              ))}
              <Button variant="outline" className="w-full border-dashed border-white/10 hover:bg-white/5" onClick={() => setAnalyticsStats((current) => [...current, { title: "New Metric", value: "0", icon: BarChart3, color: "text-indigo-500", bg: "bg-indigo-500/10", trend: "+0%" }])}>
                Add Metric
              </Button>
            </div>
            <DialogFooter>
              <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
              <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
              <DialogClose render={<Button type="button" onClick={() => { saveAnalyticsStats(); }} />}>Save</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AdminOnly>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-none bg-card/50 backdrop-blur-xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">{sectionTitles.velocity}</CardTitle>
              <CardDescription>Daily problems solved over the last 6 months</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-500 border-none">Cumulative</Badge>
              <AdminOnly>
                <Dialog>
                  <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>Edit</DialogTrigger>
                  <DialogContent className="sm:max-w-2xl bg-card/95 border-white/10">
                    <DialogHeader><DialogTitle>Edit Solving Velocity</DialogTitle></DialogHeader>
                    <div className="space-y-4 mb-4">
                       <Input value={sectionTitles.velocity} onChange={e => updateSectionTitle("velocity", e.target.value)} placeholder="Section Title" className="bg-black/20 border-white/10" />
                    </div>
                    <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                      {solvingVelocity.map((item, index) => (
                        <div key={`${item.date}-${index}`} className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-3">
                          <Input value={item.date} onChange={(e) => setSolvingVelocity((current) => current.map((entry, itemIndex) => itemIndex === index ? { ...entry, date: e.target.value } : entry))} className="bg-black/20 border-white/10" />
                          <Input type="number" value={item.solved} onChange={(e) => setSolvingVelocity((current) => current.map((entry, itemIndex) => itemIndex === index ? { ...entry, solved: Number(e.target.value || 0) } : entry))} className="bg-black/20 border-white/10" />
                          <Button variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => setSolvingVelocity((current) => current.filter((_, itemIndex) => itemIndex !== index))}>Remove</Button>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full border-dashed border-white/10 hover:bg-white/5" onClick={() => setSolvingVelocity((current) => [...current, { date: "Week", solved: 0 }])}>Add Data Point</Button>
                    </div>
                    <DialogFooter>
                      <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                      <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                      <DialogClose render={<Button type="button" onClick={() => { saveVelocity(); }} />}>Save</DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </AdminOnly>
            </div>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={solvingVelocity}>
                <defs>
                  <linearGradient id="colorSolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888820" />
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e1b4b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Area type="monotone" dataKey="solved" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorSolved)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none bg-card/50 backdrop-blur-xl shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-lg">{sectionTitles.difficulty}</CardTitle>
              <AdminOnly>
                <Dialog>
                  <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>Edit</DialogTrigger>
                  <DialogContent className="sm:max-w-xl bg-card/95 border-white/10">
                    <DialogHeader><DialogTitle>Edit Difficulty Distribution</DialogTitle></DialogHeader>
                    <div className="space-y-4 mb-4">
                       <Input value={sectionTitles.difficulty} onChange={e => updateSectionTitle("difficulty", e.target.value)} placeholder="Section Title" className="bg-black/20 border-white/10" />
                    </div>
                    <div className="space-y-4">
                      {difficultyData.map((item, index) => (
                        <div key={`${item.name}-${index}`} className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-3">
                          <Input value={item.name} onChange={(e) => setDifficultyData((current) => current.map((entry, itemIndex) => itemIndex === index ? { ...entry, name: e.target.value } : entry))} className="bg-black/20 border-white/10" />
                          <Input type="number" value={item.value} onChange={(e) => setDifficultyData((current) => current.map((entry, itemIndex) => itemIndex === index ? { ...entry, value: Number(e.target.value || 0) } : entry))} className="bg-black/20 border-white/10" />
                          <Button variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => setDifficultyData((current) => current.filter((_, itemIndex) => itemIndex !== index))}>Remove</Button>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full border-dashed border-white/10 hover:bg-white/5" onClick={() => setDifficultyData((current) => [...current, { name: "New", value: 0 }])}>Add Item</Button>
                    </div>
                    <DialogFooter>
                      <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                      <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                      <DialogClose render={<Button type="button" onClick={() => { saveDifficulty(); }} />}>Save</DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </AdminOnly>
            </div>
            <CardDescription>Solved problems by level</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={difficultyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {difficultyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e1b4b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-4 mt-4 w-full">
              {difficultyData.map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{item.name}</p>
                  <p className="text-lg font-bold" style={{ color: COLORS[i] }}>{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-none bg-card/50 backdrop-blur-xl shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-lg">{sectionTitles.mastery}</CardTitle>
              <AdminOnly>
                <Dialog>
                  <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>Edit</DialogTrigger>
                  <DialogContent className="sm:max-w-2xl bg-card/95 border-white/10">
                    <DialogHeader><DialogTitle>Edit Topic Mastery</DialogTitle></DialogHeader>
                    <div className="space-y-4 mb-4">
                       <Input value={sectionTitles.mastery} onChange={e => updateSectionTitle("mastery", e.target.value)} placeholder="Section Title" className="bg-black/20 border-white/10" />
                    </div>
                    <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                      {topicPerformanceData.map((item, index) => (
                        <div key={`${item.subject}-${index}`} className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-3">
                          <Input value={item.subject} onChange={(e) => setTopicPerformanceData((current) => current.map((entry, itemIndex) => itemIndex === index ? { ...entry, subject: e.target.value } : entry))} className="bg-black/20 border-white/10" />
                          <Input type="number" value={item.A} onChange={(e) => setTopicPerformanceData((current) => current.map((entry, itemIndex) => itemIndex === index ? { ...entry, A: Number(e.target.value || 0) } : entry))} className="bg-black/20 border-white/10" />
                          <Button variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => setTopicPerformanceData((current) => current.filter((_, itemIndex) => itemIndex !== index))}>Remove</Button>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full border-dashed border-white/10 hover:bg-white/5" onClick={() => setTopicPerformanceData((current) => [...current, { subject: "New Topic", A: 0, fullMark: 100 }])}>Add Topic</Button>
                    </div>
                    <DialogFooter>
                      <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                      <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                      <DialogClose render={<Button type="button" onClick={() => { saveTopicMastery(); }} />}>Save</DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </AdminOnly>
            </div>
            <CardDescription>Radar analysis of DSA concepts</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={topicPerformanceData}>
                <PolarGrid stroke="#88888820" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#888888', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Mastery"
                  dataKey="A"
                  stroke="#6366F1"
                  fill="#6366F1"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none bg-card/50 backdrop-blur-xl shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-lg">{sectionTitles.platform}</CardTitle>
              <AdminOnly>
                <Dialog>
                  <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>Edit</DialogTrigger>
                  <DialogContent className="sm:max-w-2xl bg-card/95 border-white/10">
                    <DialogHeader><DialogTitle>Edit Platform Comparison</DialogTitle></DialogHeader>
                    <div className="space-y-4 mb-4">
                       <Input value={sectionTitles.platform} onChange={e => updateSectionTitle("platform", e.target.value)} placeholder="Section Title" className="bg-black/20 border-white/10" />
                    </div>
                    <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                      {platformData.map((item, index) => (
                        <div key={`${item.name}-${index}`} className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-3">
                          <Input value={item.name} onChange={(e) => setPlatformData((current) => current.map((entry, itemIndex) => itemIndex === index ? { ...entry, name: e.target.value } : entry))} className="bg-black/20 border-white/10" />
                          <Input type="number" value={item.solved} onChange={(e) => setPlatformData((current) => current.map((entry, itemIndex) => itemIndex === index ? { ...entry, solved: Number(e.target.value || 0) } : entry))} className="bg-black/20 border-white/10" />
                          <Button variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => setPlatformData((current) => current.filter((_, itemIndex) => itemIndex !== index))}>Remove</Button>
                        </div>
                      ))}
                      <Textarea value={predictionText} onChange={(e) => setPredictionText(e.target.value)} className="min-h-28 bg-black/20 border-white/10" />
                      <Button variant="outline" className="w-full border-dashed border-white/10 hover:bg-white/5" onClick={() => setPlatformData((current) => [...current, { name: "New Platform", solved: 0, color: "#6366F1" }])}>Add Platform</Button>
                    </div>
                    <DialogFooter>
                      <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                      <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                      <DialogClose render={<Button type="button" onClick={() => { savePlatform(); }} />}>Save</DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </AdminOnly>
            </div>
            <CardDescription>Distribution across coding platforms</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#88888820" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} width={80} />
                <Tooltip 
                  cursor={{ fill: '#88888810' }}
                  contentStyle={{ backgroundColor: '#1e1b4b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="solved" radius={[0, 4, 4, 0]} barSize={20}>
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="space-y-4 mt-6">
               <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                  <div className="flex items-center gap-3">
                    <Brain className="h-5 w-5 text-indigo-500" />
                    <div>
                      <p className="text-sm font-bold">Predictive Insight</p>
                      <p className="text-xs text-muted-foreground">{predictionText}</p>
                    </div>
                  </div>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-none bg-card/50 backdrop-blur-xl shadow-sm overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-lg">{sectionTitles.strengths}</CardTitle>
              <AdminOnly>
                <Dialog>
                  <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>Edit</DialogTrigger>
                  <DialogContent className="sm:max-w-3xl bg-card/95 border-white/10">
                    <DialogHeader><DialogTitle>Edit Strengths & Weaknesses</DialogTitle></DialogHeader>
                    <div className="space-y-4 mb-4">
                       <Input value={sectionTitles.strengths} onChange={e => updateSectionTitle("strengths", e.target.value)} placeholder="Section Title" className="bg-black/20 border-white/10" />
                    </div>
                    <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-1">
                      <div className="space-y-4">
                        <p className="text-xs font-black uppercase tracking-widest text-emerald-500">Top Strengths</p>
                        {strengths.map((item, index) => (
                          <div key={`${item.topic}-${index}`} className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-3">
                            <Input value={item.topic} onChange={(e) => setStrengths((current) => current.map((entry, itemIndex) => itemIndex === index ? { ...entry, topic: e.target.value } : entry))} className="bg-black/20 border-white/10" />
                            <Input type="number" value={item.level} onChange={(e) => setStrengths((current) => current.map((entry, itemIndex) => itemIndex === index ? { ...entry, level: Number(e.target.value || 0) } : entry))} className="bg-black/20 border-white/10" />
                            <Button variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => setStrengths((current) => current.filter((_, itemIndex) => itemIndex !== index))}>Remove</Button>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full border-dashed border-white/10 hover:bg-white/5" onClick={() => setStrengths((current) => [...current, { topic: "New Strength", level: 0 }])}>Add Strength</Button>
                      </div>
                      <div className="space-y-4">
                        <p className="text-xs font-black uppercase tracking-widest text-amber-500">Weak Areas</p>
                        {weaknesses.map((item, index) => (
                          <div key={`${item.topic}-${index}`} className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-3">
                            <Input value={item.topic} onChange={(e) => setWeaknesses((current) => current.map((entry, itemIndex) => itemIndex === index ? { ...entry, topic: e.target.value } : entry))} className="bg-black/20 border-white/10" />
                            <Input type="number" value={item.level} onChange={(e) => setWeaknesses((current) => current.map((entry, itemIndex) => itemIndex === index ? { ...entry, level: Number(e.target.value || 0) } : entry))} className="bg-black/20 border-white/10" />
                            <Button variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => setWeaknesses((current) => current.filter((_, itemIndex) => itemIndex !== index))}>Remove</Button>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full border-dashed border-white/10 hover:bg-white/5" onClick={() => setWeaknesses((current) => [...current, { topic: "New Weakness", level: 0 }])}>Add Weakness</Button>
                      </div>
                    </div>
                    <DialogFooter>
                      <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                      <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                      <DialogClose render={<Button type="button" onClick={() => { saveStrengthWeakness(); }} />}>Save</DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </AdminOnly>
            </div>
            <CardDescription>AI-powered analysis of your coding profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <p className="text-xs font-black text-emerald-500 uppercase tracking-widest">Top Strengths</p>
                {strengths.map((item, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span>{item.topic}</span>
                      <span>{item.level}%</span>
                    </div>
                    <div className="h-1 w-full bg-emerald-500/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.level}%` }}
                        className="h-full bg-emerald-500" 
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <p className="text-xs font-black text-amber-500 uppercase tracking-widest">Weak Areas</p>
                {weaknesses.map((item, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span>{item.topic}</span>
                      <span>{item.level}%</span>
                    </div>
                    <div className="h-1 w-full bg-amber-500/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.level}%` }}
                        className="h-full bg-amber-500" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit border-none bg-indigo-600 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Activity className="h-24 w-24" />
          </div>
          <CardHeader className="relative z-10">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-lg">{sectionTitles.recommendation}</CardTitle>
              <AdminOnly>
                <Dialog>
                  <DialogTrigger render={<Button variant="secondary" size="sm" className="bg-white/10 text-white hover:bg-white/20 border-none" />}>Edit</DialogTrigger>
                  <DialogContent className="sm:max-w-2xl bg-card/95 border-white/10 text-foreground">
                    <DialogHeader><DialogTitle>Edit Recommendation</DialogTitle></DialogHeader>
                    <div className="space-y-4 mb-4">
                       <Input value={sectionTitles.recommendation} onChange={e => updateSectionTitle("recommendation", e.target.value)} placeholder="Section Title" className="bg-black/20 border-white/10" />
                    </div>
                    <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                      {recommendations.map((task, index) => (
                        <div key={`${task}-${index}`} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                          <Textarea value={task} onChange={(e) => setRecommendations((current) => current.map((item, itemIndex) => itemIndex === index ? e.target.value : item))} className="min-h-20 bg-black/20 border-white/10" />
                          <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => setRecommendations((current) => current.filter((_, itemIndex) => itemIndex !== index))}>
                            <AlertCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full border-dashed border-white/10 hover:bg-white/5" onClick={() => setRecommendations((current) => [...current, "New recommendation"])}>
                        Add Recommendation
                      </Button>
                    </div>
                    <DialogFooter>
                      <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                      <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                      <DialogClose render={<Button type="button" onClick={() => { saveRecommendations(); }} />}>Save</DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </AdminOnly>
            </div>
            <CardDescription className="text-indigo-100">Personalized roadmap for next week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <div className="space-y-3">
              {recommendations.map((task, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 h-4 w-4 rounded-full border-2 border-white/30 flex items-center justify-center shrink-0">
                    <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  </div>
                  <span className="text-sm font-medium">{task}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
