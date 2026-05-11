import * as React from "react";
import {
  Users,
  Trophy,
  Zap,
  Calendar,
  Plus,
  CheckCircle2,
  TrendingUp,
  Brain,
  ArrowRight,
  Edit3,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { studentData } from "@/src/data/mockData";
import { AdminOnly } from "@/src/lib/admin";
import { motion } from "motion/react";

const CLUBS_TITLES_KEY = "portfolio-clubs-titles";
const CLUBS_STORAGE_KEYS = {
  stats: "clubs-stats",
  clubs: "clubs-memberships",
  achievements: "clubs-achievements",
  competencies: "clubs-competencies",
  recruiterTip: "clubs-recruiter-tip",
  participation: "clubs-participation",
} as const;

export default function Clubs() {
  const [stats, setStats] = React.useState([
    { title: "Leadership Roles", value: "2", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Total Awards", value: "4", icon: Trophy, color: "text-amber-500", bg: "bg-amber-500/10" },
    { title: "Event Impact", value: "500+", icon: Zap, color: "text-purple-500", bg: "bg-purple-500/10" },
  ]);
  const [clubs, setClubs] = React.useState(studentData.clubs);
  const [achievements, setAchievements] = React.useState(studentData.achievements);
  const [competencies, setCompetencies] = React.useState([
    { label: "Leadership", value: 85 },
    { label: "Collaboration", value: 92 },
    { label: "Public Speaking", value: 75 },
  ]);
  const [recruiterTip, setRecruiterTip] = React.useState(
    'Your role in the Geo Spatial Club demonstrates strong technical leadership. Highlight the 40% engagement increase in your interviews to showcase data-driven impact.'
  );
  const [participationHistory, setParticipationHistory] = React.useState([
    { title: "Google HashCode 2023", role: "Participant" },
    { title: "College Tech Fest", role: "Event Coordinator" },
    { title: "Hacktoberfest 2022", role: "Open Source Contributor" },
    { title: "Inter-College Cricket", role: "Runner Up" },
  ]);
  const [saveMessage, setSaveMessage] = React.useState("");

  const [sectionTitles, setSectionTitles] = React.useState({
    header: "Clubs & Achievements",
    headerSub: "Leadership roles, extracurricular activities, and notable awards",
    statsTitle: "Highlights",
    clubsTitle: "Club Memberships",
    achievementsTitle: "Achievement Timeline",
    aiInsightsTitle: "AI Impact Insights",
    aiInsightsSub: "Quantifying your leadership value",
    participationTitle: "Participation History",
  });
  
  const updateSectionTitle = (key, value) => {
    setSectionTitles(prev => {
      const next = { ...prev, [key]: value };
      window.localStorage.setItem(CLUBS_TITLES_KEY, JSON.stringify(next));
      return next;
    });
    markSaved("Section title saved");
  };

  React.useEffect(() => {
    const savedTitles = localStorage.getItem(CLUBS_TITLES_KEY);
    const savedStats = localStorage.getItem(CLUBS_STORAGE_KEYS.stats);
    const savedClubs = localStorage.getItem(CLUBS_STORAGE_KEYS.clubs);
    const savedAchievements = localStorage.getItem(CLUBS_STORAGE_KEYS.achievements);
    const savedCompetencies = localStorage.getItem(CLUBS_STORAGE_KEYS.competencies);
    const savedRecruiterTip = localStorage.getItem(CLUBS_STORAGE_KEYS.recruiterTip);
    const savedParticipation = localStorage.getItem(CLUBS_STORAGE_KEYS.participation);

    if (savedTitles) {
      try { setSectionTitles((current) => ({ ...current, ...JSON.parse(savedTitles) })); } catch {}
    }
    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats);
        setStats((current) =>
          parsed.map((item: any, index: number) => ({ ...current[index % current.length], ...item, icon: current[index % current.length]?.icon || Users }))
        );
      } catch {}
    }
    if (savedClubs) {
      try { setClubs(JSON.parse(savedClubs)); } catch {}
    }
    if (savedAchievements) {
      try { setAchievements(JSON.parse(savedAchievements)); } catch {}
    }
    if (savedCompetencies) {
      try { setCompetencies(JSON.parse(savedCompetencies)); } catch {}
    }
    if (savedRecruiterTip) {
      setRecruiterTip(savedRecruiterTip);
    }
    if (savedParticipation) {
      try { setParticipationHistory(JSON.parse(savedParticipation)); } catch {}
    }
  }, []);

  const markSaved = (message: string) => {
    setSaveMessage(message);
    window.setTimeout(() => setSaveMessage(""), 2000);
  };

  const saveStats = () => {
    localStorage.setItem(CLUBS_STORAGE_KEYS.stats, JSON.stringify(stats.map(({ title, value, color, bg }) => ({ title, value, color, bg }))));
    markSaved("Stats saved");
  };

  const saveClubs = () => {
    localStorage.setItem(CLUBS_STORAGE_KEYS.clubs, JSON.stringify(clubs));
    markSaved("Club entries saved");
  };

  const saveAchievements = () => {
    localStorage.setItem(CLUBS_STORAGE_KEYS.achievements, JSON.stringify(achievements));
    markSaved("Achievements saved");
  };

  const saveInsights = () => {
    localStorage.setItem(CLUBS_STORAGE_KEYS.competencies, JSON.stringify(competencies));
    localStorage.setItem(CLUBS_STORAGE_KEYS.recruiterTip, recruiterTip);
    markSaved("Insights saved");
  };

  const saveParticipation = () => {
    localStorage.setItem(CLUBS_STORAGE_KEYS.participation, JSON.stringify(participationHistory));
    markSaved("Participation history saved");
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">{sectionTitles.header}</h1>
          <p className="text-muted-foreground">{sectionTitles.headerSub}</p>
        </div>
        <div className="flex gap-2">
          <AdminOnly>
            <Dialog>
              <DialogTrigger render={<Button variant="outline" className="gap-2 border-white/10 bg-white/5" />}>
                <Edit3 className="h-4 w-4" /> Edit Header
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg bg-card/95 border-white/10">
                <DialogHeader><DialogTitle>Edit Page Header</DialogTitle></DialogHeader>
                <div className="space-y-4">
                  <Input value={sectionTitles.header} onChange={(e) => updateSectionTitle("header", e.target.value)} className="bg-black/20 border-white/10" placeholder="Header title" />
                  <Textarea value={sectionTitles.headerSub} onChange={(e) => updateSectionTitle("headerSub", e.target.value)} className="min-h-24 bg-black/20 border-white/10" placeholder="Header subtitle" />
                </div>
                <DialogFooter>
                  <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                  <DialogClose render={<Button type="button">Close</Button>}>Close</DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger render={<Button className="gap-2 bg-blue-600 hover:bg-blue-700" />}>
                <Plus className="h-4 w-4" /> Add Entry
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl bg-card/95 border-white/10">
                <DialogHeader><DialogTitle>Where do you want to add?</DialogTitle></DialogHeader>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="font-bold text-premium">Club Memberships</p>
                    <p className="mt-1 text-sm text-muted-foreground">Use the Clubs editor to add a new club role and contribution.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="font-bold text-premium">Achievement Timeline</p>
                    <p className="mt-1 text-sm text-muted-foreground">Use the Achievements editor to add a new award or milestone.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="font-bold text-premium">AI Impact Insights</p>
                    <p className="mt-1 text-sm text-muted-foreground">Add competencies or update the recruiter tip in the insights editor.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="font-bold text-premium">Participation History</p>
                    <p className="mt-1 text-sm text-muted-foreground">Add hackathons, events, or competitions in the participation editor.</p>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose render={<Button type="button">Close</Button>}>Close</DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </AdminOnly>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold tracking-tight">{sectionTitles.statsTitle}</h2>
        <AdminOnly>
          <Dialog>
            <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>Rename</DialogTrigger>
            <DialogContent className="sm:max-w-md bg-card/95 border-white/10">
              <DialogHeader><DialogTitle>Edit Stats Title</DialogTitle></DialogHeader>
              <Input value={sectionTitles.statsTitle} onChange={(e) => updateSectionTitle("statsTitle", e.target.value)} className="bg-black/20 border-white/10" />
              <DialogFooter>
                <DialogClose render={<Button type="button">Close</Button>}>Close</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </AdminOnly>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div key={`${stat.title}-${i}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
            <Card className="border-none bg-card/50 backdrop-blur-xl shadow-sm">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.title}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <AdminOnly>
        <Dialog>
          <DialogTrigger render={<Button variant="outline" className="border-white/10 bg-white/5" />}>Edit Stats</DialogTrigger>
          <DialogContent className="sm:max-w-2xl bg-card/95 border-white/10">
            <DialogHeader><DialogTitle>Edit Club Stats</DialogTitle></DialogHeader>
            <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
              {stats.map((stat, index) => (
                <div key={`${stat.title}-${index}`} className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-3">
                  <Input value={stat.title} onChange={(e) => setStats((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, title: e.target.value } : item))} className="bg-black/20 border-white/10" />
                  <Input value={stat.value} onChange={(e) => setStats((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, value: e.target.value } : item))} className="bg-black/20 border-white/10" />
                  <Button variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => setStats((current) => current.filter((_, itemIndex) => itemIndex !== index))}>Remove</Button>
                </div>
              ))}
              <Button variant="outline" className="w-full border-dashed border-white/10 hover:bg-white/5" onClick={() => setStats((current) => [...current, { title: "New Stat", value: "0", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" }])}>Add Stat</Button>
            </div>
            <DialogFooter>
              <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
              <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
              <DialogClose render={<Button type="button" onClick={saveStats} />}>Save</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AdminOnly>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" /> {sectionTitles.clubsTitle}
              </h2>
              <AdminOnly>
                <Dialog>
                  <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>Edit</DialogTrigger>
                  <DialogContent className="sm:max-w-3xl bg-card/95 border-white/10">
                    <DialogHeader><DialogTitle>Edit Club Memberships</DialogTitle></DialogHeader>
                    <div className="mb-4">
                      <Input value={sectionTitles.clubsTitle} onChange={(e) => updateSectionTitle("clubsTitle", e.target.value)} className="bg-black/20 border-white/10" placeholder="Section title" />
                    </div>
                    <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                      {clubs.map((club: any, index: number) => (
                        <div key={`${club.name}-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                          <div className="grid gap-3 md:grid-cols-3">
                            <Input value={club.name} onChange={(e) => setClubs((current) => current.map((item: any, itemIndex: number) => itemIndex === index ? { ...item, name: e.target.value } : item))} className="bg-black/20 border-white/10" />
                            <Input value={club.role} onChange={(e) => setClubs((current) => current.map((item: any, itemIndex: number) => itemIndex === index ? { ...item, role: e.target.value } : item))} className="bg-black/20 border-white/10" />
                            <Input value={club.duration} onChange={(e) => setClubs((current) => current.map((item: any, itemIndex: number) => itemIndex === index ? { ...item, duration: e.target.value } : item))} className="bg-black/20 border-white/10" />
                          </div>
                          <Textarea value={club.contribution} onChange={(e) => setClubs((current) => current.map((item: any, itemIndex: number) => itemIndex === index ? { ...item, contribution: e.target.value } : item))} className="min-h-24 bg-black/20 border-white/10" />
                          <Input value={club.impact} onChange={(e) => setClubs((current) => current.map((item: any, itemIndex: number) => itemIndex === index ? { ...item, impact: e.target.value } : item))} className="bg-black/20 border-white/10" />
                          <Input value={club.skills.join(", ")} onChange={(e) => setClubs((current) => current.map((item: any, itemIndex: number) => itemIndex === index ? { ...item, skills: e.target.value.split(",").map((skill) => skill.trim()).filter(Boolean) } : item))} className="bg-black/20 border-white/10" />
                          <Button variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => setClubs((current) => current.filter((_: any, itemIndex: number) => itemIndex !== index))}><Trash2 className="mr-2 h-4 w-4" /> Remove Club</Button>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full border-dashed border-white/10 hover:bg-white/5" onClick={() => setClubs((current) => [...current, { name: "New Club", role: "Member", duration: "2026", contribution: "Describe contribution", impact: "Describe impact", skills: [] }])}><Plus className="mr-2 h-4 w-4" /> Add Club</Button>
                    </div>
                    <DialogFooter>
                      <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                      <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                      <DialogClose render={<Button type="button" onClick={saveClubs} />}>Save</DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </AdminOnly>
            </div>

            <div className="grid gap-6">
              {clubs.map((club: any, i: number) => (
                <motion.div key={`${club.name}-${i}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className="border-none bg-card/50 backdrop-blur-xl shadow-sm hover:shadow-md transition-all group overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-xl font-bold group-hover:text-blue-500 transition-colors">{club.name}</CardTitle>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{club.duration}</span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-none font-bold">{club.role}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground leading-relaxed">{club.contribution}</p>
                        <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/10 flex items-center gap-3">
                          <TrendingUp className="h-4 w-4 text-blue-500" />
                          <p className="text-xs font-medium text-blue-700 dark:text-blue-300"><span className="font-bold">Impact:</span> {club.impact}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {club.skills.map((skill: string, si: number) => (
                          <Badge key={si} variant="outline" className="text-[10px] border-blue-500/20 text-blue-600 bg-blue-500/5">{skill}</Badge>
                        ))}
                      </div>

                      <Separator className="bg-border/50" />

                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {[1, 2, 3, 4].map((_, memberIndex) => (
                            <div key={memberIndex} className="h-8 w-8 rounded-full border-2 border-background bg-accent flex items-center justify-center text-[10px] font-bold overflow-hidden">
                              <img src={`https://picsum.photos/seed/user${memberIndex}/32/32`} alt="Member" referrerPolicy="no-referrer" />
                            </div>
                          ))}
                          <div className="h-8 w-8 rounded-full border-2 border-background bg-accent flex items-center justify-center text-[10px] font-bold text-muted-foreground">+12</div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs h-8 gap-2 hover:bg-blue-500/10 hover:text-blue-500">
                          Project Gallery <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" /> {sectionTitles.achievementsTitle}
              </h2>
              <AdminOnly>
                <Dialog>
                  <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>Edit</DialogTrigger>
                  <DialogContent className="sm:max-w-3xl bg-card/95 border-white/10">
                    <DialogHeader><DialogTitle>Edit Achievement Timeline</DialogTitle></DialogHeader>
                    <div className="mb-4">
                      <Input value={sectionTitles.achievementsTitle} onChange={(e) => updateSectionTitle("achievementsTitle", e.target.value)} className="bg-black/20 border-white/10" placeholder="Section title" />
                    </div>
                    <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                      {achievements.map((achievement: any, index: number) => (
                        <div key={`${achievement.title}-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                          <div className="grid gap-3 md:grid-cols-3">
                            <Input value={achievement.title} onChange={(e) => setAchievements((current) => current.map((item: any, itemIndex: number) => itemIndex === index ? { ...item, title: e.target.value } : item))} className="bg-black/20 border-white/10" />
                            <Input value={achievement.date} onChange={(e) => setAchievements((current) => current.map((item: any, itemIndex: number) => itemIndex === index ? { ...item, date: e.target.value } : item))} className="bg-black/20 border-white/10" />
                            <Input value={achievement.category} onChange={(e) => setAchievements((current) => current.map((item: any, itemIndex: number) => itemIndex === index ? { ...item, category: e.target.value } : item))} className="bg-black/20 border-white/10" />
                          </div>
                          <Textarea value={achievement.description} onChange={(e) => setAchievements((current) => current.map((item: any, itemIndex: number) => itemIndex === index ? { ...item, description: e.target.value } : item))} className="min-h-24 bg-black/20 border-white/10" />
                          <Button variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => setAchievements((current) => current.filter((_: any, itemIndex: number) => itemIndex !== index))}><Trash2 className="mr-2 h-4 w-4" /> Remove Achievement</Button>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full border-dashed border-white/10 hover:bg-white/5" onClick={() => setAchievements((current) => [...current, { title: "New Achievement", date: "2026", description: "Describe the achievement.", category: "Recognition" }])}><Plus className="mr-2 h-4 w-4" /> Add Achievement</Button>
                    </div>
                    <DialogFooter>
                      <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                      <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                      <DialogClose render={<Button type="button" onClick={saveAchievements} />}>Save</DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </AdminOnly>
            </div>
            <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-amber-500 before:via-blue-500 before:to-purple-500">
              {achievements.map((achievement: any, i: number) => (
                <motion.div key={`${achievement.title}-${i}`} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative">
                  <div className="absolute -left-[29px] top-1.5 h-6 w-6 rounded-full border-4 border-background bg-amber-500 shadow-sm z-10" />
                  <Card className="border-none bg-card/50 backdrop-blur-xl shadow-sm hover:shadow-md transition-all group">
                    <CardContent className="p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h3 className="font-bold text-base group-hover:text-amber-500 transition-colors">{achievement.title}</h3>
                        <Badge variant="outline" className="w-fit text-[10px] font-bold border-amber-500/20 text-amber-600 bg-amber-500/5">{achievement.date}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{achievement.description}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px] bg-accent/30 border-none">{achievement.category}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <Card className="border-none bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2"><Brain className="h-5 w-5" /> {sectionTitles.aiInsightsTitle}</CardTitle>
                <CardDescription className="text-blue-100">{sectionTitles.aiInsightsSub}</CardDescription>
              </div>
              <AdminOnly>
                <Dialog>
                  <DialogTrigger render={<Button variant="secondary" size="sm" className="bg-white/10 text-white border-none hover:bg-white/20" />}>Edit</DialogTrigger>
                  <DialogContent className="sm:max-w-2xl bg-card/95 border-white/10 text-foreground">
                    <DialogHeader><DialogTitle>Edit AI Impact Insights</DialogTitle></DialogHeader>
                    <div className="space-y-4 mb-4">
                      <Input value={sectionTitles.aiInsightsTitle} onChange={(e) => updateSectionTitle("aiInsightsTitle", e.target.value)} className="bg-black/20 border-white/10" placeholder="Section title" />
                      <Input value={sectionTitles.aiInsightsSub} onChange={(e) => updateSectionTitle("aiInsightsSub", e.target.value)} className="bg-black/20 border-white/10" placeholder="Section subtitle" />
                    </div>
                    <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                      {competencies.map((skill, index) => (
                        <div key={`${skill.label}-${index}`} className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-3">
                          <Input value={skill.label} onChange={(e) => setCompetencies((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, label: e.target.value } : item))} className="bg-black/20 border-white/10" />
                          <Input type="number" value={skill.value} onChange={(e) => setCompetencies((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, value: Number(e.target.value || 0) } : item))} className="bg-black/20 border-white/10" />
                          <Button variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => setCompetencies((current) => current.filter((_, itemIndex) => itemIndex !== index))}>Remove</Button>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full border-dashed border-white/10 hover:bg-white/5" onClick={() => setCompetencies((current) => [...current, { label: "New Competency", value: 0 }])}><Plus className="mr-2 h-4 w-4" /> Add Competency</Button>
                      <Textarea value={recruiterTip} onChange={(e) => setRecruiterTip(e.target.value)} className="min-h-28 bg-black/20 border-white/10" />
                    </div>
                    <DialogFooter>
                      <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                      <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                      <DialogClose render={<Button type="button" onClick={saveInsights} />}>Save</DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </AdminOnly>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Core Competencies</p>
                  <div className="space-y-3">
                    {competencies.map((skill, i) => (
                      <div key={`${skill.label}-${i}`} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span>{skill.label}</span>
                          <span>{skill.value}%</span>
                        </div>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-white" style={{ width: `${skill.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Recruiter Tip</p>
                  <p className="text-xs leading-relaxed">{recruiterTip}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-card/50 backdrop-blur-xl shadow-sm">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold">{sectionTitles.participationTitle}</CardTitle>
              <AdminOnly>
                <Dialog>
                  <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>Edit</DialogTrigger>
                  <DialogContent className="sm:max-w-2xl bg-card/95 border-white/10">
                    <DialogHeader><DialogTitle>Edit Participation History</DialogTitle></DialogHeader>
                    <div className="mb-4">
                      <Input value={sectionTitles.participationTitle} onChange={(e) => updateSectionTitle("participationTitle", e.target.value)} className="bg-black/20 border-white/10" placeholder="Section title" />
                    </div>
                    <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                      {participationHistory.map((item, index) => (
                        <div key={`${item.title}-${index}`} className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-3">
                          <Input value={item.title} onChange={(e) => setParticipationHistory((current) => current.map((entry, itemIndex) => itemIndex === index ? { ...entry, title: e.target.value } : entry))} className="bg-black/20 border-white/10 md:col-span-2" />
                          <Input value={item.role} onChange={(e) => setParticipationHistory((current) => current.map((entry, itemIndex) => itemIndex === index ? { ...entry, role: e.target.value } : entry))} className="bg-black/20 border-white/10" />
                          <Button variant="ghost" className="text-destructive hover:bg-destructive/10 md:col-span-3" onClick={() => setParticipationHistory((current) => current.filter((_, itemIndex) => itemIndex !== index))}><Trash2 className="mr-2 h-4 w-4" /> Remove Entry</Button>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full border-dashed border-white/10 hover:bg-white/5" onClick={() => setParticipationHistory((current) => [...current, { title: "New Event", role: "Participant" }])}><Plus className="mr-2 h-4 w-4" /> Add Participation</Button>
                    </div>
                    <DialogFooter>
                      <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                      <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                      <DialogClose render={<Button type="button" onClick={saveParticipation} />}>Save</DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </AdminOnly>
            </CardHeader>
            <CardContent className="space-y-4">
              {participationHistory.map((item, i) => (
                <div key={`${item.title}-${i}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/30 transition-colors">
                  <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">{item.title}</p>
                    <p className="text-[10px] text-muted-foreground">{item.role}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
