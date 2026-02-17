import type { ReactNode } from "react";
import {
  Shield,
  Users,
  Database,
  Settings,
  Globe,
  Activity,
  AlertTriangle,
  Clock,
  TrendingUp,
  MapPin,
  Phone,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress"; // not used; remove if your linter complains
import { ThemeToggle } from "@/ThemeToggle";

const SuperAdminDashboard = () => {
  // type the regions to avoid implicit any in strict TS
  const regions: [string, string][] = [
    ["Assam", "342 users"],
    ["Meghalaya", "198 users"],
    ["Arunachal Pradesh", "156 users"],
    ["Nagaland", "134 users"],
    ["Manipur", "123 users"],
    ["Tripura", "98 users"],
    ["Mizoram", "87 users"],
    ["Sikkim", "109 users"],
  ];

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-[#06090B]">
      {/* —— Hacker vibe backdrop: animated grid + scanlines —— */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background:radial-gradient(circle_at_20%_10%,#00ff95_0%,transparent_25%),radial-gradient(circle_at_80%_80%,#00E5FF_0%,transparent_20%)]" />
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(0,255,160,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,160,.06)_1px,transparent_1px)] [background-size:24px_24px,24px_24px]" />
      <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.06] [background-image:linear-gradient(transparent_95%,rgba(255,255,255,.35)_96%)] [background-size:100%_4px]" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-emerald-400/20 bg-black/40 backdrop-blur-xl">
        <div className="container mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="h-8 w-8 text-emerald-400 drop-shadow-[0_0_12px_#10b981]" />
              <span className="absolute inset-0 blur-[10px] rounded-full bg-emerald-400/30"></span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide font-mono">
                System Administration
              </h1>
              <p className="text-xs text-emerald-300/70">
                Full System Control &amp; Analytics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              asChild
              className="rounded-md bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-[0_0_20px_rgba(16,185,129,.35)] ring-1 ring-emerald-400/40"
            >
              <a href="/login">Logout</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-5 py-8">
        {/* KPI Row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <GlassCard>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-emerald-200/90">
                <span className="text-[13px] font-mono">Active Users</span>
                <Users className="h-4 w-4 text-emerald-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold tracking-tight">1,247</div>
              <p className="text-xs text-emerald-300/80 mt-1">
                <span className="text-emerald-400 font-semibold">+12%</span> from last month
              </p>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-yellow-200/90">
                <span className="text-[13px] font-mono">Emergency Alerts</span>
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold">23</div>
              <p className="text-xs text-yellow-300/90 mt-1">Active incidents</p>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-cyan-200/90">
                <span className="text-[13px] font-mono">Response Time</span>
                <Clock className="h-4 w-4 text-cyan-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold">2.3m</div>
              <p className="text-xs text-cyan-300/80 mt-1">Average response</p>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-emerald-200/90">
                <span className="text-[13px] font-mono">System Health</span>
                <Activity className="h-4 w-4 text-emerald-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold">99.8%</div>
              <p className="text-xs text-emerald-300/80 mt-1">Uptime</p>
            </CardContent>
          </GlassCard>
        </div>

        {/* Analytics Row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* User Distribution */}
          <GlassCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-400" />
                <span className="font-mono">User Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dist label="Tourists" value={68} meta="847 (68%)" bar="emerald" />
              <Dist label="Police Officers" value={12} meta="156 (12%)" bar="cyan" />
              <Dist label="Transport Operators" value={19} meta="234 (19%)" bar="violet" />
              <Dist label="Administrators" value={1} meta="10 (1%)" bar="lime" />
            </CardContent>
          </GlassCard>

          {/* Regional Activity */}
          <GlassCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-cyan-400" />
                <span className="font-mono">Regional Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {regions.map(([name, count]) => (
                <div key={name} className="flex justify-between items-center">
                  <span className="text-sm">{name}</span>
                  <Badge variant="outline" className="border-emerald-400/40 text-emerald-300">
                    {count}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </GlassCard>

          {/* System Status */}
          <GlassCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-violet-400" />
                <span className="font-mono">System Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                ["Blockchain Network", "Operational"],
                ["AI Emergency Detection", "Active"],
                ["Geofencing Services", "Running"],
                ["Cultural Database", "Synced"],
                ["Emergency Network", "24/7 Active"],
              ].map(([label, status]) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-sm">{label}</span>
                  <Badge className="bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
                    {status}
                  </Badge>
                </div>
              ))}

              <Button className="mt-4 w-full rounded-md bg-gradient-to-r from-emerald-600 via-green-600 to-cyan-600 hover:from-emerald-500 hover:via-green-500 hover:to-cyan-500 text-white ring-1 ring-emerald-400/40 shadow-[0_0_20px_rgba(16,185,129,.35)]">
                <Settings className="h-4 w-4 mr-2" />
                System Settings
              </Button>
            </CardContent>
          </GlassCard>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <HackerAction icon={<Globe className="h-5 w-5" />} label="Global Dashboard" />
          <HackerAction icon={<AlertTriangle className="h-5 w-5" />} label="Emergency Control" />
          <HackerAction icon={<TrendingUp className="h-5 w-5" />} label="Analytics Report" />
          <HackerAction icon={<Phone className="h-5 w-5" />} label="Emergency Contacts" />
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-sm text-emerald-300/80">
          For support:{" "}
          <a className="underline hover:text-emerald-200" href="mailto:yashsawanttt2@gmail.com">
            yashsawanttt2@gmail.com
          </a>{" "}
          |{" "}
          <a className="underline hover:text-emerald-200" href="https://www.linkedin.com/in/yashsawantt/">
            LinkedIn
          </a>{" "}
          |{" "}
          <a className="underline hover:text-emerald-200" href="https://github.com/yasheesh10">
            GitHub
          </a>
        </div>
      </main>
    </div>
  );
};

/* ——— Small helpers to keep code tidy ——— */

function GlassCard({ children }: { children: ReactNode }) {
  return (
    <Card className="border border-emerald-400/20 bg-gradient-to-br from-white/5 via-white/5 to-emerald-400/5 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,.45)] rounded-xl">
      {children}
    </Card>
  );
}

function Dist({
  label,
  value,
  meta,
  bar = "emerald",
}: {
  label: string;
  value: number;
  meta: string;
  bar?: "emerald" | "cyan" | "violet" | "lime";
}) {
  const color =
    bar === "emerald"
      ? "from-emerald-500 to-emerald-400"
      : bar === "cyan"
      ? "from-cyan-500 to-blue-500"
      : bar === "violet"
      ? "from-violet-500 to-fuchsia-500"
      : "from-lime-500 to-green-500";

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="text-emerald-200/80">{meta}</span>
      </div>
      <div className="h-2 w-full rounded bg-white/5 overflow-hidden ring-1 ring-white/10">
        <div
          className={`h-full rounded bg-gradient-to-r ${color} shadow-[0_0_12px_rgba(16,185,129,.5)]`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function HackerAction({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <Button className="h-20 flex flex-col items-center justify-center gap-2 rounded-xl bg-black/50 border border-emerald-400/30 text-emerald-100 hover:text-white hover:bg-emerald-500/10 ring-1 ring-emerald-400/30 shadow-[0_8px_30px_rgba(16,185,129,.15)]">
      <span className="text-emerald-400 drop-shadow-[0_0_8px_#10b981]">{icon}</span>
      <span className="text-xs font-mono tracking-wide">{label}</span>
    </Button>
  );
}

export default SuperAdminDashboard;
