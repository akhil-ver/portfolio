import * as React from "react";
import { 
  Award, 
  ExternalLink, 
  Calendar, 
  Search, 
  Filter,
  Plus,
  CheckCircle2,
  ShieldCheck,
  Brain,
  ArrowUpRight,
  Download,
  Share2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Edit3, Trash2 } from "lucide-react";
import { studentData } from "@/src/data/mockData";
import { AdminOnly } from "@/src/lib/admin";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Certifications() {
  const defaultCertificates = studentData.certifications;
  const [certs, setCerts] = React.useState(defaultCertificates);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [editingCert, setEditingCert] = React.useState<any>(null);
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [activePlatform, setActivePlatform] = React.useState("All");
  const [sectionTitles, setSectionTitles] = React.useState({
    header: "Certifications",
    headerSub: "Professional credentials and specialized training from global tech leaders.",
    learningPath: "Learning Path Progress",
    learningPathSub: "Courses currently in progress and upcoming milestones",
    aiInsights: "AI Learning Insights",
    aiInsightsSub: "Personalized certification roadmap"
  });
  const [learningPaths, setLearningPaths] = React.useState([
    { name: "Kubernetes for Developers", platform: "Udemy", progress: 65, icon: "☁️" },
    { name: "Advanced System Design", platform: "Educative", progress: 40, icon: "🏗️" },
    { name: "React Native Masterclass", platform: "Coursera", progress: 85, icon: "📱" }
  ]);
  const [aiInsights, setAiInsights] = React.useState({
    recommendedTitle: "Google Cloud Professional Cloud Architect",
    recommendedSub: "Aligns with your interest in Cloud Quiz System and AWS certifications.",
    skills: ["Cloud Security", "NLP", "Full Stack", "Generative AI", "DSA"],
    readiness: 78
  });
  
  const [saveMessage, setSaveMessage] = React.useState("");

  const markSaved = (msg) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(""), 2000);
  };

  const updateSectionTitle = (key, value) => {
    setSectionTitles(prev => {
      const next = { ...prev, [key]: value };
      localStorage.setItem("portfolio-certs-titles", JSON.stringify(next));
      return next;
    });
  };

  const saveLearningPaths = () => {
    localStorage.setItem("portfolio-certs-learning", JSON.stringify(learningPaths));
    markSaved("Learning paths saved");
  };

  const saveAiInsights = () => {
    localStorage.setItem("portfolio-certs-insights", JSON.stringify(aiInsights));
    markSaved("AI Insights saved");
  };

  React.useEffect(() => {
    const saved = localStorage.getItem("portfolio-certs");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const defaultFor = (savedCert: any) =>
          defaultCertificates.find(
            (defaultCert) =>
              defaultCert.id === savedCert.id || defaultCert.name === savedCert.name
          );
        const refreshedSaved = parsed
          .filter(
            (savedCert: any) =>
              savedCert.name !== "Job Role in Cloud" &&
              savedCert.link !== "/certificates/job-role-in-cloud.pdf"
          )
          .map((savedCert: any) => {
            const defaultCert = defaultFor(savedCert);
            return defaultCert ? { ...savedCert, ...defaultCert } : savedCert;
          });
        const merged = [
          ...refreshedSaved,
          ...defaultCertificates.filter(
            (defaultCert) =>
              !refreshedSaved.some(
                (savedCert: any) =>
                  savedCert.id === defaultCert.id || savedCert.name === defaultCert.name
              )
          ),
        ];
        setCerts(merged);
        localStorage.setItem("portfolio-certs", JSON.stringify(merged));
      } catch(e) {}
    }
    const savedTitles = localStorage.getItem("portfolio-certs-titles");
    if (savedTitles) {
      try { setSectionTitles(prev => ({ ...prev, ...JSON.parse(savedTitles) })); } catch(e) {}
    }
    const savedLearning = localStorage.getItem("portfolio-certs-learning");
    if (savedLearning) {
      try { setLearningPaths(JSON.parse(savedLearning)); } catch(e) {}
    }
    const savedInsights = localStorage.getItem("portfolio-certs-insights");
    if (savedInsights) {
      try { setAiInsights(JSON.parse(savedInsights)); } catch(e) {}
    }
  }, [defaultCertificates]);

  const saveCerts = (newCerts: any[]) => {
    setCerts(newCerts);
    localStorage.setItem("portfolio-certs", JSON.stringify(newCerts));
  };

  const handleAddCert = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCert = {
      id: Date.now(),
      name: formData.get('name') as string,
      platform: formData.get('platform') as string,
      date: formData.get('date') as string,
      link: formData.get('link') as string,
      image: formData.get('image') as string,
      skills: (formData.get('skills') as string).split(',').map(s => s.trim()).filter(Boolean),
      verified: true
    };
    saveCerts([newCert, ...certs]);
  };

  const handleEditCert = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updated = certs.map(c => {
      if (c.id === id) {
        return {
          ...c,
          name: formData.get('name') as string,
          platform: formData.get('platform') as string,
          date: formData.get('date') as string,
          link: formData.get('link') as string,
          image: formData.get('image') as string,
          skills: (formData.get('skills') as string).split(',').map(s => s.trim()).filter(Boolean)
        };
      }
      return c;
    });
    saveCerts(updated);
  };

  const handleDeleteCert = (id: number) => {
    if(window.confirm("Are you sure you want to delete this certification?")) {
      saveCerts(certs.filter(c => c.id !== id));
    }
  };

  const handleShareCert = async (cert: any) => {
    const shareUrl = cert.link?.startsWith("http")
      ? cert.link
      : `${window.location.origin}${cert.link || ""}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: cert.name,
          text: `${cert.name} by ${cert.platform}`,
          url: shareUrl,
        });
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        window.alert("Certificate link copied to clipboard.");
        return;
      }
    } catch {
      // fall through to prompt
    }

    window.prompt("Copy your certificate link:", shareUrl);
  };


  const filteredCerts = certs.filter(cert => 
    (cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))) &&
    (activePlatform === "All" || cert.platform === activePlatform)
  );

  const platforms = ["All", ...Array.from(new Set(certs.map((cert) => cert.platform)))];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">{sectionTitles.header}</h1>
          <p className="text-muted-foreground">{sectionTitles.headerSub}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 border-indigo-500/20 hover:bg-indigo-500/5">
            <Download className="h-4 w-4" /> Export List
          </Button>
          <AdminOnly>
            <Dialog>
              <DialogTrigger render={
                <Button variant="outline" className="gap-2 border-indigo-500/20 hover:bg-indigo-500/5">
                  <Edit3 className="h-4 w-4" /> Edit Header
                </Button>
              } />
              <DialogContent className="sm:max-w-md bg-card/95 border-white/10">
                <DialogHeader><DialogTitle>Edit Header</DialogTitle></DialogHeader>
                <div className="space-y-4">
                  <Input value={sectionTitles.header} onChange={e => updateSectionTitle("header", e.target.value)} placeholder="Title" className="bg-black/20 border-white/10" />
                  <Input value={sectionTitles.headerSub} onChange={e => updateSectionTitle("headerSub", e.target.value)} placeholder="Subtitle" className="bg-black/20 border-white/10" />
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700" onClick={() => setIsAddOpen(true)}>
                <Plus className="h-4 w-4" /> Add Certification
              </Button>
              <DialogContent className="sm:max-w-md bg-card/95 border-white/10">
                <DialogHeader><DialogTitle>Add Certification</DialogTitle></DialogHeader>
                <form onSubmit={(e) => { handleAddCert(e); setIsAddOpen(false); e.currentTarget.reset(); }} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Certification Name</Label>
                    <Input name="name" required className="bg-black/20 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Platform / Issuer</Label>
                    <Input name="platform" required className="bg-black/20 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input name="date" required className="bg-black/20 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Credential Link</Label>
                    <Input name="link" className="bg-black/20 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Image URL (optional)</Label>
                    <Input name="image" className="bg-black/20 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Skills (comma separated)</Label>
                    <Input name="skills" className="bg-black/20 border-white/10" />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save Certification</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </AdminOnly>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search certifications, skills, or platforms..." 
            className="pl-10 bg-card/50 border-none focus-visible:ring-indigo-500/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative min-w-[220px]">
          <Button
            variant="outline"
            className="w-full justify-between gap-2 border-white/10 bg-card/50"
            onClick={() => setIsFilterOpen((open) => !open)}
          >
            <span className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-indigo-500" />
              Filters
            </span>
            <span className="text-xs font-bold text-muted-foreground">{activePlatform}</span>
          </Button>
          {isFilterOpen && (
            <div className="absolute right-0 top-14 z-20 min-w-[220px] rounded-2xl border border-white/10 bg-card/95 p-3 backdrop-blur-xl shadow-xl">
              <div className="mb-3 flex items-center gap-2 px-2">
                <Filter className="h-4 w-4 text-indigo-500" />
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Filters</p>
              </div>
              <div className="space-y-1">
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => {
                      setActivePlatform(platform);
                      setIsFilterOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-bold transition-colors ${
                      activePlatform === platform
                        ? "bg-indigo-500/15 text-indigo-500"
                        : "text-muted-foreground hover:bg-white/5 hover:text-premium"
                    }`}
                  >
                    <span>{platform}</span>
                    {activePlatform === platform && <span className="text-[10px] font-black uppercase tracking-widest">Active</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredCerts.map((cert, i) => {
          const isLocalCertificatePreview = Boolean(cert.image && cert.image.startsWith("/certificates/"));

          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <TiltCard className="h-full">
                <Card className="group h-full border-none bg-card/50 backdrop-blur-xl shadow-sm hover:shadow-xl transition-all overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 z-20 flex gap-2">
                   <AdminOnly>
                     <Button size="icon" variant="secondary" className="h-6 w-6 rounded bg-black/40 hover:bg-black/60 border-none text-white backdrop-blur-md" onClick={() => setEditingCert(cert)}>
                       <Edit3 className="h-3 w-3" />
                     </Button>
                     <Button size="icon" variant="secondary" className="h-6 w-6 rounded bg-red-500/40 hover:bg-red-500/60 border-none text-white backdrop-blur-md" onClick={() => handleDeleteCert(cert.id)}>
                       <Trash2 className="h-3 w-3" />
                     </Button>
                   </AdminOnly>
                   <Badge className="bg-emerald-500/10 text-emerald-500 border-none gap-1.5 backdrop-blur-md">
                      <ShieldCheck className="h-3 w-3" /> Verified
                   </Badge>
                </div>
                
                <div className="h-48 w-full overflow-hidden relative bg-black/40 flex items-center justify-center p-2">
                  {cert.image ? (
                    <img 
                      src={cert.image} 
                      alt={cert.name} 
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-colors duration-500" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-6">
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{cert.platform}</p>
                  </div>
                </div>

                <CardContent className="p-6 pt-2">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg leading-tight group-hover:text-indigo-500 transition-colors">{cert.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Issued {cert.date}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, si) => (
                        <Badge key={si} variant="secondary" className="text-[10px] bg-indigo-500/5 text-indigo-500 border-none">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-4 border-t border-border/50">
                      <Button variant="ghost" size="sm" className="h-8 text-xs gap-2 hover:bg-indigo-500/10 hover:text-indigo-500" onClick={() => handleShareCert(cert)}>
                        <Share2 className="h-3.5 w-3.5" /> Share
                      </Button>
                      <div className="flex items-center gap-2">
                        <a
                          href={cert.link}
                          download={!cert.link?.startsWith("http")}
                          className={buttonVariants({ variant: "outline", className: "h-8 border-white/10 px-3 text-xs font-bold" })}
                        >
                          <Download className="h-3.5 w-3.5" /> Download
                        </a>
                        <a 
                          href={cert.link} target="_blank" rel="noreferrer"
                          className={buttonVariants({ variant: "link", className: "h-8 p-0 text-xs font-bold text-indigo-500 gap-1" })}
                        >
                          View Credential <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TiltCard>
            </motion.div>
          );
        })}
      </div>

      <AdminOnly>
        <Dialog open={Boolean(editingCert)} onOpenChange={(open) => !open && setEditingCert(null)}>
          <DialogContent className="sm:max-w-md bg-card/95 border-white/10">
            <DialogHeader><DialogTitle>Edit Certification</DialogTitle></DialogHeader>
            {editingCert && (
              <form
                onSubmit={(e) => {
                  handleEditCert(e, editingCert.id);
                  setEditingCert(null);
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Certification Name</Label>
                  <Input name="name" defaultValue={editingCert.name} required className="bg-black/20 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Platform / Issuer</Label>
                  <Input name="platform" defaultValue={editingCert.platform} required className="bg-black/20 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input name="date" defaultValue={editingCert.date} required className="bg-black/20 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Credential Link</Label>
                  <Input name="link" defaultValue={editingCert.link} className="bg-black/20 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input name="image" defaultValue={editingCert.image} className="bg-black/20 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Skills (comma separated)</Label>
                  <Input name="skills" defaultValue={editingCert.skills.join(", ")} className="bg-black/20 border-white/10" />
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      handleDeleteCert(editingCert.id);
                      setEditingCert(null);
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                  <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </AdminOnly>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-none bg-card/50 backdrop-blur-xl shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-lg">{sectionTitles.learningPath}</CardTitle>
              <AdminOnly>
                <Dialog>
                  <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5">Edit</Button>} />
                  <DialogContent className="sm:max-w-2xl bg-card/95 border-white/10">
                    <DialogHeader><DialogTitle>Edit Learning Path</DialogTitle></DialogHeader>
                    <div className="space-y-4 mb-4">
                       <Input value={sectionTitles.learningPath} onChange={e => updateSectionTitle("learningPath", e.target.value)} placeholder="Title" className="bg-black/20 border-white/10" />
                       <Input value={sectionTitles.learningPathSub} onChange={e => updateSectionTitle("learningPathSub", e.target.value)} placeholder="Subtitle" className="bg-black/20 border-white/10" />
                    </div>
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                      {learningPaths.map((path, index) => (
                        <div key={index} className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-4">
                          <Input value={path.name} onChange={e => setLearningPaths(cur => cur.map((item, i) => i === index ? {...item, name: e.target.value} : item))} placeholder="Course Name" className="bg-black/20 border-white/10" />
                          <Input value={path.platform} onChange={e => setLearningPaths(cur => cur.map((item, i) => i === index ? {...item, platform: e.target.value} : item))} placeholder="Platform" className="bg-black/20 border-white/10" />
                          <Input type="number" value={path.progress} onChange={e => setLearningPaths(cur => cur.map((item, i) => i === index ? {...item, progress: Number(e.target.value)} : item))} placeholder="Progress %" className="bg-black/20 border-white/10" />
                          <div className="flex gap-2">
                             <Input value={path.icon} onChange={e => setLearningPaths(cur => cur.map((item, i) => i === index ? {...item, icon: e.target.value} : item))} placeholder="Icon" className="bg-black/20 border-white/10 w-16" />
                             <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setLearningPaths(cur => cur.filter((_, i) => i !== index))}><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full border-dashed border-white/10" onClick={() => setLearningPaths(cur => [...cur, {name: "New Course", platform: "Platform", progress: 0, icon: "📚"}])}>Add Course</Button>
                    </div>
                    <DialogFooter>
                      <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                      <DialogClose render={<Button variant="outline" className="border-white/10">Cancel</Button>} />
                      <Button onClick={saveLearningPaths}>Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </AdminOnly>
            </div>
            <CardDescription>{sectionTitles.learningPathSub}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             {learningPaths.map((course, i) => (
               <div key={i} className="space-y-3 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-indigo-500/30 transition-colors">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-xl">
                          {course.icon}
                        </div>
                        <div className="space-y-0.5">
                           <p className="text-sm font-bold">{course.name}</p>
                           <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{course.platform}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <span className="text-xs font-bold text-indigo-500">{course.progress}%</span>
                        <p className="text-[10px] text-muted-foreground">Estimated completion: 2 weeks</p>
                     </div>
                  </div>
                  <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" 
                     />
                  </div>
               </div>
             ))}
          </CardContent>
        </Card>

        <Card className="h-fit border-none bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-xl shadow-indigo-500/20">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="h-5 w-5" /> {sectionTitles.aiInsights}
              </CardTitle>
              <AdminOnly>
                <Dialog>
                  <DialogTrigger render={<Button variant="secondary" size="sm" className="bg-white/10 text-white hover:bg-white/20 border-none">Edit</Button>} />
                  <DialogContent className="sm:max-w-lg bg-card/95 border-white/10 text-foreground">
                    <DialogHeader><DialogTitle>Edit AI Insights</DialogTitle></DialogHeader>
                    <div className="space-y-4 mb-4">
                       <Input value={sectionTitles.aiInsights} onChange={e => updateSectionTitle("aiInsights", e.target.value)} placeholder="Title" className="bg-black/20 border-white/10" />
                       <Input value={sectionTitles.aiInsightsSub} onChange={e => updateSectionTitle("aiInsightsSub", e.target.value)} placeholder="Subtitle" className="bg-black/20 border-white/10" />
                    </div>
                    <div className="space-y-4">
                       <div className="space-y-2">
                          <Label>Recommended Next (Title)</Label>
                          <Input value={aiInsights.recommendedTitle} onChange={e => setAiInsights(cur => ({...cur, recommendedTitle: e.target.value}))} className="bg-black/20 border-white/10" />
                       </div>
                       <div className="space-y-2">
                          <Label>Recommended Next (Subtitle)</Label>
                          <Input value={aiInsights.recommendedSub} onChange={e => setAiInsights(cur => ({...cur, recommendedSub: e.target.value}))} className="bg-black/20 border-white/10" />
                       </div>
                       <div className="space-y-2">
                          <Label>Skills Gained (comma separated)</Label>
                          <Input value={aiInsights.skills.join(', ')} onChange={e => setAiInsights(cur => ({...cur, skills: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)}))} className="bg-black/20 border-white/10" />
                       </div>
                       <div className="space-y-2">
                          <Label>Certification Readiness %</Label>
                          <Input type="number" value={aiInsights.readiness} onChange={e => setAiInsights(cur => ({...cur, readiness: Number(e.target.value)}))} className="bg-black/20 border-white/10" />
                       </div>
                    </div>
                    <DialogFooter>
                      <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                      <DialogClose render={<Button variant="outline" className="border-white/10">Cancel</Button>} />
                      <Button onClick={saveAiInsights}>Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </AdminOnly>
            </div>
            <CardDescription className="text-indigo-100">{sectionTitles.aiInsightsSub}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
                <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Recommended Next</p>
                <p className="text-sm font-medium">{aiInsights.recommendedTitle}</p>
                <p className="text-[10px] mt-1 opacity-80">{aiInsights.recommendedSub}</p>
              </div>
              
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest opacity-70">Skills Gained</p>
                <div className="flex flex-wrap gap-2">
                  {aiInsights.skills.map((skill, i) => (
                    <Badge key={i} className="bg-white/20 text-white border-none text-[10px]">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium">Certification Readiness</span>
                  <span className="text-xs font-bold">{aiInsights.readiness}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white" style={{ width: `${aiInsights.readiness}%` }} />
                </div>
              </div>
            </div>
            
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
