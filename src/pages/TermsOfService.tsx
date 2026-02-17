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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/ThemeToggle";

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
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10"
    >
      <Icon className="h-4 w-4 text-primary" />
      {title}
    </a>
  );

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>

            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold">Tourist Safety System</span>
            </div>
          </div>

          <ThemeToggle />
        </div>
      </header>

      {/* Hero */}
      <section className="border-b">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-primary text-xs border px-3 py-1 rounded-full">
              <BookOpen className="h-3.5 w-3.5" />
              Legal
            </div>

            <h1 className="mt-4 text-4xl font-bold">Terms of Service</h1>

            <p className="mt-2 text-muted-foreground">
              These terms govern the use of the Tourist Safety System.
            </p>

            <p className="text-xs text-muted-foreground mt-1">
              Last updated: February 2026
            </p>
          </div>
        </div>
      </section>

      {/* Layout */}
      <main className="container mx-auto px-4 py-10 grid lg:grid-cols-12 gap-8">

        {/* Sidebar */}
        <aside className="lg:col-span-3 hidden lg:block">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {sections.map((s) => (
                <NavItem key={s.id} {...s} Icon={s.icon} />
              ))}
            </CardContent>
          </Card>
        </aside>

        {/* Content */}
        <section className="lg:col-span-9 space-y-6">

          {/* Acceptance */}
          <Card id="acceptance">
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              By accessing or using this system, you agree to these Terms of
              Service. If you do not agree, please do not use the platform.
            </CardContent>
          </Card>

          {/* Users */}
          <Card id="users">
            <CardHeader>
              <CardTitle>User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <ul className="list-disc pl-5 space-y-1">
                <li>Provide accurate information</li>
                <li>Keep login credentials secure</li>
                <li>Use SOS features responsibly</li>
                <li>Follow safety instructions and alerts</li>
              </ul>
            </CardContent>
          </Card>

          {/* Prohibited */}
          <Card id="prohibited">
            <CardHeader>
              <CardTitle>Prohibited Activities</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <ul className="list-disc pl-5 space-y-1">
                <li>False emergency reports</li>
                <li>Unauthorized access</li>
                <li>System tampering or hacking</li>
                <li>Harassment or abuse</li>
              </ul>
            </CardContent>
          </Card>

          {/* Emergency */}
          <Card id="emergency">
            <CardHeader>
              <CardTitle>Emergency Services</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              SOS features share your location with authorities. Response times
              may vary. The system assists emergency services but does not
              guarantee immediate assistance.
            </CardContent>
          </Card>

          {/* Liability */}
          <Card id="liability">
            <CardHeader>
              <CardTitle>Liability & Disclaimers</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              The platform is provided “as is”. We are not liable for losses,
              damages, or service interruptions.
            </CardContent>
          </Card>

          {/* Termination */}
          <Card id="termination">
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              We may suspend or terminate access if these terms are violated.
            </CardContent>
          </Card>

          <Card id="contact">
  <CardHeader>
    <CardTitle>Contact Information</CardTitle>
  </CardHeader>

  <CardContent className="text-muted-foreground space-y-3">

    {/* Email */}
    <div className="flex items-center gap-2">
      <Mail className="h-4 w-4" />
      <a
        href="mailto:safety@touristsystem.com"
        className="text-primary hover:underline"
      >
        safety@touristsystem.com
      </a>
    </div>

    {/* Emergency Hotline */}
    <div className="flex items-center gap-2">
      <Phone className="h-4 w-4" />
      <span>Emergency Hotline: 112</span>
    </div>

    {/* Office Hours */}
    <div className="flex items-center gap-2">
      <ScrollText className="h-4 w-4" />
      <span>Office Hours: Mon – Fri, 9:00 AM – 6:00 PM</span>
    </div>

  </CardContent>
</Card>


        </section>
      </main>
    </div>
  );
};

export default TermsOfService;
