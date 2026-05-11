import * as React from "react";
import { 
  LayoutDashboard, 
  User, 
  GraduationCap, 
  Briefcase, 
  Award, 
  FileText, 
  Users, 
  LogOut,
  Lock,
  BarChart3,
  Mail
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { studentData } from "@/src/data/mockData";
import { useAdmin } from "@/src/lib/admin";

const navItems = [
  { title: "Overview", icon: LayoutDashboard, href: "/" },
  { title: "Profile", icon: User, href: "/profile" },
  { title: "Academics", icon: GraduationCap, href: "/academics" },
  { title: "Projects", icon: Briefcase, href: "/projects" },
  { title: "Coding Analytics", icon: BarChart3, href: "/coding-analytics" },
  { title: "Certifications", icon: Award, href: "/certifications" },
  { title: "Clubs & Achievements", icon: Users, href: "/clubs" },
  { title: "Resume", icon: FileText, href: "/resume" },
  { title: "Contact", icon: Mail, href: "/contact" },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { isAdmin, login, logout } = useAdmin();
  const [isAdminPanelOpen, setIsAdminPanelOpen] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginError, setLoginError] = React.useState("");
  const panelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsAdminPanelOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAdminLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const didLogin = login(username.trim(), password);

    if (didLogin) {
      setLoginError("");
      setPassword("");
      setIsAdminPanelOpen(false);
    } else {
      setLoginError("Invalid admin username or password.");
    }
  };

  const handleAdminLogout = () => {
    logout();
    setIsAdminPanelOpen(false);
  };

  return (
    <SidebarProvider>
      <div className="site-shell flex min-h-screen w-full bg-background">
        {/* Futuristic Background Blobs */}
        <div className="bg-mesh-container">
          <div className="mesh-blob blob-1" />
          <div className="mesh-blob blob-2" />
          <div className="mesh-blob blob-3" />
        </div>

        <Sidebar collapsible="icon" className="border-r border-white/5 bg-black/20 backdrop-blur-3xl">
          <SidebarHeader className="p-6">
            <div className="flex items-center gap-3 px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
                <span className="text-lg font-black tracking-tighter">AV</span>
              </div>
              <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="text-xl font-black tracking-tighter text-premium leading-none uppercase">
                  Akhil
                </span>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mt-1">
                  SDE Portfolio
                </span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-4">
            <SidebarMenu className="gap-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={location.pathname === item.href}
                    tooltip={item.title}
                    className={cn(
                      "h-12 rounded-xl transition-all duration-300 hover:bg-white/5",
                      location.pathname === item.href && "bg-white/10 text-primary shadow-[inset_0_0_20px_rgba(99,102,241,0.1)] border border-white/5"
                    )}
                    render={<Link to={item.href} className="flex items-center gap-3" />}
                  >
                    <item.icon className={cn("h-5 w-5", location.pathname === item.href ? "text-primary glow-primary" : "text-muted-foreground")} />
                    <span className="font-bold tracking-tight">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-6">
             <SidebarMenu>
                <SidebarMenuItem>
                  {isAdmin ? (
                    <SidebarMenuButton onClick={handleAdminLogout} className="h-12 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-colors">
                      <LogOut className="h-5 w-5" />
                      <span className="font-bold">Admin Logout</span>
                    </SidebarMenuButton>
                  ) : (
                    <SidebarMenuButton onClick={() => setIsAdminPanelOpen(true)} className="h-12 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity">
                      <Lock className="h-5 w-5" />
                      <span className="font-bold">Admin Login</span>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
             </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex flex-col bg-transparent">
          <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/5 bg-black/10 px-8 backdrop-blur-xl">
            <div className="flex items-center gap-6">
              <SidebarTrigger className="h-10 w-10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors" />
            </div>

            <div className="flex items-center gap-4">
              <div className="relative" ref={panelRef}>
                <Button
                  variant="ghost"
                  className="gap-3 rounded-2xl px-3 h-12 hover:bg-white/5 border border-transparent hover:border-white/5 transition-all"
                  onClick={() => setIsAdminPanelOpen((open) => !open)}
                >
                    <Avatar className="h-8 w-8 border-2 border-primary/30">
                      <AvatarImage src={studentData.profile.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">AV</AvatarFallback>
                    </Avatar>
                    <div className="hidden flex-col items-start text-left md:flex">
                      <span className="text-sm font-black tracking-tight text-premium leading-none">{studentData.profile.name}</span>
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mt-1.5">
                        {isAdmin ? "Admin Mode" : "View Only"}
                      </span>
                    </div>
                </Button>

                {isAdminPanelOpen && (
                  <div className="absolute right-0 top-16 z-50 w-80 rounded-3xl border border-white/10 bg-black/80 p-5 shadow-2xl backdrop-blur-2xl">
                    {isAdmin ? (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <p className="text-sm font-black tracking-tight text-premium">Admin Mode Active</p>
                          <p className="text-xs text-muted-foreground">
                            You can now manage edit, upload, and delete actions across the portfolio.
                          </p>
                        </div>
                        <Button onClick={handleAdminLogout} className="w-full rounded-2xl bg-destructive text-destructive-foreground hover:opacity-90">
                          <LogOut className="mr-2 h-4 w-4" /> Admin Logout
                        </Button>
                      </div>
                    ) : (
                      <form className="space-y-4" onSubmit={handleAdminLogin}>
                        <div className="space-y-1">
                          <p className="text-sm font-black tracking-tight text-premium">Admin Login</p>
                          <p className="text-xs text-muted-foreground">
                            Click the name again to close this panel. Visitors can only view the website.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                            Username
                          </label>
                          <Input
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            placeholder="Enter admin username"
                            className="border-white/10 bg-white/5"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                            Password
                          </label>
                          <Input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter admin password"
                            className="border-white/10 bg-white/5"
                          />
                        </div>
                        {loginError && (
                          <p className="text-xs font-bold text-destructive">{loginError}</p>
                        )}
                        <Button type="submit" className="w-full rounded-2xl glow-primary">
                          <Lock className="mr-2 h-4 w-4" /> Login as Admin
                        </Button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
