import * as React from "react";
import {
  FileText,
  Eye,
  Brain,
  Search,
  RefreshCw,
  Share2,
  ChevronRight,
  FileDown,
  Sparkles,
  Target,
  Plus,
  Edit3,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { studentData } from "@/src/data/mockData";
import { AdminOnly } from "@/src/lib/admin";
import { motion } from "motion/react";

const RESUME_STORAGE_KEYS = {
  meta: "resume-meta",
  keywords: "resume-keywords",
  versions: "resume-versions",
  ats: "resume-ats",
  feedback: "resume-feedback",
  analyzer: "resume-analyzer",
  sectionTitles: "resume-section-titles",
} as const;

function extractGoogleDriveFileId(url: string) {
  const patterns = [
    /\/file\/d\/([^/]+)/,
    /[?&]id=([^&]+)/,
    /\/d\/([^/]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return "";
}

function isGoogleDriveUrl(url: string) {
  return /drive\.google\.com/.test(url);
}

function getResumePreviewUrl(url: string) {
  if (!url) {
    return "/akhil-resume.pdf";
  }

  if (isGoogleDriveUrl(url)) {
    const fileId = extractGoogleDriveFileId(url);
    return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : url;
  }

  return url;
}

function getResumeDownloadUrl(url: string) {
  if (!url) {
    return "/akhil-resume.pdf";
  }

  if (isGoogleDriveUrl(url)) {
    const fileId = extractGoogleDriveFileId(url);
    return fileId ? `https://drive.google.com/uc?export=download&id=${fileId}` : url;
  }

  return url;
}

function getResumeShareUrl(url: string) {
  if (!url) {
    return `${window.location.origin}/akhil-resume.pdf`;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${window.location.origin}${url}`;
}

export default function Resume() {
  const defaultResumeVersions = [
    { id: 1, name: "SDE Role Resume", date: "2024-04-10", fileUrl: "/resume-versions/resume.pdf" },
    { id: 2, name: "AI/ML Specialist Resume", date: "2024-03-25", fileUrl: "/resume-versions/resume-copy.pdf" },
    { id: 3, name: "Resume Copy 2", date: "2026-05-02", fileUrl: "/resume-versions/resume-copy-2.pdf" },
    { id: 4, name: "Resume 1", date: "2026-05-02", fileUrl: "/resume-versions/resume1.pdf" },
    { id: 5, name: "Resume RE1", date: "2026-05-02", fileUrl: "/resume-versions/re1.pdf" },
    { id: 6, name: "Resume Backup PDF", date: "2026-05-02", fileUrl: "/resume-versions/e49b2461-b7e4-4dfe-b47f-cbe93fd83d9b.pdf" },
  ];

  const [resumeMeta, setResumeMeta] = React.useState({
    fileName: "Akhil_Verma_SDE_Resume.pdf",
    lastUpdated: studentData.resume.lastUpdated,
    fileUrl: "/akhil-resume.pdf",
  });
  const [keywords, setKeywords] = React.useState(studentData.resume.skills);
  const [versions, setVersions] = React.useState(defaultResumeVersions);
  const [ats, setAts] = React.useState({
    score: studentData.resume.atsScore,
    readability: 95,
    formatting: 100,
    impactMetrics: 65,
  });
  const [feedback, setFeedback] = React.useState(studentData.resume.feedback);
  const [analyzer, setAnalyzer] = React.useState({
    targetRole: "",
  });
  const [saveMessage, setSaveMessage] = React.useState("");

  const [sectionTitles, setSectionTitles] = React.useState({
    header: "Resume Intelligence",
    headerSub: "Akhil Verma | Software Development Engineer",
    keywords: "Keyword Optimization",
    versions: "Resume Versions",
    ats: "ATS Score",
    feedback: "AI Resume Feedback",
    analyzer: "Job Match Analyzer"
  });
  
  const updateSectionTitle = (key, value) => {
    setSectionTitles(prev => {
      const next = { ...prev, [key]: value };
      window.localStorage.setItem(RESUME_STORAGE_KEYS.sectionTitles, JSON.stringify(next));
      return next;
    });
  };

  React.useEffect(() => {
    const savedTitles = localStorage.getItem(RESUME_STORAGE_KEYS.sectionTitles);
    if (savedTitles) {
      try { setSectionTitles(JSON.parse(savedTitles)); } catch(e) {}
    }
    const savedMeta = localStorage.getItem(RESUME_STORAGE_KEYS.meta);
    const savedKeywords = localStorage.getItem(RESUME_STORAGE_KEYS.keywords);
    const savedVersions = localStorage.getItem(RESUME_STORAGE_KEYS.versions);
    const savedAts = localStorage.getItem(RESUME_STORAGE_KEYS.ats);
    const savedFeedback = localStorage.getItem(RESUME_STORAGE_KEYS.feedback);
    const savedAnalyzer = localStorage.getItem(RESUME_STORAGE_KEYS.analyzer);
    if (savedMeta) {
      try { setResumeMeta(JSON.parse(savedMeta)); } catch {}
    }
    if (savedKeywords) {
      try { setKeywords(JSON.parse(savedKeywords)); } catch {}
    }
    if (savedVersions) {
      try {
        const parsed = JSON.parse(savedVersions);
        const merged = [
          ...parsed,
          ...defaultResumeVersions.filter(
            (defaultVersion) =>
              !parsed.some(
                (savedVersion: any) =>
                  savedVersion.id === defaultVersion.id || savedVersion.fileUrl === defaultVersion.fileUrl
              )
          ),
        ];
        setVersions(merged);
        localStorage.setItem(RESUME_STORAGE_KEYS.versions, JSON.stringify(merged));
      } catch {}
    }
    if (savedAts) {
      try { setAts(JSON.parse(savedAts)); } catch {}
    }
    if (savedFeedback) {
      try { setFeedback(JSON.parse(savedFeedback)); } catch {}
    }
    if (savedAnalyzer) {
      try { setAnalyzer(JSON.parse(savedAnalyzer)); } catch {}
    }
  }, []);

  const markSaved = (message: string) => {
    setSaveMessage(message);
    window.setTimeout(() => setSaveMessage(""), 2000);
  };

  const saveMeta = () => {
    localStorage.setItem(RESUME_STORAGE_KEYS.meta, JSON.stringify(resumeMeta));
    markSaved("Resume info saved");
  };

  const handleShareResume = async () => {
    const resumeUrl = getResumeShareUrl(resumeMeta.fileUrl);
    try {
      if (navigator.share) {
        await navigator.share({
          title: resumeMeta.fileName,
          text: "Akhil Verma Resume",
          url: resumeUrl,
        });
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(resumeUrl);
        alert("Resume link copied to clipboard.");
        return;
      }
    } catch {
      // fall through
    }

    window.prompt("Copy your resume link:", resumeUrl);
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = getResumeDownloadUrl(resumeMeta.fileUrl);
    link.download = resumeMeta.fileName.endsWith(".pdf") ? resumeMeta.fileName : `${resumeMeta.fileName}.pdf`;
    link.target = "_blank";
    link.rel = "noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreviewResume = () => {
    window.open(getResumePreviewUrl(resumeMeta.fileUrl), "_blank", "noopener,noreferrer");
  };
  const handlePreviewResumeVersion = (fileUrl: string) => {
    window.open(getResumePreviewUrl(fileUrl), "_blank", "noopener,noreferrer");
  };
  const handleDownloadResumeVersion = (fileUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = getResumeDownloadUrl(fileUrl);
    link.download = fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`;
    link.target = "_blank";
    link.rel = "noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const saveKeywords = () => {
    localStorage.setItem(RESUME_STORAGE_KEYS.keywords, JSON.stringify(keywords));
    markSaved("Keywords saved");
  };
  const saveVersions = () => {
    localStorage.setItem(RESUME_STORAGE_KEYS.versions, JSON.stringify(versions));
    markSaved("Versions saved");
  };
  const saveAts = () => {
    localStorage.setItem(RESUME_STORAGE_KEYS.ats, JSON.stringify(ats));
    markSaved("ATS score saved");
  };
  const saveFeedback = () => {
    localStorage.setItem(RESUME_STORAGE_KEYS.feedback, JSON.stringify(feedback));
    markSaved("Resume feedback saved");
  };
  const saveAnalyzer = () => {
    localStorage.setItem(RESUME_STORAGE_KEYS.analyzer, JSON.stringify(analyzer));
    markSaved("Analyzer saved");
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <AdminOnly>
          <div className="absolute top-4 left-4 z-20">
            <Dialog>
              <DialogTrigger render={<Button variant="outline" className="rounded-2xl h-10 px-4 font-bold border-white/10 hover:bg-white/5"><Edit3 className="mr-2 h-4 w-4" /> Edit Title</Button>} />
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
          </div>
        </AdminOnly>
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            {sectionTitles.header}
          </h1>
          <p className="text-sm font-black text-muted-foreground uppercase tracking-widest">
            {sectionTitles.headerSub}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 border-indigo-500/20" onClick={handleShareResume}>
            <Share2 className="h-4 w-4" /> Share Link
          </Button>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700" onClick={handleDownloadResume}>
            <FileDown className="h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none bg-card/50 backdrop-blur-xl shadow-sm overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 bg-accent/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-indigo-500" />
                </div>
                <div>
                  <CardTitle className="text-base">{resumeMeta.fileName}</CardTitle>
                  <CardDescription className="text-[10px]">Last updated: {resumeMeta.lastUpdated}</CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs gap-2"
                  onClick={handlePreviewResume}
                >
                  <Eye className="h-3.5 w-3.5" /> Preview
                </Button>
                <AdminOnly>
                  <Dialog>
                    <DialogTrigger render={<Button variant="ghost" size="sm" className="h-8 text-xs gap-2" />}>
                      <RefreshCw className="h-3.5 w-3.5" /> Update
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg bg-card/95 border-white/10">
                      <DialogHeader><DialogTitle>Edit Resume Info</DialogTitle></DialogHeader>
                      <div className="space-y-4">
                        <Input value={resumeMeta.fileName} onChange={(e) => setResumeMeta((current) => ({ ...current, fileName: e.target.value }))} className="bg-black/20 border-white/10" />
                        <Input value={resumeMeta.lastUpdated} onChange={(e) => setResumeMeta((current) => ({ ...current, lastUpdated: e.target.value }))} className="bg-black/20 border-white/10" />
                        <Input value={resumeMeta.fileUrl} onChange={(e) => setResumeMeta((current) => ({ ...current, fileUrl: e.target.value }))} className="bg-black/20 border-white/10" placeholder="PDF URL or Google Drive link" />
                        <p className="text-xs text-muted-foreground">
                          Paste a direct PDF link or a Google Drive file link. The page will auto-use Drive preview and PDF download URLs.
                        </p>
                      </div>
                      <DialogFooter>
                        <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                        <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                        <DialogClose render={<Button type="button" onClick={saveMeta} />}>Save</DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </AdminOnly>
              </div>
            </CardHeader>
            <CardContent className="p-0 aspect-[1/1.4] relative overflow-hidden bg-slate-900/50">
              <iframe
                src={getResumePreviewUrl(resumeMeta.fileUrl)}
                title="Akhil Resume Preview"
                className="h-full w-full"
              />
            </CardContent>
          </Card>

          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="border-none bg-card/50 backdrop-blur-xl shadow-sm">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Target className="h-4 w-4 text-indigo-500" /> {sectionTitles.keywords}
                </CardTitle>
                <AdminOnly>
                  <Dialog>
                    <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>Edit</DialogTrigger>
                    <DialogContent className="sm:max-w-2xl bg-card/95 border-white/10">
                      <DialogHeader><DialogTitle>Edit Resume Keywords</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mb-4">
                        <Input value={sectionTitles.keywords} onChange={(e) => updateSectionTitle("keywords", e.target.value)} className="bg-black/20 border-white/10" placeholder="Section Title" />
                      </div>
                      <div className="space-y-4">
                        {keywords.map((keyword, index) => (
                          <div key={`${keyword}-${index}`} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                            <Input value={keyword} onChange={(e) => setKeywords((current) => current.map((item, itemIndex) => itemIndex === index ? e.target.value : item))} className="bg-black/20 border-white/10" />
                            <Button variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => setKeywords((current) => current.filter((_, itemIndex) => itemIndex !== index))}><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full border-dashed border-white/10 hover:bg-white/5" onClick={() => setKeywords((current) => [...current, "New Keyword"])}><Plus className="mr-2 h-4 w-4" /> Add Keyword</Button>
                      </div>
                      <DialogFooter>
                        <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                        <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                        <DialogClose render={<Button type="button" onClick={saveKeywords} />}>Save</DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </AdminOnly>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {keywords.map((skill, i) => (
                    <Badge key={`${skill}-${i}`} variant="secondary" className="bg-indigo-500/5 text-indigo-500 border-none text-[10px]">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground">
                  AI detected these as your strongest keywords. Adding "System Design" could increase match rate by 15%.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none bg-card/50 backdrop-blur-xl shadow-sm">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-500" /> {sectionTitles.versions}
                </CardTitle>
                <AdminOnly>
                  <Dialog>
                    <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>Edit</DialogTrigger>
                    <DialogContent className="sm:max-w-2xl bg-card/95 border-white/10">
                      <DialogHeader><DialogTitle>Edit Resume Versions</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mb-4">
                        <Input value={sectionTitles.versions} onChange={(e) => updateSectionTitle("versions", e.target.value)} className="bg-black/20 border-white/10" placeholder="Section Title" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Paste a direct PDF URL or a Google Drive file link for each resume version. Preview and download will auto-convert Drive links.
                      </p>
                      <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                        {versions.map((version: any, index: number) => (
                          <div key={`${version.name}-${index}`} className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-4">
                            <Input value={version.name} onChange={(e) => setVersions((current) => current.map((item: any, itemIndex: number) => itemIndex === index ? { ...item, name: e.target.value } : item))} className="bg-black/20 border-white/10" />
                            <Input value={version.date} onChange={(e) => setVersions((current) => current.map((item: any, itemIndex: number) => itemIndex === index ? { ...item, date: e.target.value } : item))} className="bg-black/20 border-white/10" />
                            <Input value={version.fileUrl || ""} onChange={(e) => setVersions((current) => current.map((item: any, itemIndex: number) => itemIndex === index ? { ...item, fileUrl: e.target.value } : item))} className="bg-black/20 border-white/10" placeholder="PDF or Drive link" />
                            <Button variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => setVersions((current) => current.filter((_: any, itemIndex: number) => itemIndex !== index))}><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full border-dashed border-white/10 hover:bg-white/5" onClick={() => setVersions((current) => [...current, { id: Date.now(), name: "New Version", date: "Today", fileUrl: "" }])}><Plus className="mr-2 h-4 w-4" /> Add Version</Button>
                      </div>
                      <DialogFooter>
                        <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                        <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                        <DialogClose render={<Button type="button" onClick={saveVersions} />}>Save</DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </AdminOnly>
              </CardHeader>
              <CardContent className="space-y-2">
                {versions.map((version: any, i: number) => (
                  <div key={`${version.name}-${i}`} className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-accent/30 transition-colors group">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground group-hover:text-purple-500 transition-colors" />
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold">{version.name}</p>
                        <p className="text-[10px] text-muted-foreground">{version.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => handlePreviewResumeVersion(version.fileUrl || resumeMeta.fileUrl)}>
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs border-white/10" onClick={() => handleDownloadResumeVersion(version.fileUrl || resumeMeta.fileUrl, version.name)}>
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-none bg-card/50 backdrop-blur-xl shadow-sm overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
            <CardHeader className="text-center pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{sectionTitles.ats}</CardTitle>
                <AdminOnly>
                  <Dialog>
                    <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>Edit</DialogTrigger>
                    <DialogContent className="sm:max-w-xl bg-card/95 border-white/10">
                      <DialogHeader><DialogTitle>Edit ATS Score</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mb-4">
                        <Input value={sectionTitles.ats} onChange={(e) => updateSectionTitle("ats", e.target.value)} className="bg-black/20 border-white/10" placeholder="Section Title" />
                      </div>
                      <div className="space-y-4">
                        <Input type="number" value={ats.score} onChange={(e) => setAts((current) => ({ ...current, score: Number(e.target.value || 0) }))} className="bg-black/20 border-white/10" />
                        <Input type="number" value={ats.readability} onChange={(e) => setAts((current) => ({ ...current, readability: Number(e.target.value || 0) }))} className="bg-black/20 border-white/10" />
                        <Input type="number" value={ats.formatting} onChange={(e) => setAts((current) => ({ ...current, formatting: Number(e.target.value || 0) }))} className="bg-black/20 border-white/10" />
                        <Input type="number" value={ats.impactMetrics} onChange={(e) => setAts((current) => ({ ...current, impactMetrics: Number(e.target.value || 0) }))} className="bg-black/20 border-white/10" />
                      </div>
                      <DialogFooter>
                        <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                        <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                        <DialogClose render={<Button type="button" onClick={saveAts} />}>Save</DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </AdminOnly>
              </div>
              <div className="mt-4 relative inline-flex items-center justify-center">
                <svg className="h-32 w-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-accent/20" />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={364.4}
                    initial={{ strokeDashoffset: 364.4 }}
                    animate={{ strokeDashoffset: 364.4 - (364.4 * ats.score) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-indigo-500"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black">{ats.score}</span>
                  <span className="text-[10px] font-bold text-muted-foreground">EXCELLENT</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Readability</span><span className="font-bold text-emerald-500">{ats.readability}%</span></div>
              <div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Formatting</span><span className="font-bold text-emerald-500">{ats.formatting}%</span></div>
              <div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Impact Metrics</span><span className="font-bold text-amber-500">{ats.impactMetrics}%</span></div>
            </CardContent>
          </Card>

          <Card className="border-none bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-xl shadow-indigo-500/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2"><Brain className="h-5 w-5" /> {sectionTitles.feedback}</CardTitle>
                <CardDescription className="text-indigo-100">Actionable insights to improve match rate</CardDescription>
              </div>
              <AdminOnly>
                <Dialog>
                  <DialogTrigger render={<Button variant="secondary" size="sm" className="bg-white/10 text-white border-none hover:bg-white/20" />}>Edit</DialogTrigger>
                  <DialogContent className="sm:max-w-2xl bg-card/95 border-white/10 text-foreground">
                    <DialogHeader><DialogTitle>Edit Resume Feedback</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mb-4">
                      <Input value={sectionTitles.feedback} onChange={(e) => updateSectionTitle("feedback", e.target.value)} className="bg-black/20 border-white/10" placeholder="Section Title" />
                    </div>
                    <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                      {feedback.map((item, index) => (
                        <div key={`${item}-${index}`} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                          <Textarea value={item} onChange={(e) => setFeedback((current) => current.map((entry, itemIndex) => itemIndex === index ? e.target.value : entry))} className="min-h-24 bg-black/20 border-white/10" />
                          <Button variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => setFeedback((current) => current.filter((_, itemIndex) => itemIndex !== index))}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full border-dashed border-white/10 hover:bg-white/5" onClick={() => setFeedback((current) => [...current, "New feedback item"])}>
                        <Plus className="mr-2 h-4 w-4" /> Add Feedback
                      </Button>
                    </div>
                    <DialogFooter>
                      <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                      <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                      <DialogClose render={<Button type="button" onClick={saveFeedback} />}>Save</DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </AdminOnly>
            </CardHeader>
            <CardContent className="space-y-4">
              {feedback.map((item, i) => (
                <div key={`${item}-${i}`} className="flex items-start gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
                  <div className="mt-1 h-4 w-4 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Sparkles className="h-2.5 w-2.5 text-white" />
                  </div>
                  <p className="text-xs leading-relaxed font-medium">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none bg-card/50 backdrop-blur-xl shadow-sm">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Search className="h-4 w-4 text-indigo-500" /> {sectionTitles.analyzer}
              </CardTitle>
              <AdminOnly>
                <Dialog>
                  <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>Edit</DialogTrigger>
                  <DialogContent className="sm:max-w-xl bg-card/95 border-white/10">
                    <DialogHeader><DialogTitle>Edit Job Match Analyzer</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mb-4">
                      <Input value={sectionTitles.analyzer} onChange={(e) => updateSectionTitle("analyzer", e.target.value)} className="bg-black/20 border-white/10" placeholder="Section Title" />
                    </div>
                    <div className="space-y-4">
                      <Textarea value={analyzer.targetRole} onChange={(e) => setAnalyzer((current) => ({ ...current, targetRole: e.target.value }))} className="min-h-28 bg-black/20 border-white/10" />
                    </div>
                    <DialogFooter>
                      <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                      <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                      <DialogClose render={<Button type="button" onClick={saveAnalyzer} />}>Save</DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </AdminOnly>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Target Role</p>
                <Input value={analyzer.targetRole} placeholder="Paste Job Description here..." className="bg-background/50 border-none text-xs h-20" readOnly />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
