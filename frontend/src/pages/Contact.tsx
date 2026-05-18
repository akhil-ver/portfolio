import * as React from "react";
import { Mail, MessageSquare, Send, MapPin, Phone, Github, Linkedin, Instagram, Edit3, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "motion/react";

import { studentData } from "@/src/data/mockData";
import { AdminOnly } from "@/src/lib/admin";

const CONTACT_STORAGE_KEYS = {
  info: "contact-info",
  socials: "contact-socials",
  form: "contact-form",
} as const;

const CONTACT_TITLES_KEY = "portfolio-contact-titles";
export default function Contact() {
  const [contactInfo, setContactInfo] = React.useState({
    email: studentData.profile.email,
    phone: studentData.profile.phone,
    location: "India",
  });
  const [socials, setSocials] = React.useState([
    { name: "GitHub", url: `https://${studentData.profile.github}` },
    { name: "LinkedIn", url: `https://${studentData.profile.linkedin}` },
    { name: "Instagram", url: "https://instagram.com/" },
  ]);
  const [formContent, setFormContent] = React.useState({
    title: "Send a Message",
    subtitle: "Have a question or want to work together? Leave a message.",
    namePlaceholder: "John Doe",
    emailPlaceholder: "john@example.com",
    subjectPlaceholder: "How can I help you?",
    messagePlaceholder: "Write your message here...",
    buttonLabel: "Send Message",
  });
  const [saveMessage, setSaveMessage] = React.useState("");

  const [sectionTitles, setSectionTitles] = React.useState({
    header: "Get in Touch",
    headerSub: "Have a question or want to work together? Drop a message below."
  });
  
  const updateSectionTitle = (key, value) => {
    setSectionTitles(prev => {
      const next = { ...prev, [key]: value };
      window.localStorage.setItem(CONTACT_TITLES_KEY, JSON.stringify(next));
      return next;
    });
  };

  React.useEffect(() => {
    const savedInfo = localStorage.getItem(CONTACT_STORAGE_KEYS.info);
    const savedSocials = localStorage.getItem(CONTACT_STORAGE_KEYS.socials);
    const savedForm = localStorage.getItem(CONTACT_STORAGE_KEYS.form);
    if (savedInfo) {
      try {
        setContactInfo((current) => ({ ...current, ...JSON.parse(savedInfo) }));
      } catch {}
    }
    if (savedSocials) {
      try { setSocials(JSON.parse(savedSocials)); } catch {}
    }
    if (savedForm) {
      try { setFormContent(JSON.parse(savedForm)); } catch {}
    }
  }, []);

  const markSaved = (message: string) => {
    setSaveMessage(message);
    window.setTimeout(() => setSaveMessage(""), 2000);
  };

  const saveInfo = () => {
    localStorage.setItem(CONTACT_STORAGE_KEYS.info, JSON.stringify(contactInfo));
    markSaved("Contact info saved");
  };
  const saveSocials = () => {
    localStorage.setItem(CONTACT_STORAGE_KEYS.socials, JSON.stringify(socials));
    markSaved("Social profiles saved");
  };
  const saveForm = () => {
    localStorage.setItem(CONTACT_STORAGE_KEYS.form, JSON.stringify(formContent));
    markSaved("Contact form saved");
  };

  return (
    <div className="space-y-12 pb-20 max-w-5xl mx-auto">
      <div className="flex flex-col gap-4 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-premium">{sectionTitles.header}</h1>
        <p className="text-muted-foreground text-lg font-medium tracking-tight">{formContent.subtitle}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-5">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-2 space-y-6">
          <Card className="premium-card border-none bg-black/20 h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-black text-premium">Contact Information</CardTitle>
                <CardDescription>Reach out to me directly through any of these channels.</CardDescription>
              </div>
              <AdminOnly>
                <Dialog>
                  <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>
                    <Edit3 className="mr-2 h-4 w-4" /> Edit
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-xl bg-card/95 border-white/10">
                    <DialogHeader><DialogTitle>Edit Contact Information</DialogTitle></DialogHeader>
                    <div className="space-y-4">
                      <Input value={contactInfo.email} onChange={(e) => setContactInfo((current) => ({ ...current, email: e.target.value }))} className="bg-black/20 border-white/10" />
                      <Input value={contactInfo.phone} onChange={(e) => setContactInfo((current) => ({ ...current, phone: e.target.value }))} className="bg-black/20 border-white/10" />
                      <Input value={contactInfo.location} onChange={(e) => setContactInfo((current) => ({ ...current, location: e.target.value }))} className="bg-black/20 border-white/10" />
                    </div>
                    <DialogFooter>
                      <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                      <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                      <DialogClose render={<Button type="button" onClick={saveInfo} />}>Save</DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </AdminOnly>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Email</p>
                    <a href={`mailto:${contactInfo.email}`} className="text-sm font-bold text-premium hover:text-primary transition-colors">{contactInfo.email}</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Mobile</p>
                    <a href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`} className="text-sm font-bold text-premium hover:text-primary transition-colors">{contactInfo.phone}</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Location</p>
                    <p className="text-sm font-bold text-premium">{contactInfo.location}</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Social Profiles</p>
                  <AdminOnly>
                    <Dialog>
                      <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>Edit</DialogTrigger>
                      <DialogContent className="sm:max-w-2xl bg-card/95 border-white/10">
                        <DialogHeader><DialogTitle>Edit Social Profiles</DialogTitle></DialogHeader>
                        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                          {socials.map((item, index) => (
                            <div key={`${item.name}-${index}`} className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-3">
                              <Input value={item.name} onChange={(e) => setSocials((current) => current.map((entry, itemIndex) => itemIndex === index ? { ...entry, name: e.target.value } : entry))} className="bg-black/20 border-white/10" />
                              <Input value={item.url} onChange={(e) => setSocials((current) => current.map((entry, itemIndex) => itemIndex === index ? { ...entry, url: e.target.value } : entry))} className="bg-black/20 border-white/10 md:col-span-2" />
                              <Button variant="ghost" className="text-destructive hover:bg-destructive/10 md:col-span-3" onClick={() => setSocials((current) => current.filter((_, itemIndex) => itemIndex !== index))}><Trash2 className="mr-2 h-4 w-4" /> Remove Link</Button>
                            </div>
                          ))}
                          <Button variant="outline" className="w-full border-dashed border-white/10 hover:bg-white/5" onClick={() => setSocials((current) => [...current, { name: "New Social", url: "https://" }])}><Plus className="mr-2 h-4 w-4" /> Add Social Link</Button>
                        </div>
                        <DialogFooter>
                          <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                          <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                          <DialogClose render={<Button type="button" onClick={saveSocials} />}>Save</DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </AdminOnly>
                </div>
                <div className="flex gap-4">
                  {socials.map((item, index) => {
                    let Icon = Github;
                    if (item.name.toLowerCase().includes("linkedin")) Icon = Linkedin;
                    else if (item.name.toLowerCase().includes("instagram")) Icon = Instagram;
                    return (
                      <a key={`${item.name}-${index}`} href={item.url} target="_blank" rel="noreferrer" className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all text-muted-foreground hover:text-premium">
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-3">
          <Card className="premium-card border-none bg-black/40">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl font-black text-premium">{formContent.title}</CardTitle>
              </div>
              <AdminOnly>
                <Dialog>
                  <DialogTrigger render={<Button variant="outline" size="sm" className="border-white/10 bg-white/5" />}>
                    <Edit3 className="mr-2 h-4 w-4" /> Edit
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl bg-card/95 border-white/10">
                    <DialogHeader><DialogTitle>Edit Contact Form</DialogTitle></DialogHeader>
                    <div className="space-y-4">
                      <Input value={formContent.title} onChange={(e) => setFormContent((current) => ({ ...current, title: e.target.value }))} className="bg-black/20 border-white/10" />
                      <Textarea value={formContent.subtitle} onChange={(e) => setFormContent((current) => ({ ...current, subtitle: e.target.value }))} className="min-h-20 bg-black/20 border-white/10" />
                      <Input value={formContent.namePlaceholder} onChange={(e) => setFormContent((current) => ({ ...current, namePlaceholder: e.target.value }))} className="bg-black/20 border-white/10" />
                      <Input value={formContent.emailPlaceholder} onChange={(e) => setFormContent((current) => ({ ...current, emailPlaceholder: e.target.value }))} className="bg-black/20 border-white/10" />
                      <Input value={formContent.subjectPlaceholder} onChange={(e) => setFormContent((current) => ({ ...current, subjectPlaceholder: e.target.value }))} className="bg-black/20 border-white/10" />
                      <Textarea value={formContent.messagePlaceholder} onChange={(e) => setFormContent((current) => ({ ...current, messagePlaceholder: e.target.value }))} className="min-h-24 bg-black/20 border-white/10" />
                      <Input value={formContent.buttonLabel} onChange={(e) => setFormContent((current) => ({ ...current, buttonLabel: e.target.value }))} className="bg-black/20 border-white/10" />
                    </div>
                    <DialogFooter>
                      <span className="mr-auto text-xs font-bold text-emerald-400">{saveMessage}</span>
                      <DialogClose render={<Button variant="outline" type="button" className="border-white/10" />}>Cancel</DialogClose>
                      <DialogClose render={<Button type="button" onClick={saveForm} />}>Save</DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </AdminOnly>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Your Name</label>
                    <Input placeholder={formContent.namePlaceholder} className="h-12 rounded-xl bg-white/5 border-white/10 focus-visible:ring-primary/50 text-premium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Email Address</label>
                    <Input type="email" placeholder={formContent.emailPlaceholder} className="h-12 rounded-xl bg-white/5 border-white/10 focus-visible:ring-primary/50 text-premium" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Subject</label>
                  <Input placeholder={formContent.subjectPlaceholder} className="h-12 rounded-xl bg-white/5 border-white/10 focus-visible:ring-primary/50 text-premium" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Message</label>
                  <Textarea placeholder={formContent.messagePlaceholder} className="min-h-[150px] rounded-xl bg-white/5 border-white/10 focus-visible:ring-primary/50 text-premium resize-none" />
                </div>
                <Button type="submit" className="w-full rounded-xl h-12 font-bold glow-primary text-sm">
                  <Send className="mr-2 h-4 w-4" /> {formContent.buttonLabel}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
