// src/pages/HomePage.tsx
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import {
  Shield,
  AlertTriangle,
  Map,
  Users,
  MessageCircle,
  Camera,
  Music,
  Palette,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom"; // ✅ keep just one
import CulturalModal, { CULTURAL_DATA } from "@/CulturalModal";
import heroVideo from "@/assets/hero-video.mp4";
import traditionalDance from "@/assets/traditional-dance.jpg";
import northeastNature from "@/assets/northeast-nature.jpg";
import traditionalCrafts from "@/assets/traditional-crafts.jpg";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

const HomePage = () => {
  const { user, setUser } = useAuth();
const navigate = useNavigate();
const handleLogout = async () => {
  await supabase.auth.signOut();

  // ❌ DO NOT remove registered user
  // localStorage.removeItem("user");  <-- never do this

  // ✅ Only remove session
  localStorage.removeItem("session");

  setUser(null);
  navigate("/login");
};

const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<
  {
    role: "user" | "assistant";
    content: string;
    type?: "options";
  }[]
>([
  {
    role: "assistant",
    content:
      "👋 Welcome! I’m your AI assistant for the Tourist Safety & Incident Response System.\n\nWhat would you like help with?",
    type: "options",
  },
]);


const [input, setInput] = useState("");

  const [selectedCulturalItem, setSelectedCulturalItem] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openCulturalModal = (itemId: string) => {
    const item = CULTURAL_DATA.find((item) => item.id === itemId);
    if (item) {
      setSelectedCulturalItem(item);
      setModalOpen(true);
    }
  };

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/60";

  const coreFeatures = [
    {
      icon: AlertTriangle,
      title: "SOS Emergency Alerts",
      description:
        "Instant emergency response system with GPS location tracking and automated notifications to authorities.",
    },
    {
      icon: Shield,
      title: "Blockchain Safety ID",
      description:
        "Secure, immutable digital identity system for tourists with encrypted personal data protection.",
    },
    {
      icon: Map,
      title: "Travel Safety Heatmaps",
      description:
        "Real-time incident mapping and safety zone visualization powered by AI analytics.",
    },
    {
      icon: Users,
      title: "Multi-Role Dashboards",
      description:
        "Specialized interfaces for tourists, police, transport authorities, and system administrators.",
    },
  ];

  const culturalAddons = [
    {
      icon: Music,
      title: "Cultural Integration",
      description:
        "Folk songs, traditional dances, and cultural heritage showcase for authentic experiences.",
    },
    {
      icon: Camera,
      title: "Nearby Attractions",
      description:
        "AI-powered recommendations for cultural sites, natural wonders, and local experiences.",
    },
    {
      icon: MessageCircle,
      title: "AI Tourist Assistant",
      description:
        "Multilingual chatbot providing cultural insights, safety tips, and travel guidance.",
    },
    {
      icon: Palette,
      title: "Heritage Preservation",
      description:
        "Digital documentation of tribal art, handicrafts, and traditional practices.",
    },
  ];
const handleQuickQuery = async (text: string) => {
  setMessages((prev) => [
    ...prev,
    { role: "user", content: text },
  ]);

  try {
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.reply },
    ]);
  } catch {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "⚠️ Could not reach server.",
      },
    ]);
  }
};

  return (
    <div className="min-h-screen text-white animated-bg relative overflow-hidden">

      {/* Header Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/70 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 grid grid-cols-3 items-center">
          {/* Left: Logo */}
          <div className="flex items-center gap-3 justify-self-start">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-white/5 border border-white/10">
              <Shield className="h-5 w-5 text-cyan-300" />
            </span>
            <span className="text-lg md:text-xl font-semibold tracking-tight">
              Tourist Safety System
            </span>
          </div>

          {/* Center: Nav */}
          <nav className="hidden md:flex items-center gap-6 justify-self-center">
            <a
              href="#features"
              className="text-white/70 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#dashboards"
              className="text-white/70 hover:text-white transition-colors"
            >
              Dashboards
            </a>
          </nav>

          {/* Right: Login */}
          <div className="justify-self-end">
            {user ? (
  <div className="flex items-center gap-3">
    <span className="text-white/80">Hi, {user.full_name}</span>
    <Button
  className="bg-red-500 hover:bg-red-600"
  onClick={handleLogout}
>
  Logout
</Button>

  </div>
) : (
  <Button
    asChild
    className="bg-cyan-500 text-slate-900 font-semibold hover:bg-cyan-400"
  >
    <a href="/login">Login</a>
  </Button>
)}

          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="container mx-auto px-4 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: content */}
          <div className="order-2 md:order-1">
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-2 text-sm bg-cyan-500/15 text-cyan-300 border border-cyan-400/30"
            >
              AI + Blockchain Powered Safety System
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400">
                Tourist Safety &amp;
              </span>
              <br />
              <span className="text-white">Incident Response</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
              Ensuring every traveler’s safety through innovation inspired by our
              people, traditions, and timeless heritage.
            </p>

            {/* CTA row — added "Check My Safe Zone" */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className={`text-lg px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 font-semibold shadow-xl shadow-blue-600/30 ring-1 ring-blue-300/30 ${focusRing} animate-none`}
                onClick={() => navigate("/emergency-sos")}
              >
                <AlertTriangle className="h-5 w-4 mr-0" />
                Emergency SOS
              </Button>

              <Button
                size="lg"
                variant="outline"
                className={`text-lg px-6 py-4 rounded-2xl border border-cyan-300/60 text-cyan-200 bg-cyan-400/10 hover:bg-cyan-400/20 hover:text-white shadow-md shadow-cyan-500/20 ${focusRing}`}
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Features
              </Button>

              {/* 🔒 New: Safe Zone CTA */}
              <Button
                size="lg"
                className={`text-lg px-8 py-4 rounded-2xl bg-black hover:bg-zinc-900 font-semibold shadow-lg shadow-black/30 ${focusRing}`}
                onClick={() => navigate("/safezone")}
              >
                <MapPin className="h-5 w-5 mr-0" />
                Check Safe Zone
              </Button>
            </div>

            {/* Quick stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {["SOS Alerts", "Blockchain ID", "AI Assistant"].map(
                (feature, idx) => (
                  <div
                    key={feature}
                    className="rounded-2xl p-4 text-center bg-white/5 border border-white/10 backdrop-blur"
                  >
                    <div className="text-2xl font-semibold text-cyan-300">
                      {(idx + 1) * 250}+
                    </div>
                    <div className="text-xs text-white/70">{feature}</div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right: media card */}
          {/* Right: media card */}
<div className="order-1 md:order-2">
  <div className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur shadow-[0_0_24px_rgba(34,211,238,0.25)] h-[360px] md:h-[460px]">

    <video
      src={heroVideo}
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    />

  </div>
</div>

        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Core Safety Features
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Harnessing advanced technology to make travel safer across every
              destination.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/5 border border-white/10 backdrop-blur hover:shadow-[0_0_24px_rgba(34,211,238,0.15)] transition-all duration-300"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto bg-cyan-500/15 border border-cyan-400/30 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-cyan-300" />
                  </div>
                  <CardTitle className="text-lg text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-white/70">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboards Preview */}
      <section
        id="dashboards"
        className="py-20 bg-slate-900/60 border-t border-b border-white/10"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Role-Based Access Dashboards
            </h2>
            <p className="text-white/70">
              Specialized interfaces for different user types
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                role: "Tourist",
                description: "SOS, attractions, cultural content",
                bg: "from-blue-600/15 to-blue-600/5",
                href: "/dashboard",
              },
              {
                role: "Police",
                description: "Incident monitoring, emergency response",
                bg: "from-red-500/15 to-red-500/5",
                href: "/police",
              },
            ].map((dashboard, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br ${dashboard.bg} border border-white/10 backdrop-blur hover:shadow-[0_0_24px_rgba(37,99,235,0.18)] transition-all duration-300`}
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-black">
                    {dashboard.role} Dashboard
                  </CardTitle>
                  <CardDescription className="text-black/70">
                    {dashboard.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button
                    className={`px-5 py-2 rounded-xl bg-cyan-500 text-slate-900 font-semibold hover:bg-cyan-400 shadow-lg shadow-cyan-500/25 border-0 ${focusRing}`}
                    asChild
                  >
                    <a href={dashboard.href}>Access Dashboard</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 border border-white/10">
                  <Shield className="h-4 w-4 text-cyan-300" />
                </span>
                <span className="text-lg font-semibold">Tourist Safety</span>
              </div>
              <p className="text-sm text-white/70">Smart Safety System</p>
              <p className="text-sm text-white/70">
                Ensuring every traveler’s safety through innovation inspired by
                our people, traditions, and timeless heritage.
              </p>
              <p className="text-xs text-white/60">
                🧡 Made with care to protect travelers everywhere
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <button
                  onClick={() => navigate("/")}
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => navigate("/about")}
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  Safety Guidelines
                </button>
                <button
                  onClick={() => navigate("/emergency-sos")}
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  Emergency Contacts
                </button>
              </div>
            </div>

            {/* Contact Us */}
            <div id="contact" className="space-y-4 ml-auto mr-100 w-fit">
              <h3 className="font-semibold">Contact Us</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-white/70">
                  <MapPin className="h-4 w-4 text-cyan-300" />
                  <span>Guwahati, Assam</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <span className="text-xs">India</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Phone className="h-4 w-4 text-red-400" />
                  <span>Emergency: 112</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span>Tourist Helpline: 1363</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Mail className="h-4 w-4 text-cyan-300" />
                  <span>safety@netourist.gov.in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-white/70">
                © 2025 Safe-DAYS — Smart Tourist Safety System. All rights
                reserved.
              </p>
              <div className="flex gap-6 text-sm">
  <button
    onClick={() => navigate("/privacy-policy")}
    className="text-white/70 hover:text-white transition-colors"
  >
    Privacy Policy
  </button>

  <button
    onClick={() => navigate("/terms-of-service")}
    className="text-white/70 hover:text-white transition-colors"
  >
    Terms of Service
  </button>
</div>
            </div>
            <p className="text-xs text-white/60 mt-4 text-center">
              Built with ❤️ and innovation to protect every traveler, everywhere.
            </p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      {chatOpen && (
  <div className="fixed bottom-20 right-4 w-80 h-96 bg-slate-900/90 border border-white/10 rounded-xl backdrop-blur-md shadow-[0_0_24px_rgba(0,0,0,0.4)] z-50 flex flex-col">
    {/* Header */}
    <div className="p-4 border-b border-white/10 flex items-center justify-between">
      <h3 className="font-semibold"> AI Assistant</h3>
      <Button
        variant="ghost"
        size="sm"
        className={`text-white hover:bg-white/10 ${focusRing}`}
        onClick={() => setChatOpen(false)}
      >
        ×
      </Button>
    </div>

    {/* Messages */}
    <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
      {messages.map((msg, index) => (
  <div
    key={index}
    className={`p-3 rounded-lg max-w-[90%] whitespace-pre-line ${
      msg.role === "user"
        ? "bg-blue-600 ml-auto text-right"
        : "bg-white/10"
    }`}
  >
    {msg.content}

    {/* First-message options */}
    {msg.type === "options" && (
      <div className="mt-3 flex flex-col gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => handleQuickQuery("Explain what this website does")}
        >
          🤖 What is this website?
        </Button>

        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            handleQuickQuery("How does Emergency SOS work?")
          }
        >
          🚨 Emergency & SOS
        </Button>

        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            handleQuickQuery("Explain Safe Zones and safety monitoring")
          }
        >
          🛡️ Safety & Safe Zones
        </Button>

        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            handleQuickQuery("Explain dashboards and user roles")
          }
        >
          📊 Dashboards & Roles
        </Button>

        <Button
          size="sm"
          variant="secondary"
          onClick={() => setChatOpen(false)}
        >
          ❓ Ask something else
        </Button>
      </div>
    )}
  </div>
))}
</div>

    {/* Input */}
    <div className="p-3 border-t border-white/10 flex gap-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about safety, culture..."
        className="flex-1 rounded-lg bg-slate-800 px-3 py-2 text-sm outline-none text-white"
      />
      <Button
        size="sm"
        className="bg-blue-600 hover:bg-blue-500"
       onClick={async () => {
  if (!input.trim()) return;

  const userMessage = input;

  // show user message immediately
  setMessages((prev) => [
    ...prev,
    { role: "user", content: userMessage },
  ]);
  setInput("");

  try {
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.reply },
    ]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "⚠️ Could not reach server.",
      },
    ]);
  }
}}

      >
        Send
      </Button>
    </div>
  </div>
)}

      {/* Floating Chat Toggle */}
      <Button
        className={`fixed bottom-4 right-4 rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-500 shadow-2xl shadow-blue-600/40 ring-1 ring-blue-300/40 ${focusRing}`}
        onClick={() => setChatOpen(!chatOpen)}
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      {/* Cultural Modal */}
      <CulturalModal
        item={selectedCulturalItem}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
