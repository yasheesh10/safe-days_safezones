import {
  Shield,
  ArrowLeft,
  AlertTriangle,
  Users,
  Gavel,
  Phone,
  Mail,
  FileWarning,
  BookOpen,
  ScrollText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const sections = [
  { id: "acceptance", title: "Acceptance of Terms", icon: Gavel },
  { id: "users", title: "User Responsibilities", icon: Users },
  { id: "prohibited", title: "Prohibited Activities", icon: AlertTriangle },
  { id: "emergency", title: "Emergency Services", icon: Phone },
  { id: "liability", title: "Liability & Disclaimers", icon: FileWarning },
  { id: "termination", title: "Termination", icon: ScrollText },
  { id: "contact", title: "Contact Information", icon: Mail },
];

const TermsOfService = () => {
  const navigate = useNavigate();

  const NavItem = ({ id, title, Icon }: any) => (
    <a
      href={`#${id}`}
      className="
        flex items-center gap-3
        rounded-2xl
        px-3 py-3
        text-sm
        text-white/60
        hover:text-white
        hover:bg-white/10
        transition-all
      "
    >
      <Icon className="h-4 w-4 text-cyan-300" />
      {title}
    </a>
  );

  return (
    <div
      className="
      min-h-screen
      text-white
      relative
      overflow-hidden
      bg-gradient-to-b
      from-[#020617]
      via-[#071427]
      to-[#041B2D]
    "
    >
      {/* Ambient Background Glows */}
      <div
        className="
        absolute
        top-[-120px]
        left-[-120px]
        w-[450px]
        h-[450px]
        bg-cyan-500/15
        blur-[140px]
        rounded-full
      "
      />

      <div
        className="
        absolute
        bottom-[-150px]
        right-[-100px]
        w-[400px]
        h-[400px]
        bg-blue-500/10
        blur-[120px]
        rounded-full
      "
      />

      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-50 relative">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="
                text-white
                hover:bg-white/10
                rounded-2xl
              "
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>

            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-cyan-300" />

              <span className="font-bold text-lg bg-gradient-to-r from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent">
                SAFE DAYS
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative border-b border-white/10">
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl">
            <div
              className="
                inline-flex items-center gap-2
                text-cyan-300
                text-xs
                border border-cyan-400/20
                bg-cyan-500/10
                px-4 py-2
                rounded-full
                backdrop-blur-xl
              "
            >
              <BookOpen className="h-3.5 w-3.5" />
              Legal Documentation
            </div>

            <h1
              className="
                mt-6
                text-5xl md:text-6xl
                font-black
                tracking-tight
              "
            >
              Terms of{" "}
              <span className="text-cyan-300">
                Service
              </span>
            </h1>

            <p className="mt-5 text-xl text-white/70 leading-relaxed">
              These terms govern the use of SAFE DAYS and outline
              responsibilities, safety policies, and platform usage conditions.
            </p>

            <p className="text-sm text-white/40 mt-4">
              Last updated: February 2026
            </p>
          </div>
        </div>
      </section>

      {/* Layout */}
      <main className="container mx-auto px-4 py-14 grid lg:grid-cols-12 gap-8 relative z-10">
        {/* Sidebar */}
        <aside className="lg:col-span-3 hidden lg:block">
          <Card
            className="
              bg-white/5
              border border-white/10
              backdrop-blur-xl
              rounded-3xl
              sticky top-28
            "
          >
            <CardHeader>
              <CardTitle className="text-base text-white">
                Contents
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              {sections.map((s) => (
                <NavItem key={s.id} {...s} Icon={s.icon} />
              ))}
            </CardContent>
          </Card>
        </aside>

        {/* Content */}
        <section className="lg:col-span-9 space-y-8">
          {/* Acceptance */}
          <Card
            id="acceptance"
            className="
              bg-white/5
              border border-white/10
              backdrop-blur-xl
              rounded-3xl
            "
          >
            <CardHeader>
              <CardTitle className="text-white">
                Acceptance of Terms
              </CardTitle>
            </CardHeader>

            <CardContent className="text-white/70 leading-relaxed">
              By accessing or using SAFE DAYS, you agree to comply
              with these Terms of Service. If you do not agree,
              please discontinue use of the platform.
            </CardContent>
          </Card>

          {/* Users */}
          <Card
            id="users"
            className="
              bg-white/5
              border border-white/10
              backdrop-blur-xl
              rounded-3xl
            "
          >
            <CardHeader>
              <CardTitle className="text-white">
                User Responsibilities
              </CardTitle>
            </CardHeader>

            <CardContent className="text-white/70 space-y-3">
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide accurate account information</li>
                <li>Keep login credentials secure</li>
                <li>Use SOS features responsibly</li>
                <li>Follow platform safety instructions</li>
              </ul>
            </CardContent>
          </Card>

          {/* Prohibited */}
          <Card
            id="prohibited"
            className="
              bg-white/5
              border border-white/10
              backdrop-blur-xl
              rounded-3xl
            "
          >
            <CardHeader>
              <CardTitle className="text-white">
                Prohibited Activities
              </CardTitle>
            </CardHeader>

            <CardContent className="text-white/70">
              <ul className="list-disc pl-5 space-y-2">
                <li>False emergency reports</li>
                <li>Unauthorized system access</li>
                <li>Malicious activity or hacking attempts</li>
                <li>Harassment, abuse, or misuse of services</li>
              </ul>
            </CardContent>
          </Card>

          {/* Emergency */}
          <Card
            id="emergency"
            className="
              bg-white/5
              border border-white/10
              backdrop-blur-xl
              rounded-3xl
            "
          >
            <CardHeader>
              <CardTitle className="text-white">
                Emergency Services
              </CardTitle>
            </CardHeader>

            <CardContent className="text-white/70 leading-relaxed">
              SOS features may share your location with emergency
              responders and trusted contacts during active incidents.
              SAFE DAYS assists emergency coordination but does not
              guarantee response times or outcomes.
            </CardContent>
          </Card>

          {/* Liability */}
          <Card
            id="liability"
            className="
              bg-white/5
              border border-white/10
              backdrop-blur-xl
              rounded-3xl
            "
          >
            <CardHeader>
              <CardTitle className="text-white">
                Liability & Disclaimers
              </CardTitle>
            </CardHeader>

            <CardContent className="text-white/70 leading-relaxed">
              SAFE DAYS is provided “as is” without guarantees of
              uninterrupted service. We are not responsible for
              losses, damages, or disruptions caused by external
              factors or emergency circumstances.
            </CardContent>
          </Card>

          {/* Termination */}
          <Card
            id="termination"
            className="
              bg-white/5
              border border-white/10
              backdrop-blur-xl
              rounded-3xl
            "
          >
            <CardHeader>
              <CardTitle className="text-white">
                Termination
              </CardTitle>
            </CardHeader>

            <CardContent className="text-white/70 leading-relaxed">
              We reserve the right to suspend or terminate accounts
              that violate platform policies or misuse emergency services.
            </CardContent>
          </Card>

          {/* Contact */}
          <Card
            id="contact"
            className="
              bg-white/5
              border border-white/10
              backdrop-blur-xl
              rounded-3xl
            "
          >
            <CardHeader>
              <CardTitle className="text-white">
                Contact Information
              </CardTitle>
            </CardHeader>

            <CardContent className="text-white/70 space-y-5">
              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-cyan-300" />

                <a
                  href="mailto:support@safedays.ai"
                  className="text-cyan-300 hover:underline"
                >
                  support@safedays.ai
                </a>
              </div>

              {/* Emergency Hotline */}
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-cyan-300" />

                <span>
                  Emergency Hotline:
                  <span className="text-red-400 font-semibold ml-2">
                    112
                  </span>
                </span>
              </div>

              {/* Office Hours */}
              <div className="flex items-center gap-3">
                <ScrollText className="h-5 w-5 text-cyan-300" />

                <span>
                  Support Availability: 24/7 Emergency Assistance
                </span>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-3">
            SAFE DAYS
          </div>

          <p className="text-white/60 mb-5">
            AI-powered tourist safety platform for secure travel.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-white/60">
            <div>
              Emergency:
              <span className="text-red-400 font-semibold ml-2">
                112
              </span>
            </div>

            <div>
              Tourist Helpline:
              <span className="text-cyan-300 font-semibold ml-2">
                1363
              </span>
            </div>
          </div>

          <p className="mt-8 text-xs text-white/40">
            © 2026 SAFE DAYS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;