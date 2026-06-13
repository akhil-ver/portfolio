import * as React from "react";
import { 
  Github, 
  ExternalLink, 
  Plus, 
  Search, 
  Filter,
  Code2,
  Layers,
  Globe,
  Rocket,
  Sparkles,
  BrainCircuit,
  Terminal,
  Cpu,
  Database,
  Cloud,
  Wrench,
  Layout,
  Zap,
  Star,
  Clock,
  ChevronRight,
  ArrowUpRight,
  Monitor,
  Smartphone,
  Server,
  ShieldCheck,
  SearchCode
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Edit3, Trash2 } from "lucide-react";
import { studentData } from "@/src/data/mockData";
import { AdminOnly } from "@/src/lib/admin";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

const PROJECTS_STORAGE_KEYS = {
  projects: "portfolio-projects",
  insights: "portfolio-project-insights",
  timeline: "portfolio-project-timeline",
  sectionTitles: "portfolio-project-titles",
  techStack: "portfolio-project-tech",
} as const;

function ProjectFormFields({ project }: { project?: any }) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label>Project Title</Label>
        <Input name="title" defaultValue={project?.title || ""} className="bg-white/5 border-white/10" required />
      </div>
      <div className="grid gap-2">
        <Label>Description</Label>
        <Textarea
          name="description"
          defaultValue={project?.description || ""}
          className="bg-white/5 border-white/10 min-h-28"
          required
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label>Category</Label>
          <Input name="category" defaultValue={project?.category || ""} className="bg-white/5 border-white/10" placeholder="AI/ML, Full Stack..." required />
        </div>
        <div className="grid gap-2">
          <Label>Complexity</Label>
          <Input name="complexity" defaultValue={project?.complexity || ""} className="bg-white/5 border-white/10" placeholder="Advanced" required />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label>Tech Stack</Label>
          <Input
            name="tech"
            defaultValue={project?.tech?.join(", ") || ""}
            className="bg-white/5 border-white/10"
            placeholder="React, Node.js, MongoDB"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label>Tech Depth %</Label>
          <Input name="depth" type="number" min="0" max="100" defaultValue={project?.depth ?? 80} className="bg-white/5 border-white/10" required />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label>Time Taken</Label>
          <Input name="time" defaultValue={project?.time || ""} className="bg-white/5 border-white/10" placeholder="2 Months" required />
        </div>
        <div className="grid gap-2">
          <Label>Status</Label>
          <Input name="status" defaultValue={project?.status || "Completed"} className="bg-white/5 border-white/10" placeholder="Completed" required />
        </div>
      </div>
      <div className="grid gap-2">
        <Label>Image Link</Label>
        <Input
          name="image"
          defaultValue={project?.image || ""}
          className="bg-white/5 border-white/10"
          placeholder="https://..."
          required
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label>GitHub Link</Label>
          <Input name="github" defaultValue={project?.github || ""} className="bg-white/5 border-white/10" placeholder="https://github.com/..." required />
        </div>
        <div className="grid gap-2">
          <Label>Demo Link</Label>
          <Input name="demo" defaultValue={project?.demo || ""} className="bg-white/5 border-white/10" placeholder="https://... or #" required />
        </div>
      </div>
      <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-premium">
        <input
          name="featured"
          type="checkbox"
          defaultChecked={Boolean(project?.featured)}
          className="h-4 w-4 accent-current"
        />
        Show as featured project
      </label>
    </div>
  );
}

function ProjectCard({ project, index, onEdit, onDelete }: { project: any, index: number, onEdit?: (p: any) => void, onDelete?: (id: number) => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative group"
    >
      <Card className="premium-card border-none overflow-hidden h-full flex flex-col group transition-all duration-500">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <AdminOnly>
              {onEdit && (
                <Button size="icon" variant="secondary" className="h-6 w-6 rounded bg-black/40 hover:bg-black/60 border-none text-white backdrop-blur-md" onClick={(e) => { e.preventDefault(); onEdit(project); }}>
                  <Edit3 className="h-3 w-3" />
                </Button>
              )}
              {onDelete && (
                <Button size="icon" variant="secondary" className="h-6 w-6 rounded bg-red-500/40 hover:bg-red-500/60 border-none text-white backdrop-blur-md" onClick={(e) => { e.preventDefault(); onDelete(project.id); }}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </AdminOnly>
            <Badge className={cn(
              "font-black text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-md border-none",
              project.complexity === "Advanced" ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"
            )}>
              {project.complexity}
            </Badge>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest">{project.category}</p>
              <h3 className="text-lg font-black text-white tracking-tight">{project.title}</h3>
            </div>
          </div>
        </div>

        <CardContent className="p-6 flex-1 space-y-4">
          <p className="text-sm text-muted-foreground font-medium leading-relaxed line-clamp-3">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <Badge key={t} variant="secondary" className="bg-white/5 text-[10px] font-bold py-0.5 px-2 rounded-md border-white/5 text-muted-foreground">
                {t}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
              <Zap className="h-3 w-3 text-primary" />
              <div className="space-y-0.5">
                <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Tech Depth</p>
                <p className="text-xs font-bold text-premium">{project.depth}%</p>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
              <Clock className="h-3 w-3 text-secondary" />
              <div className="space-y-0.5">
                <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Time Taken</p>
                <p className="text-xs font-bold text-premium">{project.time}</p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0 flex gap-3">
          <a 
            href={project.github} target="_blank" rel="noreferrer"
            className={buttonVariants({ className: "flex-1 rounded-xl h-10 font-bold glow-primary" })}
          >
            <Github className="mr-2 h-4 w-4" /> Code
          </a>
          <a 
            href={project.demo !== "#" ? project.demo : undefined} 
            target={project.demo !== "#" ? "_blank" : undefined} 
            rel={project.demo !== "#" ? "noreferrer" : undefined}
            onClick={(e) => { if(project.demo === "#") { e.preventDefault(); alert("Demo link is not available yet."); } }}
            className={buttonVariants({ variant: "outline", className: "flex-1 rounded-xl h-10 font-bold border-white/10 hover:bg-white/5" })}
          >
            <Globe className="mr-2 h-4 w-4" /> Demo
          </a>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function Projects() {
  const [projects, setProjects] = React.useState(studentData.projects);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [projectInsights, setProjectInsights] = React.useState([
    "Strong focus on AI/ML + NLP-based systems with real-world utility.",
    "Balanced experience in full-stack and backend architecture.",
    "Ready for real-world scalable system development.",
  ]);
  const [projectTimeline, setProjectTimeline] = React.useState([
    { year: "2025-26", title: "AI/ML Systems", desc: "Advanced NLP models, Transformers, and scalable AI pipelines.", icon: "BrainCircuit", color: "text-primary" },
    { year: "2024", title: "Full Stack + Cloud", desc: "Complex web apps with AWS integration and real-time databases.", icon: "Cloud", color: "text-secondary" },
    { year: "2023", title: "Basic Web Apps", desc: "Foundational projects using HTML, CSS, and basic JavaScript.", icon: "Layout", color: "text-cyan-400" },
  ]);
  const [saveMessage, setSaveMessage] = React.useState("");

  const [sectionTitles, setSectionTitles] = React.useState({
    header: "Projects Portfolio",
    headerSub: "Showcasing my technical work, AI systems, and full-stack applications",
    featured: "Featured Masterpieces",
    tech: "Technologies I Use",
    insights: "Insights",
    dna: "Project DNA",
    dnaSub: "EduTrack Intelligence",
    timeline: "Development Timeline"
  });
  
  const updateSectionTitle = (key, value) => {
    setSectionTitles(prev => {
      const next = { ...prev, [key]: value };
      window.localStorage.setItem(PROJECTS_STORAGE_KEYS.sectionTitles, JSON.stringify(next));
      return next;
    });
  };

  const timelineIconMap = {
    BrainCircuit,
    Cloud,
    Layout,
    Rocket,
    Server,
    ShieldCheck,
    Monitor,
    Smartphone,
    Code2,
    Database,
    Cpu,
    Wrench,
  } as const;
  
  React.useEffect(() => {
    const saved = localStorage.getItem(PROJECTS_STORAGE_KEYS.projects);
    if (saved) {
      try { 
        const parsedSaved = JSON.parse(saved);
        const newProjects = studentData.projects.filter(p => !parsedSaved.some((sp: any) => sp.id === p.id));
        if (newProjects.length > 0) {
          const merged = [...newProjects, ...parsedSaved];
          setProjects(merged);
          localStorage.setItem(PROJECTS_STORAGE_KEYS.projects, JSON.stringify(merged));
        } else {
          setProjects(parsedSaved); 
        }
      } catch(e) {}
    }
    const savedInsights = localStorage.getItem(PROJECTS_STORAGE_KEYS.insights);
    if (savedInsights) {
      try { setProjectInsights(JSON.parse(savedInsights)); } catch(e) {}
    }
    const savedTimeline = localStorage.getItem(PROJECTS_STORAGE_KEYS.timeline);
    if (savedTimeline) {
      try { setProjectTimeline(JSON.parse(savedTimeline)); } catch(e) {}
    }
    const savedTitles = localStorage.getItem(PROJECTS_STORAGE_KEYS.sectionTitles);
    if (savedTitles) {
      try { setSectionTitles(JSON.parse(savedTitles)); } catch(e) {}
    }
    const savedTechStack = localStorage.getItem(PROJECTS_STORAGE_KEYS.techStack);
    if (savedTechStack) {
      try { setTechStack(JSON.parse(savedTechStack)); } catch(e) {}
    }
  }, []);

  const saveTechStack = (newTechStack: any[]) => {
    setTechStack(newTechStack);
    localStorage.setItem(PROJECTS_STORAGE_KEYS.techStack, JSON.stringify(newTechStack));
    setSaveMessage("Tech stack saved");
    window.setTimeout(() => setSaveMessage(""), 2000);
  };

  const saveProjects = (newProjects: any[]) => {
    setProjects(newProjects);
    localStorage.setItem(PROJECTS_STORAGE_KEYS.projects, JSON.stringify(newProjects));
    setSaveMessage("Projects saved");
    window.setTimeout(() => setSaveMessage(""), 2000);
  };

  const saveInsights = (newInsights: string[]) => {
    setProjectInsights(newInsights);
    localStorage.setItem(PROJECTS_STORAGE_KEYS.insights, JSON.stringify(newInsights));
    setSaveMessage("AI insights saved");
    window.setTimeout(() => setSaveMessage(""), 2000);
  };

  const saveTimeline = (newTimeline: typeof projectTimeline) => {
    setProjectTimeline(newTimeline);
    localStorage.setItem(PROJECTS_STORAGE_KEYS.timeline, JSON.stringify(newTimeline));
    setSaveMessage("Timeline saved");
    window.setTimeout(() => setSaveMessage(""), 2000);
  };

  const handleAddProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProject = {
      id: Date.now(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      tech: (formData.get('tech') as string).split(',').map(s => s.trim()).filter(Boolean),
      category: formData.get('category') as string,
      complexity: formData.get('complexity') as string,
      depth: parseInt(formData.get('depth') as string) || 80,
      time: formData.get('time') as string,
      status: (formData.get('status') as string) || "Completed",
      github: formData.get('github') as string,
      demo: formData.get('demo') as string,
      image: formData.get('image') as string,
      updated: "Recently",
      featured: formData.get('featured') === 'on'
    };
    saveProjects([newProject, ...projects]);
  };

  const handleEditProject = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedProjects = projects.map(p => {
      if (p.id === id) {
        return {
          ...p,
          title: formData.get('title') as string,
          description: formData.get('description') as string,
          tech: (formData.get('tech') as string).split(',').map(s => s.trim()).filter(Boolean),
          category: formData.get('category') as string,
          complexity: formData.get('complexity') as string,
          depth: parseInt(formData.get('depth') as string) || 80,
          time: formData.get('time') as string,
          status: (formData.get('status') as string) || p.status,
          github: formData.get('github') as string,
          demo: formData.get('demo') as string,
          image: formData.get('image') as string,
          featured: formData.get('featured') === 'on'
        };
      }
      return p;
    });
    saveProjects(updatedProjects);
  };

  const handleDeleteProject = (id: number) => {
    if(window.confirm("Are you sure you want to delete this project?")) {
      saveProjects(projects.filter(p => p.id !== id));
    }
  };

  const [editingProject, setEditingProject] = React.useState<any>(null);
  const [isAddOpen, setIsAddOpen] = React.useState(false);

  const [activeCategory, setActiveCategory] = React.useState("All");

  const categories = ["All", "AI/ML", "Full Stack", "System"];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredProjects = projects.filter(p => p.featured);

  const [techStack, setTechStack] = React.useState([
    { name: "React", icon: "Layout", color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { name: "Python", icon: "Terminal", color: "text-blue-400", bg: "bg-blue-500/10" },
    { name: "NLP", icon: "BrainCircuit", color: "text-purple-400", bg: "bg-purple-500/10" },
    { name: "AWS", icon: "Cloud", color: "text-amber-400", bg: "bg-amber-500/10" },
    { name: "Flask", icon: "Server", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { name: "SQL", icon: "Database", color: "text-indigo-400", bg: "bg-indigo-500/10" },
  ]);

  return (
    <div className="space-y-12 pb-20">
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
          <a 
            href="https://github.com/akhilverma07" target="_blank" rel="noreferrer"
            className={buttonVariants({ variant: "outline", className: "rounded-2xl h-12 px-6 font-bold border-white/10 hover:bg-white/5" })}
          >
            <Github className="mr-2 h-4 w-4" /> View GitHub
          </a>
          <AdminOnly>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <Button className="rounded-2xl h-12 px-6 font-bold glow-primary" onClick={() => setIsAddOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add New Project
              </Button>
              <DialogContent className="sm:max-w-2xl bg-card/95 backdrop-blur-xl border-white/10">
                <DialogHeader>
                  <DialogTitle className="text-premium">Add New Project</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    handleAddProject(e);
                    setIsAddOpen(false);
                    e.currentTarget.reset();
                  }}
                >
                  <ProjectFormFields />
                  <DialogFooter>
                    <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                    <Button type="submit" className="glow-primary">Save Project</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </AdminOnly>
        </div>
      </div>

      {/* Featured Projects */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2 w-full">
          <div className="flex items-center gap-3">
          <Star className="h-6 w-6 text-amber-400 fill-amber-400" />
            <h2 className="text-2xl font-black text-premium tracking-tight">{sectionTitles.featured}</h2>
          </div>
          <AdminOnly>
            <Dialog>
              <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5"><Edit3 className="mr-2 h-4 w-4" /> Edit Title</Button>} />
              <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-white/10">
                <DialogHeader><DialogTitle className="text-premium">Edit Featured Title</DialogTitle></DialogHeader>
                <Input value={sectionTitles.featured} onChange={e => updateSectionTitle("featured", e.target.value)} className="bg-black/20 border-white/10" />
              </DialogContent>
            </Dialog>
          </AdminOnly>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="premium-3d relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
              <Card className="premium-card border-none overflow-hidden relative bg-card/80 backdrop-blur-xl">
                <AdminOnly>
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded bg-black/40 hover:bg-black/60 border-none text-white backdrop-blur-md" onClick={() => setEditingProject(project)}>
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded bg-red-500/40 hover:bg-red-500/60 border-none text-white backdrop-blur-md" onClick={() => handleDeleteProject(project.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </AdminOnly>
                <div className="grid md:grid-cols-2 h-full">
                  <div className="relative h-full min-h-[250px] overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                  </div>
                  <div className="p-8 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <Badge className="bg-primary/10 text-primary border-none font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-lg">
                        Featured Project
                      </Badge>
                      <h3 className="text-2xl font-black text-premium tracking-tight leading-tight">{project.title}</h3>
                      <p className="text-sm text-muted-foreground font-medium leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map(t => (
                          <Badge key={t} variant="secondary" className="bg-white/5 text-[10px] font-bold py-1 px-3 rounded-lg">
                            {t}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2 w-full pt-2">
                        <a 
                          href={project.github} target="_blank" rel="noreferrer"
                          className={buttonVariants({ className: "flex-1 rounded-xl h-10 font-bold text-xs glow-primary" })}
                        >
                          <Github className="mr-2 h-3.5 w-3.5" /> Code
                        </a>
                        <a 
                          href={project.demo} target="_blank" rel="noreferrer"
                          className={buttonVariants({ variant: "outline", className: "flex-1 rounded-xl h-10 font-bold text-xs border-white/10 hover:bg-white/5" })}
                        >
                          <ExternalLink className="mr-2 h-3.5 w-3.5" /> Demo
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Search & Filters */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search projects or tech stack..." 
            className="pl-12 h-12 rounded-2xl bg-white/5 border-white/10 focus-visible:ring-primary/50 text-premium font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-xl h-10 px-6 font-bold transition-all",
                activeCategory === cat ? "glow-primary" : "border-white/10 bg-white/5 hover:bg-white/10"
              )}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onEdit={(currentProject) => setEditingProject(currentProject)}
              onDelete={handleDeleteProject}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Tech Stack Visualization */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2 w-full">
            <div className="flex items-center gap-3">
            <Cpu className="h-6 w-6 text-cyan-400" />
              <h2 className="text-2xl font-black text-premium tracking-tight">{sectionTitles.tech}</h2>
            </div>
            <AdminOnly>
              <Dialog>
                <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5"><Edit3 className="mr-2 h-4 w-4" /> Edit Tech Stack</Button>} />
                <DialogContent className="sm:max-w-2xl bg-card/95 backdrop-blur-xl border-white/10">
                  <DialogHeader><DialogTitle className="text-premium">Edit Technologies</DialogTitle></DialogHeader>
                  <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3 mb-4">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Section Title</p>
                      <Input value={sectionTitles.tech} onChange={e => updateSectionTitle("tech", e.target.value)} className="bg-black/20 border-white/10" />
                    </div>
                    {techStack.map((tech, index) => (
                      <div key={index} className="flex gap-2 items-center rounded-2xl border border-white/10 bg-white/5 p-4">
                        <Input value={tech.name} onChange={(e) => setTechStack(c => c.map((t, i) => i === index ? { ...t, name: e.target.value } : t))} placeholder="Name" className="w-1/3 bg-black/20 border-white/10" />
                        <Input value={tech.icon} onChange={(e) => setTechStack(c => c.map((t, i) => i === index ? { ...t, icon: e.target.value } : t))} placeholder="Icon (e.g. Layout)" className="w-1/4 bg-black/20 border-white/10" />
                        <Input value={tech.color} onChange={(e) => setTechStack(c => c.map((t, i) => i === index ? { ...t, color: e.target.value } : t))} placeholder="Color class" className="w-1/4 bg-black/20 border-white/10" />
                        <Input value={tech.bg} onChange={(e) => setTechStack(c => c.map((t, i) => i === index ? { ...t, bg: e.target.value } : t))} placeholder="Bg class" className="w-1/4 bg-black/20 border-white/10" />
                        <Button variant="ghost" size="icon" className="shrink-0 text-destructive hover:bg-destructive/10" onClick={() => setTechStack(c => c.filter((_, i) => i !== index))}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full border-dashed border-white/10 hover:bg-white/5" onClick={() => setTechStack(c => [...c, { name: "New Tech", icon: "Code2", color: "text-white", bg: "bg-white/10" }])}>
                      <Plus className="mr-2 h-4 w-4" /> Add Technology
                    </Button>
                  </div>
                  <DialogFooter>
                    <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                    <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                    <DialogClose render={<Button type="button" className="glow-primary" onClick={() => saveTechStack(techStack)} />}>Save Changes</DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </AdminOnly>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {techStack.map((tech, i) => {
              const Icon = timelineIconMap[tech.icon as keyof typeof timelineIconMap] || Code2;
              return (
                <motion.div
                  key={tech.name + i}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-6 rounded-[2rem] bg-white/5 border border-white/5 flex flex-col items-center gap-4 group transition-all"
                >
                  <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12", tech.bg)}>
                    <Icon className={cn("h-8 w-8", tech.color)} />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-black text-premium tracking-tight">{tech.name}</p>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Expertise: High</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* AI Project Insights */}
        <div className="space-y-6 h-fit">
          <div className="flex items-center justify-between gap-3 px-2">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-indigo-400" />
              <h2 className="text-2xl font-black text-premium tracking-tight">{sectionTitles.insights}</h2>
            </div>
            <AdminOnly>
              <Dialog>
                <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>
                  <Edit3 className="mr-2 h-4 w-4" /> Edit
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl bg-card/95 backdrop-blur-xl border-white/10">
                  <DialogHeader>
                    <DialogTitle className="text-premium">Edit Insights</DialogTitle>
                  </DialogHeader>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3 mb-4">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Section Titles</p>
                    <div className="grid grid-cols-3 gap-2">
                      <Input value={sectionTitles.insights} onChange={e => updateSectionTitle("insights", e.target.value)} className="bg-black/20 border-white/10" placeholder="Main Title" />
                      <Input value={sectionTitles.dna} onChange={e => updateSectionTitle("dna", e.target.value)} className="bg-black/20 border-white/10" placeholder="Card Title" />
                      <Input value={sectionTitles.dnaSub} onChange={e => updateSectionTitle("dnaSub", e.target.value)} className="bg-black/20 border-white/10" placeholder="Card Subtitle" />
                    </div>
                  </div>
                  <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                    {projectInsights.map((insight, index) => (
                      <div key={`${index}-${insight.slice(0, 10)}`} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <Textarea
                          value={insight}
                          onChange={(event) =>
                            setProjectInsights((current) =>
                              current.map((item, itemIndex) => itemIndex === index ? event.target.value : item)
                            )
                          }
                          className="min-h-24 bg-black/20 border-white/10"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => setProjectInsights((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full border-dashed border-white/10 hover:bg-white/5"
                      onClick={() => setProjectInsights((current) => [...current, "New insight"]) }
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Insight
                    </Button>
                  </div>
                  <DialogFooter>
                    <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                    <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                    <DialogClose render={<Button type="button" className="glow-primary" onClick={() => saveInsights(projectInsights)} />}>Save Changes</DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </AdminOnly>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="premium-3d"
          >
            <Card className="premium-card border-none bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-8 relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <BrainCircuit className="h-24 w-24 text-white" />
              </div>
              <CardHeader className="p-0 pb-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/40">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-black text-premium uppercase tracking-widest">{sectionTitles.dna}</CardTitle>
                    <p className="text-[8px] font-black text-indigo-300 uppercase tracking-[0.3em]">{sectionTitles.dnaSub}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 space-y-6">
                <div className="space-y-4">
                  {projectInsights.map((insight, index) => {
                    const dotStyles = [
                      "bg-emerald-500/20 text-emerald-500",
                      "bg-indigo-500/20 text-indigo-500",
                      "bg-cyan-500/20 text-cyan-500",
                      "bg-amber-500/20 text-amber-500",
                    ];
                    const dotStyle = dotStyles[index % dotStyles.length];
                    return (
                      <div key={`${index}-${insight.slice(0, 10)}`} className="flex items-start gap-3">
                        <div className={cn("mt-0.5 flex h-5 w-5 items-center justify-center rounded-full", dotStyle.split(" ")[0])}>
                          <div className={cn("h-2 w-2 rounded-full", dotStyle.split(" ")[1])} />
                        </div>
                        <p className="text-sm font-bold text-premium leading-relaxed">
                          "{insight}"
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Project Timeline */}
      <section className="space-y-8">
        <div className="flex items-center justify-between gap-3 px-2">
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-black text-premium tracking-tight">{sectionTitles.timeline}</h2>
          </div>
          <AdminOnly>
            <Dialog>
              <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>
                <Edit3 className="mr-2 h-4 w-4" /> Edit
              </DialogTrigger>
              <DialogContent className="sm:max-w-3xl bg-card/95 backdrop-blur-xl border-white/10">
                <DialogHeader>
                  <DialogTitle className="text-premium">Edit Development Timeline</DialogTitle>
                </DialogHeader>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3 mb-4">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Section Title</p>
                  <Input
                    value={sectionTitles.timeline}
                    onChange={(e) => updateSectionTitle("timeline", e.target.value)}
                    className="bg-black/20 border-white/10"
                  />
                </div>
                <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                  {projectTimeline.map((item, index) => (
                    <div key={`${item.year}-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                      <div className="grid gap-3 md:grid-cols-3">
                        <Input
                          value={item.year}
                          onChange={(event) =>
                            setProjectTimeline((current) =>
                              current.map((entry, itemIndex) => itemIndex === index ? { ...entry, year: event.target.value } : entry)
                            )
                          }
                          className="bg-black/20 border-white/10"
                          placeholder="Year"
                        />
                        <Input
                          value={item.title}
                          onChange={(event) =>
                            setProjectTimeline((current) =>
                              current.map((entry, itemIndex) => itemIndex === index ? { ...entry, title: event.target.value } : entry)
                            )
                          }
                          className="bg-black/20 border-white/10"
                          placeholder="Title"
                        />
                        <Input
                          value={item.icon}
                          onChange={(event) =>
                            setProjectTimeline((current) =>
                              current.map((entry, itemIndex) => itemIndex === index ? { ...entry, icon: event.target.value } : entry)
                            )
                          }
                          className="bg-black/20 border-white/10"
                          placeholder="Icon name"
                        />
                      </div>
                      <Textarea
                        value={item.desc}
                        onChange={(event) =>
                          setProjectTimeline((current) =>
                            current.map((entry, itemIndex) => itemIndex === index ? { ...entry, desc: event.target.value } : entry)
                          )
                        }
                        className="min-h-24 bg-black/20 border-white/10"
                        placeholder="Description"
                      />
                      <div className="flex items-center justify-between gap-3">
                        <Input
                          value={item.color}
                          onChange={(event) =>
                            setProjectTimeline((current) =>
                              current.map((entry, itemIndex) => itemIndex === index ? { ...entry, color: event.target.value } : entry)
                            )
                          }
                          className="bg-black/20 border-white/10"
                          placeholder="Tailwind color class"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => setProjectTimeline((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full border-dashed border-white/10 hover:bg-white/5"
                    onClick={() =>
                      setProjectTimeline((current) => [
                        ...current,
                        { year: "2026", title: "New Milestone", desc: "Describe the milestone.", icon: "Rocket", color: "text-primary" },
                      ])
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Timeline Item
                  </Button>
                </div>
                <DialogFooter>
                  <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                  <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                  <DialogClose render={<Button type="button" className="glow-primary" onClick={() => saveTimeline(projectTimeline)} />}>
                    Save Changes
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </AdminOnly>
        </div>
        <div className="relative p-8 rounded-[3rem] bg-white/5 border border-white/5 overflow-hidden">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-cyan-400 hidden md:block" />
          <div className="space-y-12 relative">
            {projectTimeline.map((item, i) => {
              const TimelineIcon = timelineIconMap[item.icon as keyof typeof timelineIconMap] || Rocket;
              return (
              <div key={i} className={cn(
                "flex flex-col md:flex-row items-center gap-8",
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              )}>
                <div className="flex-1 text-center md:text-left">
                  <div className={cn("space-y-2", i % 2 === 0 ? "md:text-right" : "md:text-left")}>
                    <h4 className="text-2xl font-black text-premium">{item.year}</h4>
                    <h5 className={cn("text-lg font-black uppercase tracking-widest", item.color)}>{item.title}</h5>
                    <p className="text-sm text-muted-foreground font-medium">{item.desc}</p>
                  </div>
                </div>
                <div className="relative z-10 h-16 w-16 rounded-2xl bg-background border-4 border-white/10 flex items-center justify-center shadow-2xl">
                  <TimelineIcon className={cn("h-8 w-8", item.color)} />
                </div>
                <div className="flex-1" />
              </div>
            )})}
          </div>
        </div>
      </section>

      <AdminOnly>
        <Dialog open={Boolean(editingProject)} onOpenChange={(open) => !open && setEditingProject(null)}>
          <DialogContent className="sm:max-w-2xl bg-card/95 backdrop-blur-xl border-white/10">
            <DialogHeader>
              <DialogTitle className="text-premium">Edit Project</DialogTitle>
            </DialogHeader>
            {editingProject && (
              <form
                onSubmit={(e) => {
                  handleEditProject(e, editingProject.id);
                  setEditingProject(null);
                }}
              >
                <ProjectFormFields project={editingProject} />
                <DialogFooter>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      handleDeleteProject(editingProject.id);
                      setEditingProject(null);
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Project
                  </Button>
                  <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                  <Button type="submit" className="glow-primary">Save Changes</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </AdminOnly>
    </div>
  );
}
