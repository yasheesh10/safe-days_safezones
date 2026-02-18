// src/pages/HomePage.tsx
import { useTranslation } from "react-i18next";
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
const { t, i18n } = useTranslation();
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
    content:t("chatWelcome"),
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
    title: t("sosFeatureTitle"),
    description: t("sosFeatureDesc"),
  },
  {
    icon: Shield,
    title: t("blockchainFeatureTitle"),
    description: t("blockchainFeatureDesc"),
  },
  {
    icon: Map,
    title: t("heatmapFeatureTitle"),
    description: t("heatmapFeatureDesc"),
  },
  {
    icon: Users,
    title: t("multiroleFeatureTitle"),
    description: t("multiroleFeatureDesc"),
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
  {t("appName")}
</span>

          </div>

          {/* Center: Nav */}
          <nav className="hidden md:flex items-center gap-6 justify-self-center">
            <a
              href="#features"
              className="text-white/70 hover:text-white transition-colors"
            >
              {t("features")}
            </a>
            <a
              href="#dashboards"
              className="text-white/70 hover:text-white transition-colors"
            >
              {t("dashboards")}
            </a>
          </nav>

          {/* Right: Login */}
          <div className="justify-self-end flex items-center gap-3">

  {/* 🌍 Language Switcher */}
  <select
    value={i18n.language}
    onChange={(e) => i18n.changeLanguage(e.target.value)}
    className="text-black px-2 py-1 rounded"
  >
    <option value="en">EN</option>
    <option value="hi">हिंदी</option>
    <option value="mr">मराठी</option>
  </select>

            {user ? (
  <div className="flex items-center gap-3">
    <span className="text-white/80">
  {t("hiUser")}, {user.full_name}
</span>

<Button
  className="bg-red-500 hover:bg-red-600"
  onClick={handleLogout}
>
  {t("logout")}
</Button>

  </div>
) : (
  <Button
    asChild
    className="bg-cyan-500 text-slate-900 font-semibold hover:bg-cyan-400"
  >
    <a href="/login">{t("login")}</a>
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
            >{t("heroBadge")}

            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400">
    {t("heroTitle1")}
  </span>
  <br />
  <span className="text-white">{t("heroTitle2")}</span>
</h1>


            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
  {t("heroSubtitle")}
</p>


            {/* CTA row — added "Check My Safe Zone" */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className={`text-lg px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 font-semibold shadow-xl shadow-blue-600/30 ring-1 ring-blue-300/30 ${focusRing} animate-none`}
                onClick={() => navigate("/emergency-sos")}
              >
                <AlertTriangle className="h-5 w-4 mr-0" />
                {t("emergencySOS")}
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
                {t("exploreFeatures")}
              </Button>

              {/* 🔒 New: Safe Zone CTA */}
              <Button
                size="lg"
                className={`text-lg px-8 py-4 rounded-2xl bg-black hover:bg-zinc-900 font-semibold shadow-lg shadow-black/30 ${focusRing}`}
                onClick={() => navigate("/safezone")}
              >
                <MapPin className="h-5 w-5 mr-0" />
                {t("checkSafeZone")}
              </Button>
            </div>

            {/* Quick stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
                {[t("sosAlerts"), t("blockchainId"), t("aiAssistant")].map(
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
              {t("coreFeatures")}
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              {t("coreFeaturesDesc")}
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
              {t("roleDashboards")}
            </h2>
            <p className="text-white/70">
              {t("roleDashboardsDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
  {
    role: t("tourist"),
    description: t("touristDashboardDesc"),
    bg: "from-blue-600/15 to-blue-600/5",
    href: "/dashboard",
  },
  {
    role: t("police"),
    description: t("policeDashboardDesc"),
    bg: "from-red-500/15 to-red-500/5",
    href: "/police",
  },
]
.map((dashboard, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br ${dashboard.bg} border border-white/10 backdrop-blur hover:shadow-[0_0_24px_rgba(37,99,235,0.18)] transition-all duration-300`}
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-black">
                    {dashboard.role} {t("dashboard")}
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
                    <a href={dashboard.href}>{t("accessDashboard")}</a>
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
                </span><span className="text-lg font-semibold">{t("appName")}</span>

              </div>
              <p className="text-sm text-white/70">{t("smartSafety")}</p>
              <p className="text-sm text-white/70">{t("heroSubtitle")}
              </p>
              <p className="text-xs text-white/60">{t("madeWithLove")}
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">{t("quickLinks")}</h3>
              <div className="space-y-2 text-sm">
                <button
                  onClick={() => navigate("/")}
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  {t("home")}
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  {t("login")}
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  {t("features")}
                </button>
                <button
                  onClick={() => navigate("/about")}
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  {t("safetyGuidelines")}
                </button>
                <button
                  onClick={() => navigate("/emergency-sos")}
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  {t("emergencyContacts")}
                </button>
              </div>
            </div>

            {/* Contact Us */}
            <div id="contact" className="space-y-4 ml-auto mr-100 w-fit">
              <h3 className="font-semibold">{t("contactUs")}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-white/70">
                  <MapPin className="h-4 w-4 text-cyan-300" />
<span>{t("locationCity")}</span>

                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <span className="text-xs">{t("india")}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Phone className="h-4 w-4 text-red-400" />
                  <span>{t("emergencyNumber")} 112</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span>{t("touristHelpline")} 1363</span>
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
              <p className="text-sm text-white/70">{t("copyright")}
              </p>
              <div className="flex gap-6 text-sm">
  <button
    onClick={() => navigate("/privacy-policy")}
    className="text-white/70 hover:text-white transition-colors"
  >
    {t("privacyPolicy")}
  </button>

  <button
    onClick={() => navigate("/terms-of-service")}
    className="text-white/70 hover:text-white transition-colors"
  >
    {t("terms")}
  </button>
</div>
            </div>
            <p className="text-xs text-white/60 mt-4 text-center">
              {t("madeWithLove")}
            </p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      {chatOpen && (
  <div className="fixed bottom-20 right-4 w-80 h-96 bg-slate-900/90 border border-white/10 rounded-xl backdrop-blur-md shadow-[0_0_24px_rgba(0,0,0,0.4)] z-50 flex flex-col">
    {/* Header */}
    <div className="p-4 border-b border-white/10 flex items-center justify-between">
      <h3 className="font-semibold"> {t("chatTitle")}</h3>
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
        >{t("chatWhatIsSite")}
        </Button>

        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            handleQuickQuery("How does Emergency SOS work?")
          }
        >{t("chatEmergency")}
        </Button>

        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            handleQuickQuery("Explain Safe Zones and safety monitoring")
          }
        >{t("chatSafeZones")}
        </Button>

        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            handleQuickQuery("Explain dashboards and user roles")
          }
        >{t("chatDashboards")}
        </Button>

        <Button
          size="sm"
          variant="secondary"
          onClick={() => setChatOpen(false)}
        >{t("chatAskElse")}
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
        placeholder={t("chatPlaceholder")}
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

      >{t("chatSend")}
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
