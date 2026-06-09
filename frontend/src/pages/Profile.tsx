import * as React from "react";
import { Link } from "react-router-dom";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3, 
  Share2,
  Globe,
  Twitter,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  Sparkles,
  Zap,
  Rocket,
  BrainCircuit,
  Star,
  Terminal,
  Cpu,
  Database,
  Cloud,
  Wrench,
  Layout,
  MessageSquare,
  Target,
  Trash2,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { studentData } from "@/src/data/mockData";
import { AdminOnly } from "@/src/lib/admin";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

function TypingText({ text, speed = 50, className }: { text: string, speed?: number, className?: string }) {
  const [displayedText, setDisplayedText] = React.useState("");

  React.useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span className={className}>{displayedText}</span>;
}

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

const PROFILE_STORAGE_KEYS = {
  about: "portfolio-about",
  experience: "portfolio-experience",
  skills: "portfolio-skills",
  languages: "portfolio-languages",
  sectionTitles: "portfolio-profile-titles",
} as const;

export default function Profile() {
  const [profile, setProfile] = React.useState(studentData.profile);
  const [internships, setInternships] = React.useState(studentData.internships);
  const [personalStats, setPersonalStats] = React.useState([
    { label: "DSA Solved", value: "200+", color: "text-primary" },
    { label: "Projects", value: "6+", color: "text-secondary" },
    { label: "Certifications", value: "4+", color: "text-cyan-400" },
    { label: "Platforms", value: "3", color: "text-emerald-400" },
  ]);
  const [personalityInsights, setPersonalityInsights] = React.useState([
    {
      quote: "Akhil is a highly analytical problem solver with strong system-building capabilities.",
      fit: "Best suited for Backend / Full Stack / SDE roles",
    },
  ]);
  const [connectLinks, setConnectLinks] = React.useState([
    { name: "GitHub", url: "https://github.com/akhilverma07", handle: "github.com/akhilverma07", color: "bg-black", icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com/in/akhil-verma", handle: "linkedin.com/in/akhil-verma", color: "bg-blue-600", icon: "linkedin" },
    { name: "LeetCode", url: "https://leetcode.com/u/akhilverma007", handle: "leetcode.com/u/akhilverma007", color: "bg-amber-500", icon: "code" },
  ]);
  const [saveMessage, setSaveMessage] = React.useState("");

  const [sectionTitles, setSectionTitles] = React.useState({
    header: "Professional Profile",
    headerSub: "Software Engineer with a focus on scalable systems and AI",
    about: "About Me",
    experience: "Experience",
    core: "Core Competencies",
    languages: "Languages & Tools"
  });
  
  const updateSectionTitle = (key, value) => {
    setSectionTitles(prev => {
      const next = { ...prev, [key]: value };
      window.localStorage.setItem(PROFILE_STORAGE_KEYS.sectionTitles, JSON.stringify(next));
      return next;
    });
  };
  const defaultCoverImage = "/profile-cover.png";
  const defaultAvatarImage = "/profile-avatar.png";
  const avatarMigrationKey = "portfolio-profile-avatar-migrated-v1";

  React.useEffect(() => {
    const savedProfile = localStorage.getItem("portfolio-profile");
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        const shouldMigrateAvatar =
          !localStorage.getItem(avatarMigrationKey) &&
          parsedProfile.avatar &&
          parsedProfile.avatar !== defaultAvatarImage;

        const normalizedProfile = {
          ...studentData.profile,
          ...parsedProfile,
          coverImage: parsedProfile.coverImage || defaultCoverImage,
          avatar: shouldMigrateAvatar ? defaultAvatarImage : (parsedProfile.avatar || defaultAvatarImage),
        };

        setProfile(normalizedProfile);

        if (shouldMigrateAvatar) {
          localStorage.setItem("portfolio-profile", JSON.stringify(normalizedProfile));
          localStorage.setItem(avatarMigrationKey, "true");
        }
      } catch(e) {}
    }
    const savedInterns = localStorage.getItem("portfolio-internships");
    if (savedInterns) {
      try { setInternships(JSON.parse(savedInterns)); } catch(e) {}
    }
    const savedSkills = localStorage.getItem("portfolio-skill-categories");
    if (savedSkills) {
      try { setSkillCategories(JSON.parse(savedSkills)); } catch(e) {}
    }
    const savedStats = localStorage.getItem("portfolio-personal-stats");
    if (savedStats) {
      try { setPersonalStats(JSON.parse(savedStats)); } catch(e) {}
    }
    const savedInsights = localStorage.getItem("portfolio-personality-insights");
    if (savedInsights) {
      try { setPersonalityInsights(JSON.parse(savedInsights)); } catch(e) {}
    }
    const savedLinks = localStorage.getItem("portfolio-connect-links");
    if (savedLinks) {
      try { setConnectLinks(JSON.parse(savedLinks)); } catch(e) {}
    }
  }, []);

  const saveProfile = (newProfile: typeof profile) => {
    setProfile(newProfile);
    localStorage.setItem("portfolio-profile", JSON.stringify(newProfile));
  };

  const saveInternships = (newInterns: typeof internships) => {
    setInternships(newInterns);
    localStorage.setItem("portfolio-internships", JSON.stringify(newInterns));
  };

  const saveSkillCategories = (newSkills: typeof skillCategories) => {
    setSkillCategories(newSkills);
    localStorage.setItem("portfolio-skill-categories", JSON.stringify(newSkills));
    setSaveMessage("Skills saved");
    window.setTimeout(() => setSaveMessage(""), 2000);
  };

  const savePersonalStats = (newStats: typeof personalStats) => {
    setPersonalStats(newStats);
    localStorage.setItem("portfolio-personal-stats", JSON.stringify(newStats));
    setSaveMessage("Personal stats saved");
    window.setTimeout(() => setSaveMessage(""), 2000);
  };

  const savePersonalityInsights = (newInsights: typeof personalityInsights) => {
    setPersonalityInsights(newInsights);
    localStorage.setItem("portfolio-personality-insights", JSON.stringify(newInsights));
    setSaveMessage("Profile insights saved");
    window.setTimeout(() => setSaveMessage(""), 2000);
  };

  const saveConnectLinks = (newLinks: typeof connectLinks) => {
    setConnectLinks(newLinks);
    localStorage.setItem("portfolio-connect-links", JSON.stringify(newLinks));
    setSaveMessage("Connect links saved");
    window.setTimeout(() => setSaveMessage(""), 2000);
  };

  const handleSharePortfolio = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${profile.name} Portfolio`,
          text: `${profile.name} | ${profile.role}`,
          url: window.location.href,
        });
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
        alert("Portfolio link copied to clipboard.");
        return;
      }
    } catch {
      // fall through to prompt below
    }

    window.prompt("Copy your portfolio link:", window.location.href);
  };

  const defaultSkillCategories = [
    { 
      title: "Languages", 
      icon: Terminal, 
      skills: ["C++", "Java", "Python", "JavaScript", "C"],
      color: "text-indigo-400",
      bg: "bg-indigo-500/10"
    },
    { 
      title: "Web", 
      icon: Layout, 
      skills: ["HTML", "CSS", "React.js", "Flask"],
      color: "text-purple-400",
      bg: "bg-purple-500/10"
    },
    { 
      title: "AI/ML", 
      icon: BrainCircuit, 
      skills: ["TensorFlow", "PyTorch", "NLP", "Hugging Face"],
      color: "text-cyan-400",
      bg: "bg-cyan-500/10"
    },
    { 
      title: "Cloud & DB", 
      icon: Cloud, 
      skills: ["SQL", "AWS DynamoDB", "S3", "AWS KMS"],
      color: "text-emerald-400",
      bg: "bg-emerald-500/10"
    },
    { 
      title: "Tools", 
      icon: Wrench, 
      skills: ["Git", "GitHub", "VS Code", "Streamlit"],
      color: "text-amber-400",
      bg: "bg-amber-500/10"
    }
  ];
  const [skillCategories, setSkillCategories] = React.useState(defaultSkillCategories);

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative">
        <div
          className="relative h-64 w-full overflow-hidden rounded-[2rem] bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(44, 20, 90, 0.72), rgba(41, 16, 70, 0.55), rgba(7, 30, 68, 0.52)), url('${profile.coverImage || defaultCoverImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(167,139,250,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.18),transparent_28%)]"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <div className="absolute bottom-6 right-8 flex gap-3 z-20">
            <AdminOnly>
              <Dialog>
                <DialogTrigger render={<Button size="sm" variant="secondary" className="glass-panel text-white border-white/10 hover:bg-white/20" />}>
                  <Edit3 className="mr-2 h-4 w-4" /> Edit Cover
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg bg-card/90 backdrop-blur-xl border-white/10">
                  <DialogHeader>
                    <DialogTitle className="text-premium">Edit Cover</DialogTitle>
                  </DialogHeader>
                  <form id="edit-cover-form" onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    saveProfile({
                      ...profile,
                      coverImage: (formData.get("coverImage") as string) || defaultCoverImage,
                    });
                  }}>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label>Cover Image URL</Label>
                        <Input
                          name="coverImage"
                          defaultValue={profile.coverImage || defaultCoverImage}
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="destructive"
                        type="button"
                        onClick={() =>
                          saveProfile({
                            ...profile,
                            coverImage: "",
                          })
                        }
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Remove Background
                      </Button>
                      <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                      <DialogClose render={<Button type="submit" form="edit-cover-form" className="glow-primary" onClick={() => {
                        const form = document.getElementById("edit-cover-form") as HTMLFormElement;
                        if (form) {
                          const formData = new FormData(form);
                          saveProfile({
                            ...profile,
                            coverImage: (formData.get("coverImage") as string) || defaultCoverImage,
                          });
                        }
                      }} />}>Save changes</DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </AdminOnly>
          </div>
        </div>

        <div className="relative -mt-24 px-8">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-end">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="premium-3d"
              >
                <Avatar className="h-40 w-40 border-8 border-background shadow-2xl shadow-primary/20 rounded-[2.5rem]">
                  <AvatarImage
                    src={profile.avatar || defaultAvatarImage}
                    className="object-cover object-[center_18%] scale-[1.12]"
                  />
                  <AvatarFallback className="bg-primary/10 text-primary text-4xl font-black">AV</AvatarFallback>
                </Avatar>
              </motion.div>
              <div className="space-y-3 text-center md:text-left">
                <div className="space-y-1">
                  <h1 className="text-6xl font-black tracking-tighter text-premium bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    {profile.name}
                  </h1>
                  <div className="h-6">
                    <TypingText 
                      text="Software Development Engineer | Full Stack | AI Enthusiast" 
                      className="text-sm font-black text-indigo-400 uppercase tracking-[0.4em]"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-3 pt-2 md:justify-start">
                  <Badge variant="secondary" className="bg-white/5 text-muted-foreground border-white/10 px-3 py-1 rounded-xl">
                    <MapPin className="mr-2 h-3.5 w-3.5 text-red-400" /> Basti, Uttar Pradesh, India
                  </Badge>
                  <Badge variant="secondary" className="bg-white/5 text-muted-foreground border-white/10 px-3 py-1 rounded-xl">
                    <GraduationCap className="mr-2 h-3.5 w-3.5 text-indigo-400" /> VIT, B.Tech CSE (2027)
                  </Badge>
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1 rounded-xl">
                    <Star className="mr-2 h-3.5 w-3.5" /> CGPA: 8.20
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-wrap gap-3 md:w-auto">
              <Button 
                className="flex-1 md:flex-none rounded-2xl h-12 px-6 font-bold glow-primary"
                onClick={handleSharePortfolio}
              >
                <Share2 className="mr-2 h-4 w-4" /> Share Portfolio
              </Button>
              <AdminOnly>
                <Dialog>
                  <DialogTrigger render={<Button variant="outline" className="flex-1 md:flex-none rounded-2xl h-12 px-6 font-bold border-white/10 hover:bg-white/5" />}>
                    <Edit3 className="mr-2 h-4 w-4" /> Edit Photo
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg bg-card/90 backdrop-blur-xl border-white/10">
                    <DialogHeader>
                      <DialogTitle className="text-premium">Edit Profile Photo</DialogTitle>
                    </DialogHeader>
                    <form
                      id="edit-photo-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target as HTMLFormElement);
                        saveProfile({
                          ...profile,
                          avatar: (formData.get("avatar") as string) || defaultAvatarImage,
                        });
                      }}
                    >
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label>Profile Image URL</Label>
                          <Input
                            name="avatar"
                            defaultValue={profile.avatar || defaultAvatarImage}
                            className="bg-white/5 border-white/10"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="destructive"
                          type="button"
                          onClick={() =>
                            saveProfile({
                              ...profile,
                              avatar: "",
                            })
                          }
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Remove Photo
                        </Button>
                        <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                        <DialogClose render={<Button type="submit" form="edit-photo-form" className="glow-primary" onClick={() => {
                          const form = document.getElementById("edit-photo-form") as HTMLFormElement;
                          if (form) {
                            const formData = new FormData(form);
                            saveProfile({
                              ...profile,
                              avatar: (formData.get("avatar") as string) || defaultAvatarImage,
                            });
                          }
                        }} />}>Save changes</DialogClose>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger render={<Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-white/5 hover:bg-white/10" />}>
                    <Edit3 className="h-5 w-5" />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-card/90 backdrop-blur-xl border-white/10">
                    <DialogHeader>
                      <DialogTitle className="text-premium">Edit Profile Info</DialogTitle>
                    </DialogHeader>
                    <form id="edit-profile-info-form" onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target as HTMLFormElement);
                      saveProfile({
                        ...profile,
                        name: formData.get('name') as string,
                        role: formData.get('role') as string,
                        college: formData.get('college') as string,
                        branch: formData.get('branch') as string
                      });
                    }}>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label>Name</Label>
                          <Input name="name" defaultValue={profile.name} className="bg-white/5 border-white/10" />
                        </div>
                        <div className="grid gap-2">
                          <Label>Role</Label>
                          <Input name="role" defaultValue={profile.role} className="bg-white/5 border-white/10" />
                        </div>
                        <div className="grid gap-2">
                          <Label>College</Label>
                          <Input name="college" defaultValue={profile.college} className="bg-white/5 border-white/10" />
                        </div>
                        <div className="grid gap-2">
                          <Label>Branch</Label>
                          <Input name="branch" defaultValue={profile.branch} className="bg-white/5 border-white/10" />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                        <DialogClose render={<Button type="submit" form="edit-profile-info-form" className="glow-primary" onClick={() => {
                          const form = document.getElementById("edit-profile-info-form") as HTMLFormElement;
                          if (form) {
                            const formData = new FormData(form);
                            saveProfile({
                              ...profile,
                              name: formData.get('name') as string,
                              role: formData.get('role') as string,
                              college: formData.get('college') as string,
                              branch: formData.get('branch') as string
                            });
                          }
                        }} />}>Save changes</DialogClose>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </AdminOnly>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          {/* About Me */}
          <Card className="premium-card border-none p-4">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-premium tracking-tight flex items-center justify-between gap-3 w-full">
                <div className="flex items-center gap-3">
                  <User className="h-6 w-6 text-primary" /> About Me
                </div>
                <AdminOnly>
                  <Dialog>
                    <DialogTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10" />}>
                      <Edit3 className="h-4 w-4" />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl bg-card/90 backdrop-blur-xl border-white/10">
                      <DialogHeader>
                        <DialogTitle className="text-premium">Edit About Me</DialogTitle>
                      </DialogHeader>
                      
                      <form id="edit-about-form" onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target as HTMLFormElement);
                        saveProfile({
                          ...profile,
                          about: formData.get('about') as string
                        });
                      }}>
                        <div className="grid gap-4 py-4">
                          <Textarea 
                            name="about"
                            defaultValue={profile.about} 
                            className="bg-white/5 border-white/10 h-40" 
                          />
                        </div>
                        <DialogFooter>
                          <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                          <DialogClose render={<Button type="submit" form="edit-about-form" className="glow-primary" onClick={() => {
                            const form = document.getElementById("edit-about-form") as HTMLFormElement;
                            if (form) {
                              const formData = new FormData(form);
                              saveProfile({
                                ...profile,
                                about: formData.get('about') as string
                              });
                            }
                          }} />}>Save changes</DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </AdminOnly>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                {profile.about}
              </p>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 pt-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">College</p>
                  <p className="text-sm font-bold text-premium">{profile.college}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Branch</p>
                  <p className="text-sm font-bold text-premium">{profile.branch}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Expected Graduation</p>
                  <p className="text-sm font-bold text-premium">2027</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card className="premium-card border-none p-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-black text-premium tracking-tight flex items-center gap-3">
                <Briefcase className="h-6 w-6 text-secondary" /> Experience & Internships
              </CardTitle>
              <div className="flex gap-2">
                <AdminOnly>
                  <Dialog>
                    <DialogTrigger render={<Button variant="outline" size="sm" className="h-8 font-bold text-[10px] uppercase bg-white/5 border-white/10" />}>
                      <Plus className="mr-1 w-3 h-3"/> Add
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-card/90 backdrop-blur-xl border-white/10">
                      <DialogHeader>
                        <DialogTitle className="text-premium">Add Experience</DialogTitle>
                      </DialogHeader>
                      <form id="add-exp-form" onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target as HTMLFormElement);
                        const newExp = {
                          role: formData.get('role') as string,
                          company: formData.get('company') as string,
                          duration: formData.get('duration') as string,
                          description: formData.get('description') as string,
                          skills: (formData.get('skills') as string).split(',').map(s => s.trim()).filter(Boolean)
                        };
                        saveInternships([...internships, newExp]);
                        // dialog close handled naturally or requires clicking outside
                      }}>
                        <div className="grid gap-4 py-4">
                          <Input name="role" placeholder="Role (e.g. Software Engineer)" className="bg-white/5 border-white/10" required />
                          <Input name="company" placeholder="Company" className="bg-white/5 border-white/10" required />
                          <Input name="duration" placeholder="Duration (e.g. Jan 2024 - Present)" className="bg-white/5 border-white/10" required />
                          <Textarea name="description" placeholder="Description" className="bg-white/5 border-white/10" required />
                          <Input name="skills" placeholder="Skills (comma separated)" className="bg-white/5 border-white/10" />
                        </div>
                        <DialogFooter>
                          <DialogClose render={<Button type="submit" form="add-exp-form" className="glow-primary" onClick={() => {
                            const form = document.getElementById("add-exp-form") as HTMLFormElement;
                            if (form) {
                              const formData = new FormData(form);
                              const newExp = {
                                role: formData.get('role') as string,
                                company: formData.get('company') as string,
                                duration: formData.get('duration') as string,
                                description: formData.get('description') as string,
                                skills: (formData.get('skills') as string).split(',').map(s => s.trim()).filter(Boolean)
                              };
                              saveInternships([...internships, newExp]);
                            }
                          }} />}>Save changes</DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </AdminOnly>
              </div>
            </CardHeader>
            <CardContent className="space-y-10 pt-4">
              {internships.map((intern, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="relative pl-10 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent"
                >
                  <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-primary shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                  <div className="space-y-4">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <h3 className="text-xl font-black text-premium tracking-tight">{intern.role}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="w-fit bg-white/5 text-muted-foreground border-white/10 font-bold">
                          {intern.duration}
                        </Badge>
                        <AdminOnly>
                          <div className="flex gap-1">
                            <Dialog>
                              <DialogTrigger render={<Button variant="ghost" size="icon" className="h-6 w-6 text-primary hover:text-primary hover:bg-primary/10" />}>
                                <Edit3 className="h-3 w-3" />
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md bg-card/90 backdrop-blur-xl border-white/10">
                                <DialogHeader>
                                  <DialogTitle className="text-premium">Edit Experience</DialogTitle>
                  </DialogHeader>
                  
                                <form id={`edit-exp-form-${i}`} onSubmit={(e) => {
                                  e.preventDefault();
                                  const formData = new FormData(e.target as HTMLFormElement);
                                  const newExp = {
                                    role: formData.get('role') as string,
                                    company: formData.get('company') as string,
                                    duration: formData.get('duration') as string,
                                    description: formData.get('description') as string,
                                    skills: (formData.get('skills') as string).split(',').map(s => s.trim()).filter(Boolean)
                                  };
                                  const updatedInternships = [...internships];
                                  updatedInternships[i] = newExp;
                                  saveInternships(updatedInternships);
                                }}>
                                  <div className="grid gap-4 py-4">
                                    <Input name="role" defaultValue={intern.role} placeholder="Role" className="bg-white/5 border-white/10" required />
                                    <Input name="company" defaultValue={intern.company} placeholder="Company" className="bg-white/5 border-white/10" required />
                                    <Input name="duration" defaultValue={intern.duration} placeholder="Duration" className="bg-white/5 border-white/10" required />
                                    <Textarea name="description" defaultValue={intern.description} placeholder="Description" className="bg-white/5 border-white/10" required />
                                    <Input name="skills" defaultValue={intern.skills.join(', ')} placeholder="Skills (comma separated)" className="bg-white/5 border-white/10" />
                                  </div>
                                  <DialogFooter>
                                    <DialogClose render={<Button type="submit" form={`edit-exp-form-${i}`} className="glow-primary" onClick={() => {
                                      const form = document.getElementById(`edit-exp-form-${i}`) as HTMLFormElement;
                                      if (form) {
                                        const formData = new FormData(form);
                                        const newExp = {
                                          role: formData.get('role') as string,
                                          company: formData.get('company') as string,
                                          duration: formData.get('duration') as string,
                                          description: formData.get('description') as string,
                                          skills: (formData.get('skills') as string).split(',').map(s => s.trim()).filter(Boolean)
                                        };
                                        const updatedInternships = [...internships];
                                        updatedInternships[i] = newExp;
                                        saveInternships(updatedInternships);
                                      }
                                    }} />}>Save changes</DialogClose>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-red-400 hover:text-red-500 hover:bg-red-500/10" onClick={() => {
                              saveInternships(internships.filter((_, idx) => idx !== i));
                            }}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </AdminOnly>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs">
                      <Zap className="h-3 w-3" /> {intern.company}
                    </div>
                    <p className="text-muted-foreground font-medium leading-relaxed">{intern.description}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {intern.skills.map(skill => (
                        <Badge key={skill} variant="outline" className="rounded-lg bg-white/5 border-white/10 text-[10px] font-bold py-1 px-3">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
              
            </CardContent>
          </Card>

          {/* Featured Projects */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-black text-premium tracking-tight flex items-center gap-3">
                <Rocket className="h-6 w-6 text-cyan-400" /> Featured Projects
              </h2>
              <Link to="/projects">
                <Button variant="ghost" className="text-primary font-black uppercase tracking-widest text-[10px]">View All Projects</Button>
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {studentData.projects.slice(0, 2).map((project, i) => (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -10 }}
                  className="premium-3d"
                >
                  <Card className="premium-card border-none overflow-hidden group h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <h3 className="text-lg font-black text-white tracking-tight">{project.title}</h3>
                        <div className="flex gap-2">
                          <Button size="icon" variant="secondary" className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-md border-none hover:bg-white/30">
                            <Github className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="secondary" className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-md border-none hover:bg-white/30">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-5 space-y-4">
                      <p className="text-sm text-muted-foreground font-medium line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map(t => (
                          <Badge key={t} variant="secondary" className="bg-white/5 text-[10px] font-bold py-0.5 px-2 rounded-md border-white/5">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-10">
          {/* Personal Stats */}
          <Card className="premium-card border-none p-4 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle className="text-lg font-black text-premium uppercase tracking-widest flex items-center justify-between gap-3">
                <span>Personal Stats</span>
                <AdminOnly>
                  <Dialog>
                    <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>
                      <Edit3 className="mr-2 h-4 w-4" /> Edit Stats
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl bg-card/90 backdrop-blur-xl border-white/10">
                      <DialogHeader>
                        <DialogTitle className="text-premium">Edit Personal Stats</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={(e) => { e.preventDefault(); savePersonalStats(personalStats); }}>
                        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                          {personalStats.map((stat, statIndex) => (
                            <div key={`${stat.label}-${statIndex}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 grid gap-3 md:grid-cols-[1fr_140px_52px]">
                              <Input
                                value={stat.label}
                                onChange={(event) =>
                                  setPersonalStats((current) =>
                                    current.map((item, itemIndex) =>
                                      itemIndex === statIndex ? { ...item, label: event.target.value } : item
                                    )
                                  )
                                }
                                className="bg-black/20 border-white/10"
                              />
                              <Input
                                value={stat.value}
                                onChange={(event) =>
                                  setPersonalStats((current) =>
                                    current.map((item, itemIndex) =>
                                      itemIndex === statIndex ? { ...item, value: event.target.value } : item
                                    )
                                  )
                                }
                                className="bg-black/20 border-white/10"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                type="button"
                                className="text-destructive hover:bg-destructive/10"
                                onClick={() =>
                                  setPersonalStats((current) => current.filter((_, itemIndex) => itemIndex !== statIndex))
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
                              setPersonalStats((current) => [
                                ...current,
                                { label: "New Stat", value: "0", color: "text-primary" },
                              ])
                            }
                          >
                            <Plus className="mr-2 h-4 w-4" /> Add Stat
                          </Button>
                        </div>
                        <DialogFooter>
                          <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                          <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                          <DialogClose render={<Button type="submit" className="glow-primary" onClick={() => savePersonalStats(personalStats)} />}>Save changes</DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </AdminOnly>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {personalStats.map((stat, index) => (
                <div key={`${stat.label}-${index}`} className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center space-y-1">
                  <h4 className={cn("text-2xl font-black tracking-tighter", stat.color)}>
                    {stat.value}
                  </h4>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Personality Insight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="premium-3d"
          >
            <Card className="premium-card border-none bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-6 relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none z-0">
                <BrainCircuit className="h-24 w-24 text-white" />
              </div>
              <CardHeader className="p-0 pb-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/40">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-black text-premium uppercase tracking-widest">Profile Highlights</CardTitle>
                      <p className="text-[8px] font-black text-indigo-300 uppercase tracking-[0.3em]">Strength Summary</p>
                    </div>
                  </div>
                  <AdminOnly>
                    <Dialog>
                      <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5 relative z-10" />}>
                        <Edit3 className="mr-2 h-4 w-4" /> Edit
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-2xl bg-card/90 backdrop-blur-xl border-white/10">
                        <DialogHeader>
                          <DialogTitle className="text-premium">Edit Profile Highlights</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={(e) => { e.preventDefault(); savePersonalityInsights(personalityInsights); }}>
                          <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                            {personalityInsights.map((item, insightIndex) => (
                              <div key={insightIndex} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                                <div className="flex items-center gap-3">
                                  <Textarea
                                    value={item.quote}
                                    onChange={(event) =>
                                      setPersonalityInsights((current) =>
                                        current.map((entry, itemIndex) =>
                                          itemIndex === insightIndex ? { ...entry, quote: event.target.value } : entry
                                        )
                                      )
                                    }
                                    className="bg-black/20 border-white/10 min-h-24"
                                  />
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    type="button"
                                    className="self-start text-destructive hover:bg-destructive/10"
                                    onClick={() =>
                                      setPersonalityInsights((current) =>
                                        current.filter((_, itemIndex) => itemIndex !== insightIndex)
                                      )
                                    }
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                                <Input
                                  value={item.fit}
                                  onChange={(event) =>
                                    setPersonalityInsights((current) =>
                                      current.map((entry, itemIndex) =>
                                        itemIndex === insightIndex ? { ...entry, fit: event.target.value } : entry
                                      )
                                    )
                                  }
                                  className="bg-black/20 border-white/10"
                                />
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              type="button"
                              className="w-full border-dashed border-white/10 hover:bg-white/5"
                              onClick={() =>
                                setPersonalityInsights((current) => [
                                  ...current,
                                  { quote: "New profile highlight", fit: "Add role alignment" },
                                ])
                              }
                            >
                              <Plus className="mr-2 h-4 w-4" /> Add Highlight
                            </Button>
                          </div>
                          <DialogFooter>
                            <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                            <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                            <DialogClose render={<Button type="submit" className="glow-primary" onClick={() => savePersonalityInsights(personalityInsights)} />}>Save changes</DialogClose>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </AdminOnly>
                </div>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                {personalityInsights.map((item, index) => (
                  <div key={index} className="space-y-4">
                    <p className="text-sm font-bold text-premium leading-relaxed italic">
                      "{item.quote}"
                    </p>
                    <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-center gap-3">
                      <Target className="h-4 w-4 text-emerald-400" />
                      <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{item.fit}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills */}
          <Card className="premium-card border-none p-4">
            <CardHeader>
              <CardTitle className="text-lg font-black text-premium uppercase tracking-widest flex items-center justify-between gap-3">
                <span>Skills & Tech Stack</span>
                <AdminOnly>
                  <Dialog>
                    <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>
                      <Edit3 className="mr-2 h-4 w-4" /> Edit Skills
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-3xl bg-card/90 backdrop-blur-xl border-white/10">
                      <DialogHeader>
                        <DialogTitle className="text-premium">Edit Skills & Tech Stack</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={(e) => { e.preventDefault(); saveSkillCategories(skillCategories); }}>
                        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                          {skillCategories.map((category, categoryIndex) => (
                            <div key={`${category.title}-${categoryIndex}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                              <div className="flex items-center gap-3">
                                <Input
                                  value={category.title}
                                  onChange={(event) =>
                                    setSkillCategories((current) =>
                                      current.map((item, itemIndex) =>
                                        itemIndex === categoryIndex ? { ...item, title: event.target.value } : item
                                      )
                                    )
                                  }
                                  className="border-white/10 bg-black/20"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  type="button"
                                  className="shrink-0 text-destructive hover:bg-destructive/10"
                                  onClick={() =>
                                    setSkillCategories((current) =>
                                      current.filter((_, itemIndex) => itemIndex !== categoryIndex)
                                    )
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="space-y-2">
                                {category.skills.map((skill, skillIndex) => (
                                  <div key={`${skill}-${skillIndex}`} className="flex items-center gap-3">
                                    <Input
                                      value={skill}
                                      onChange={(event) =>
                                        setSkillCategories((current) =>
                                          current.map((item, itemIndex) =>
                                            itemIndex === categoryIndex
                                              ? {
                                                  ...item,
                                                  skills: item.skills.map((entry, entryIndex) =>
                                                    entryIndex === skillIndex ? event.target.value : entry
                                                  ),
                                                }
                                              : item
                                          )
                                        )
                                      }
                                      className="border-white/10 bg-black/20"
                                    />
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      type="button"
                                      className="shrink-0 text-destructive hover:bg-destructive/10"
                                      onClick={() =>
                                        setSkillCategories((current) =>
                                          current.map((item, itemIndex) =>
                                            itemIndex === categoryIndex
                                              ? {
                                                  ...item,
                                                  skills: item.skills.filter((_, entryIndex) => entryIndex !== skillIndex),
                                                }
                                              : item
                                          )
                                        )
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
                                    setSkillCategories((current) =>
                                      current.map((item, itemIndex) =>
                                        itemIndex === categoryIndex
                                          ? { ...item, skills: [...item.skills, "New Skill"] }
                                          : item
                                      )
                                    )
                                  }
                                >
                                  <Plus className="mr-2 h-4 w-4" /> Add Skill
                                </Button>
                              </div>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            type="button"
                            className="w-full border-dashed border-white/10 hover:bg-white/5"
                            onClick={() =>
                              setSkillCategories((current) => [
                                ...current,
                                {
                                  title: "New Category",
                                  icon: Code2,
                                  skills: ["New Skill"],
                                  color: "text-primary",
                                  bg: "bg-primary/10",
                                },
                              ])
                            }
                          >
                            <Plus className="mr-2 h-4 w-4" /> Add Category
                          </Button>
                        </div>
                        <DialogFooter>
                          <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                          <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                          <DialogClose render={<Button type="submit" className="glow-primary" onClick={() => saveSkillCategories(skillCategories)} />}>Save changes</DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </AdminOnly>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {skillCategories.map((cat, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <cat.icon className={cn("h-4 w-4", cat.color)} />
                    <span className="text-xs font-black text-premium uppercase tracking-widest">{cat.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map(skill => (
                      <Badge 
                        key={skill} 
                        className={cn(
                          "rounded-lg border-none font-bold text-[10px] py-1 px-3 transition-all hover:scale-110 cursor-default",
                          cat.bg, cat.color
                        )}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="premium-card border-none p-4">
            <CardHeader>
              <CardTitle className="text-lg font-black text-premium uppercase tracking-widest flex items-center justify-between gap-3">
                <span>Connect</span>
                <AdminOnly>
                  <Dialog>
                    <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>
                      <Edit3 className="mr-2 h-4 w-4" /> Edit
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl bg-card/90 backdrop-blur-xl border-white/10">
                      <DialogHeader>
                        <DialogTitle className="text-premium">Edit Connect Links</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={(e) => { e.preventDefault(); saveConnectLinks(connectLinks); }}>
                        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                          {connectLinks.map((link, linkIndex) => (
                            <div key={`${link.name}-${linkIndex}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 grid gap-3 md:grid-cols-4">
                              <Input
                                value={link.name}
                                onChange={(event) =>
                                  setConnectLinks((current) =>
                                    current.map((item, itemIndex) =>
                                      itemIndex === linkIndex ? { ...item, name: event.target.value } : item
                                    )
                                  )
                                }
                                className="bg-black/20 border-white/10"
                                placeholder="Name"
                              />
                              <Input
                                value={link.url}
                                onChange={(event) =>
                                  setConnectLinks((current) =>
                                    current.map((item, itemIndex) =>
                                      itemIndex === linkIndex ? { ...item, url: event.target.value } : item
                                    )
                                  )
                                }
                                className="bg-black/20 border-white/10"
                                placeholder="URL"
                              />
                              <Input
                                value={link.handle}
                                onChange={(event) =>
                                  setConnectLinks((current) =>
                                    current.map((item, itemIndex) =>
                                      itemIndex === linkIndex ? { ...item, handle: event.target.value } : item
                                    )
                                  )
                                }
                                className="bg-black/20 border-white/10"
                                placeholder="Handle"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                type="button"
                                className="text-destructive hover:bg-destructive/10"
                                onClick={() =>
                                  setConnectLinks((current) => current.filter((_, itemIndex) => itemIndex !== linkIndex))
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
                              setConnectLinks((current) => [
                                ...current,
                                { name: "New Link", url: "https://", handle: "profile", color: "bg-primary", icon: "globe" },
                              ])
                            }
                          >
                            <Plus className="mr-2 h-4 w-4" /> Add Link
                          </Button>
                        </div>
                        <DialogFooter>
                          <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                          <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                          <DialogClose render={<Button type="submit" className="glow-primary" onClick={() => saveConnectLinks(connectLinks)} />}>Save changes</DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </AdminOnly>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {connectLinks.map((link, index) => (
                  <a 
                    key={`${link.name}-${index}`}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({ variant: "outline", className: "h-12 justify-start gap-4 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 group" })}
                  >
                    <div className={cn("h-8 w-8 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform", link.color)}>
                      {link.name.toLowerCase().includes("github") ? (
                        <Github className="h-4 w-4 text-white" />
                      ) : link.name.toLowerCase().includes("linkedin") ? (
                        <Linkedin className="h-4 w-4 text-white" />
                      ) : (
                        <Code2 className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-xs font-black text-premium">{link.name}</span>
                      <span className="text-[10px] font-medium text-muted-foreground">{link.handle}</span>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function User(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
