// src/pages/HomePage.tsx
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import IntroLoader from "../components/IntroLoader";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import { Capacitor } from "@capacitor/core";
import heroVideo from "@/assets/hero-video.mp4";
import indiaProtectedBg from "@/assets/india-protected.jpg";
import { createClient } from "@supabase/supabase-js";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useState, useEffect } from "react";
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
const isNative = Capacitor.isNativePlatform();
const { t, i18n } = useTranslation();
const [introDone, setIntroDone] = useState(
  sessionStorage.getItem("introDone") === "true"
);
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
const { scrollY } = useScroll();

const heroTextY = useTransform(scrollY, [0, 500], [0, 120]);
const heroImageY = useTransform(scrollY, [0, 500], [0, -80]);
const imageScale = useTransform(
  scrollY,
  [1200, 2200],
  [1.15, 1]
);

const imageY = useTransform(
  scrollY,
  [1200, 2200],
  [0, -120]
);

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

  const particles = React.useMemo(
  () => Array.from({ length: 6 }),
  []
);
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
    const res = await fetch("http://localhost:5050/api/chat", {
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

if (!introDone) {
  return (
    <IntroLoader
      onFinish={() => {
        sessionStorage.setItem("introDone", "true");
        setIntroDone(true);
      }}
    />
  );
}
  return (
    <div className="min-h-screen text-white shader-bg relative overflow-hidden">
    
      
    {/* Ambient Glow Effects */}
{/* Floating Particles */}
<div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
  {particles.map((_, i) => (
    <motion.div
      key={i}
      className="absolute w-1 h-1 bg-cyan-300/40 rounded-full"

      initial={{
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: 0.2,
      }}

      animate={{
        y: [null, -300],
        opacity: [0.2, 0.8, 0.2],
      }}

      transition={{
        duration: 10 + Math.random() * 10,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  ))}
</div>
<div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[80px]" />

<div className="absolute top-[30%] right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[80px]" />

<div className="absolute bottom-0 left-[30%] w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[80px]" />
      {/* Header Navigation */}
      <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="sticky top-4 z-50 mx-4
      border border-white/10
      bg-white/5
      backdrop-blur-xl
      rounded-3xl
      shadow-[0_0_40px_rgba(0,0,0,0.25)]"
>
        <div className="container mx-auto px-3 py-2 flex items-center justify-between gap-2">
          {/* Left: Logo */}
          <div className="flex items-center gap-3 justify-self-start">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-white/5 border border-white/10">
              <Shield className="h-5 w-5 text-cyan-300" />
            </span>
            <span className="text-sm sm:text-lg md:text-xl font-semibold tracking-tight leading-tight">
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
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-start sm:justify-end">

  {user ? (
  <div
    className="
    flex items-center justify-between
    w-full sm:w-auto
    gap-2
    "
  >

    {/* LEFT TEXT */}
    <div className="flex flex-col items-start leading-tight">

      <span
        className="
        text-sm sm:text-sm
        font-semibold
        text-white
        "
      >
        {t("dashboardText")}
      </span>

      <span
        className="
        text-xs
        text-white/70
        mt-1
        "
      >
        Hi, {user.full_name}
      </span>

    </div>

    {/* RIGHT CONTROLS */}
    <div className="flex items-center gap-2">

      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
       className="
bg-slate-900/80
border border-cyan-400/30
text-white
rounded-xl
px-3 py-2
backdrop-blur-xl
focus:outline-none
focus:ring-2
focus:ring-cyan-500
"
      >
        <option value="en">EN</option>
        <option value="hi">हिंदी</option>
        <option value="mr">मराठी</option>
      </select>

      <Button
        className="
        bg-red-500 hover:bg-red-600
        text-xs sm:text-sm
        px-2 py-1
        "
        onClick={handleLogout}
      >
        {t("logout")}
      </Button>

    </div>

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
      </motion.header>

    
     {/* Hero Section */}
<motion.section
  className="relative min-h-[100svh] overflow-hidden flex items-center justify-center"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.2 }}
>

{/* Dynamic Background */}
{isNative ? (

  /* MOBILE APP BACKGROUND */
<div className="absolute inset-0 z-0 overflow-hidden">

  {/* Background Image */}
  <div
    className="
    absolute inset-0
    bg-cover
    bg-center
    scale-110
    "
    style={{
      backgroundImage: "url('/india-map.jpg')",
    }}
  />

  {/* Dark Overlay */}
  <div className="
    absolute inset-0
    bg-black/35
  " />

  {/* Blue Gradient Overlay */}
  <div className="
    absolute inset-0
    bg-gradient-to-b
    from-[#06142E]/70
    via-[#0B2E3F]/40
    to-[#041B1F]/80
  " />

  {/* Glow */}
  <div className="
    absolute
    top-20
    left-10
    w-72
    h-72
    bg-cyan-400/20
    blur-3xl
    rounded-full
  " />

</div>

) : (

  /* WEB VIDEO */
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    className="
    absolute inset-0
    w-full h-full
    object-cover
    scale-105
    z-0
    [filter:brightness(1.1)_contrast(1.2)_saturate(1.2)]
    "
  >
    <source src={heroVideo} type="video/mp4" />
  </video>

)}

<div className="
absolute inset-0
z-0
bg-[radial-gradient(circle,transparent_45%,rgba(0,0,0,0.55)_100%)]
" />
{/* Film Grain */}
<div className="
absolute inset-0
opacity-[0.03]
mix-blend-soft-light
bg-[url('https://www.transparenttextures.com/patterns/noise.png')]
z-0
" />


  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/15 z-0" />

  <div className="
absolute inset-0
bg-gradient-to-b
from-black/50
via-black/30
to-[#020617]
" />



  {/* Content */}
<div className="
  absolute inset-0
  z-20
  flex flex-col
  items-center
  justify-start
  pt-20 sm:pt-24 md:justify-center md:pt-0
  text-center
  px-6
  overflow-visible
  ">

    {/* Badge */}
    <div className="flex items-center gap-4 mb-6">

      <Badge className="px-5 py-2 text-sm bg-green-500/15 text-green-300 border border-green-400/30 backdrop-blur-xl">
        {t("safeDaysAiTravel")}
      </Badge>


    </div>

    {/* Heading */}
    <motion.h1
      className="text-4xl sm:text-5xl md:text-6xl xl:text-[5.5rem] font-black leading-tight tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      
    >

<span className="block text-white">
  {t("exploreIndia")}
</span>

        <span className="
        block
        inline-block
        leading-[1.05]
        pb-2
        bg-gradient-to-r
        from-green-400
        via-cyan-300
        to-blue-400
        bg-clip-text
        text-transparent
        drop-shadow-[0_0_20px_rgba(34,211,238,0.25)]
        ">
        {t("safely")}
      </span>

    </motion.h1>
    <div className="h-4" />

    {/* Subtitle */}
    <motion.p
      className="mt-5 text-lg md:text-2xl text-white/75 max-w-md md:max-w-3xl leading-relaxed"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4 }}
    >
      {t("realTimeAlertsDesc")}
    </motion.p>

    {/* Buttons */}
    <motion.div
      className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6 }}
    >

      <Button
        className="
        h-14 md:h-16 w-full sm:min-w-[220px] sm:w-auto
        rounded-2xl
        bg-gradient-to-r from-cyan-500 to-blue-600
hover:from-cyan-400 hover:to-blue-500
text-white
border border-cyan-300/30
        text-lg font-semibold
        shadow-[0_0_30px_rgba(37,99,235,0.45)]
        "
        onClick={() => navigate("/emergency-sos")}
      >
        <AlertTriangle className="mr-2 h-5 w-5" />
        {t("emergencySosTitle")}
      </Button>

      <Button
        variant="outline"
        className="
h-14 md:h-16 w-full sm:min-w-[220px] sm:w-auto
rounded-2xl
border border-cyan-400/30
bg-slate-900/60
backdrop-blur-xl
text-white
hover:bg-slate-800/70
transition-all duration-300
shadow-[0_0_20px_rgba(34,211,238,0.15)]
"
        onClick={() =>
          document
            .getElementById("features")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        {t("exploreFeatures")}
      </Button>

      <Button
        className="
h-14 md:h-16 w-full sm:min-w-[220px] sm:w-auto
rounded-2xl
bg-slate-900/60
hover:bg-slate-800/70
border border-cyan-400/20
backdrop-blur-xl
text-white
transition-all duration-300
shadow-[0_0_20px_rgba(34,211,238,0.1)]
"
onClick={() => navigate("/safezone")}
      >
        
        <MapPin className="mr-2 h-5 w-5" />
        {t("checkSafeZone")}
      </Button>


    </motion.div>

    {/* Stats */}
    <motion.div
      className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
    >

      {[
        ["250+", t("sosAlertsLabel")],
        ["500+", t("safeZonesLabel")],
        ["750+", t("aiAssistantLabel")],
      ].map(([number, label]) => (

        <div
          key={label}
          className="
          px-5 py-4
          rounded-2xl
          bg-white/[0.04]
          border border-white/10
          backdrop-blur-xl
          w-full max-w-[280px] sm:min-w-[180px]
          "
        >

          <div className="text-2xl font-bold text-cyan-300">
            {number}
          </div>

          <div className="text-sm text-white/60 mt-1">
            {label}
          </div>

        </div>

      ))}

    </motion.div>

  </div>

</motion.section>

    {/* Explore Safe Destinations */}
<motion.section
  className="py-20"
  initial={{ opacity: 0, y: 100 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
>
  <div className="container mx-auto px-4">
    
    {/* Heading */}
    <div className="text-center mb-14">
      <h2 className="text-2xl md:text-4xl font-bold mb-3">
        {t("exploreSafeDestinations")}
      </h2>
      <p className="text-white/70 max-w-3xl mx-auto">
        {t("discoverCities")}
      </p>
    </div>

    {/* Cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {[
        {
          name: t("mumbai"),
          safety: t("highSafety"),
          color: "green",
          img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f",
        },
        {
          name: t("goa"),
          safety: t("moderateSafety"),
          color: "yellow",
          img: "https://images.unsplash.com/photo-1587922546307-776227941871",
        },
        {
          name: t("delhi"),
          safety: t("watchZones"),
          color: "red",
          img: "https://images.unsplash.com/photo-1587474260584-136574528ed5",
        },
        {
          name: t("northeastLabel"),
          safety: t("safeScenic"),
          color: "green",
          img: "https://images.unsplash.com/photo-1625654325562-762dcec9e6f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ].map((place, index) => (
        <motion.div
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: index * 0.15 }}
  viewport={{ once: true }}
         key={index}
         onClick={() =>
  navigate(`/safezone?city=${place.name.toLowerCase()}`)
}
         className="group relative rounded-2xl overflow-hidden cursor-pointer 
transition duration-700 ease-out
hover:scale-105 hover:-translate-y-2 
hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        >
          {/* Image */}
          <img
            src={place.img}
            className="w-full h-64 object-cover scale-105 group-hover:scale-110 transition duration-700 ease-out"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition" />

          {/* Content */}
          <div className="absolute bottom-6 left-4">
            <h3 className="text-xl font-semibold">{place.name}</h3>

            <span
              className={`text-sm px-3 py-1 rounded-full mt-2 inline-block ${
                place.color === "green"
                  ? "bg-green-500/20 text-green-300"
                  : place.color === "yellow"
                  ? "bg-yellow-500/20 text-yellow-300"
                  : "bg-red-500/20 text-red-300"
              }`}
            >
              {place.safety}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</motion.section>

{/* Smooth Transition */}
<div className="relative h-32 overflow-hidden -mb-8">

  {/* soft cyan glow */}
  <div className="
  absolute inset-0
  bg-gradient-to-b
  from-transparent
  via-cyan-500/10
  to-slate-950
  blur-3xl
  " />

  {/* dark fade */}
  <div className="
  absolute inset-0
  bg-gradient-to-b
  from-[#020617]
  via-[#020617]/80
  to-transparent
  " />

</div>

{/* Cinematic Storytelling Section */}
<section className="relative min-h-screen overflow-hidden">

  {/* Background Image */}
 <motion.img
  src={indiaProtectedBg}
  className="absolute inset-0 w-full h-full object-cover object-center"
  style={{
  scale: imageScale,
  y: imageY,
  }}
  />

  {/* Dark Overlay */}
 <>
  {/* Dark cinematic layer */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/30 via-black/50 to-black/70" />

  {/* Blue cinematic tint */}
  <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 via-transparent to-black/70" />

  {/* Soft glow */}
  <div className="absolute inset-0 backdrop-blur-[1px]" />
</>


{/* Main Content */}
<div className="relative z-10 min-h-screen flex flex-col gap-8 lg:block px-6 py-20">

  {/* Main Heading */}
  <div className="relative lg:absolute top-0 lg:top-20 left-0 lg:left-20 mb-12 lg:mb-0 text-center lg:text-left">
    <motion.h2
      className="text-5xl sm:text-6xl lg:text-8xl font-black leading-none tracking-tight"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <span className="bg-gradient-to-b from-white via-white to-cyan-300 text-transparent bg-clip-text">
        {t("India,")}
      </span>

      <br />

      <span className="text-white">
        {t("protected")}
      </span>
    </motion.h2>
  </div>

  {/* Floating Card 1 */}
  <motion.div
    initial={{ opacity: 0, y: 80 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="relative lg:absolute top-0 lg:top-32 right-0 lg:right-16 w-full max-w-md mx-auto lg:mx-0 b-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
    <div className="text-cyan-300 text-sm mb-3">
      01
    </div>

    <h3 className="text-2xl font-bold mb-4">
      {t("aiSafeZones")}
    </h3>

    <p className="text-white/70 leading-relaxed">
      {t("aiSafeZonesDesc")}
    </p>
  </motion.div>

  {/* Floating Card 2 */}
  <motion.div
    initial={{ opacity: 0, y: 80 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.2 }}
    className="relative lg:absolute bottom-0 lg:bottom-32 left-0 lg:left-20 w-full max-w-md mx-auto lg:mx-0 mb-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
    <div className="text-cyan-300 text-sm mb-3">
      02
    </div>

    <h3 className="text-2xl font-bold mb-4">
      {t("emergencySosTitle")}
    </h3>

    <p className="text-white/70 leading-relaxed">
      {t("emergencyProtectionDesc")}
    </p>
  </motion.div>

  {/* Floating Card 3 */}
  <motion.div
    initial={{ opacity: 0, y: 80 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.4 }}
    className=" relative lg:absolute bottom-0 lg:bottom-20 right-0 lg:right-24 w-full max-w-md mx-auto lg:mx-0 mb-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
    <div className="text-cyan-300 text-sm mb-3">
      03
    </div>

    <h3 className="text-2xl font-bold mb-4">
      {t("culturalDiscovery")}
    </h3>

    <p className="text-white/70 leading-relaxed">
      {t("culturalDiscoveryDesc")}
    </p>
  </motion.div>

</div>

</section>

<div className="relative h-40 overflow-hidden">

  <div className="
  absolute inset-0
  bg-gradient-to-b
  from-transparent
  via-cyan-500/10
  to-transparent
  blur-3xl
  " />

  <div className="
  absolute inset-0
  bg-gradient-to-b
  from-slate-950
  via-transparent
  to-slate-950
  " />

</div>


      {/* Core Features */}
      <motion.section
  id="features"
  className="py-20"
  initial={{ opacity: 0, y: 100 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
>
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              {t("coreFeatures")}
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              {t("coreFeaturesDesc")}
            </p>
          </div>

          <motion.div
  className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }}
>
            {coreFeatures.map((feature, index) => (
<motion.div
  key={index}
  
  variants={{
    hidden: {
      opacity: 0,
      y: 80,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  }}
  transition={{
    duration: 0.8,
  }}
>
  <TiltCard>
  <Card
className="group relative overflow-hidden
bg-white/5
backdrop-blur-xl
border border-white/10
rounded-2xl p-2
transition-all duration-500
hover:scale-105
hover:border-cyan-400/40
hover:shadow-[0_0_50px_rgba(34,211,238,0.25)]"
              >
                <div className="
                absolute inset-0 opacity-0 group-hover:opacity-100
                transition duration-700 ease-out
                bg-gradient-to-br
              from-cyan-400/10
              via-transparent
            to-blue-500/10
              pointer-events-none
              " />
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto bg-cyan-500/10 border border-cyan-400/20 
                  p-4 rounded-2xl w-16 h-14 md:h-16 flex items-center justify-center mb-4 
                  group-hover:scale-110 group-hover:rotate-6 transition duration-300">
                    <feature.icon className="h-8 w-8 text-cyan-300" />
                  </div>
                  <CardTitle className="text-lg text-white group-hover:text-cyan-300 transition">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="group-hover:translate-y-[-2px] transition">
                  <CardDescription className="text-center text-white/70">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                </Card>
              </TiltCard>  
              </motion.div>
            ))}
            
          </motion.div>
        </div>
      </motion.section>

    
<div className="relative h-40 overflow-hidden">

  <div className="
  absolute inset-0
  bg-gradient-to-r
  from-cyan-500/10
  via-blue-500/10
  to-cyan-500/10
  blur-3xl
  " />

  <div className="
  absolute inset-0
  bg-gradient-to-b
  from-transparent
  via-slate-900/40
  to-transparent
  " />

</div>


      {/* Dashboards Preview */}
      <motion.section
        id="dashboards"
        className="py-20 bg-slate-900/60 border-t border-b border-white/10"
      initial={{ opacity: 0, y: 100 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 1 }}
viewport={{ once: true }}
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-3xl mx-auto">
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
className="group relative overflow-hidden
bg-white/5
backdrop-blur-xl
border border-white/10
rounded-2xl p-6
transition-all duration-500
hover:scale-105
hover:border-cyan-400/40
hover:shadow-[0_0_50px_rgba(34,211,238,0.25)]"
>
  <div className="
absolute inset-0 opacity-0 group-hover:opacity-100
transition duration-700 ease-out
bg-gradient-to-br
from-cyan-400/10
via-transparent
to-blue-500/10
pointer-events-none
" />

  <CardHeader className="text-center space-y-3">

    {/* ICON */}
    <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/20 group-hover:scale-105 transition">
      <Shield className="h-5 w-5 text-blue-300" />
    </div>

    {/* TITLE */}
    <CardTitle className="text-white group-hover:text-blue-300 transition">
      {dashboard.role}
    </CardTitle>

    {/* DESCRIPTION */}
    <CardDescription className="text-white/70">
      {dashboard.description}
    </CardDescription>

  </CardHeader>

  <CardContent className="text-center">
    <Button
      className={`px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-blue-500/50 transition ${focusRing}`}
      asChild
    >
      <a href={dashboard.href}>{t("accessDashboard")}</a>
    </Button>
  </CardContent>
</Card>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-slate-950">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col gap-10">
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
            <div id="contact" className="space-y-4 w-full">
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
                  <span>support@safedays.ai</span>
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
  <div className="fixed bottom-24 right-4 w-80 h-96 bg-slate-900/90 border border-white/10 rounded-xl backdrop-blur-md shadow-[0_0_24px_rgba(0,0,0,0.4)] z-[9999] flex flex-col">
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
    const res = await fetch("http://localhost:5050/api/chat", {
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
        className={`fixed bottom-6 right-4 z-[9999] rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-500 shadow-2xl shadow-blue-600/40 ring-1 ring-blue-300/40 ${focusRing}`}
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

export default React.memo(HomePage);
