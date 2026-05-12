import { useState } from "react";
import {
  Shield,
  AlertTriangle,
  Phone,
  MapPin,
  Clock,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const EmergencySOS = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [sosActive, setSosActive] = useState(false);
  const [emergencyType, setEmergencyType] = useState<string>("");

  const handleSOS = (type: string) => {
    setEmergencyType(type);
    setSosActive(true);

    toast({
      title: "SOS Alert Activated",
      description: `${type} emergency reported. Authorities have been notified.`,
      variant: "destructive",
    });

    setTimeout(() => {
      setSosActive(false);
      setEmergencyType("");
    }, 5000);
  };

  const emergencyTypes = [
    {
      type: "Medical Emergency",
      icon: Phone,
      color: "bg-red-500",
      description: "Medical assistance required immediately",
    },
    {
      type: "Security Threat",
      icon: Shield,
      color: "bg-orange-500",
      description: "Personal safety or security concern",
    },
    {
      type: "Natural Disaster",
      icon: AlertTriangle,
      color: "bg-yellow-500",
      description: "Earthquake, flood, or weather emergency",
    },
    {
      type: "Lost / Stranded",
      icon: MapPin,
      color: "bg-blue-500",
      description: "Unable to find way or transportation",
    },
  ];

  return (
    <div className="
min-h-screen
text-white
relative
overflow-hidden
bg-gradient-to-b
from-[#020617]
via-[#071427]
to-[#041B2D]
">
      {/* Ambient Background Glows */}
{/* Top Left Glow */}
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

{/* Top Right Glow */}
<div
  className="
  absolute
  top-[200px]
  right-[-100px]
  w-[350px]
  h-[350px]
  bg-blue-500/10
  blur-[120px]
  rounded-full
  "
/>

{/* Bottom Glow */}
<div
  className="
  absolute
  bottom-[-150px]
  left-1/2
  -translate-x-1/2
  w-[500px]
  h-[300px]
  bg-purple-500/10
  blur-[140px]
  rounded-full
  "
/>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-cyan-300" />

            <span className="text-xl font-bold bg-gradient-to-r from-green-400 via-cyan-300 to-orange-300 bg-clip-text text-transparent">
              SAFE DAYS SOS
            </span>
          </div>

          <Button
            variant="outline"
            className="
              bg-white/5
              border border-white/10
              backdrop-blur-xl
              rounded-2xl
              hover:bg-white/10
              text-white
            "
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>
      </header>

      {/* SOS Banner */}
      {sosActive && (
        <div className="bg-red-500 text-white p-4 animate-pulse">
          <div className="container mx-auto flex items-center justify-center gap-4 text-center">
            <AlertTriangle className="h-6 w-6" />

            <span className="font-bold">
              SOS ACTIVE : {emergencyType} - Authorities Notified
            </span>

            <AlertTriangle className="h-6 w-6" />
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div
            className="
              w-28 h-28
              rounded-full
              bg-red-500/10
              border border-red-500/20
              flex items-center justify-center
              mx-auto mb-8
              backdrop-blur-xl
            "
          >
            <AlertTriangle className="h-14 w-14 text-red-400" />
          </div>

          <h1
            className="
              text-5xl md:text-7xl
              font-black
              tracking-tight
              leading-none
              mb-8
            "
          >
            Emergency <span className="text-red-400">SOS</span>
          </h1>

          <p
            className="
              text-lg md:text-xl
              text-white/70
              max-w-2xl
              mx-auto
              leading-relaxed
              mb-14
            "
          >
            Instant emergency assistance with live location tracking,
            trusted contact alerts, and rapid response coordination.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: Clock,
                title: "Fast Response",
                desc: "Under 5 minutes",
              },
              {
                icon: MapPin,
                title: "Live Tracking",
                desc: "Real-time GPS",
              },
              {
                icon: Users,
                title: "Multi Agency",
                desc: "Police & Medical",
              },
              {
                icon: Zap,
                title: "24/7 Active",
                desc: "Always available",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="
                  bg-white/5
                  border border-white/10
                  backdrop-blur-xl
                  rounded-3xl
                  p-5
                "
              >
                <item.icon className="h-8 w-8 text-cyan-300 mx-auto mb-3" />

                <div className="font-semibold text-white mb-1">
                  {item.title}
                </div>

                <div className="text-sm text-white/60">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Select Emergency Type
            </h2>

            <p className="text-xl text-white/60">
              Choose the emergency category for faster response coordination
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {emergencyTypes.map((emergency, index) => (
              <Card
                key={index}
                className={`
                  bg-white/5
                  border border-white/10
                  backdrop-blur-xl
                  rounded-3xl
                  transition-all duration-300
                  cursor-pointer
                  hover:border-red-400/40
                  hover:shadow-[0_0_35px_rgba(239,68,68,0.15)]
                  hover:-translate-y-1
                  ${
                    sosActive && emergencyType === emergency.type
                      ? "border-red-400 bg-red-500/10"
                      : ""
                  }
                `}
                onClick={() => handleSOS(emergency.type)}
              >
                <CardHeader className="text-center">
                  <div
                    className={`
                      ${emergency.color}
                      p-4
                      rounded-full
                      w-16 h-16
                      flex items-center justify-center
                      mx-auto mb-4
                    `}
                  >
                    <emergency.icon className="h-8 w-8 text-white" />
                  </div>

                  <CardTitle className="text-lg text-white">
                    {emergency.type}
                  </CardTitle>
                </CardHeader>

                <CardContent className="text-center">
                  <CardDescription className="mb-4 text-white/60">
                    {emergency.description}
                  </CardDescription>

                  <Button
                    size="sm"
                    className="
                      w-full
                      h-11
                      rounded-2xl
                      bg-gradient-to-r
                      from-red-500
                      to-orange-400
                      hover:scale-[1.02]
                      transition-all
                      font-semibold
                    "
                    disabled={sosActive}
                  >
                    {sosActive && emergencyType === emergency.type
                      ? "SOS ACTIVE"
                      : "Activate SOS"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              How Emergency Response Works
            </h2>

            <p className="text-xl text-white/60">
              Advanced technology ensures rapid response in critical situations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Alert Triggered",
                desc: "Emergency alert activated with automatic GPS location capture",
              },
              {
                step: "2",
                title: "Authorities Notified",
                desc: "Police, medical teams, and trusted contacts receive alerts instantly",
              },
              {
                step: "3",
                title: "Help Dispatched",
                desc: "Nearest response team dispatched with real-time tracking",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="
                  bg-white/5
                  border border-white/10
                  backdrop-blur-xl
                  rounded-3xl
                  p-8
                  text-center
                "
              >
                <div
                  className="
                    bg-white/5
                    border border-white/10
                    backdrop-blur-xl
                    p-6
                    rounded-full
                    w-20 h-20
                    flex items-center justify-center
                    mx-auto mb-6
                  "
                >
                  <span className="text-2xl font-bold text-cyan-300">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-white">
                  {item.title}
                </h3>

                <p className="text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Emergency Contacts
            </h2>

            <p className="text-xl text-white/60">
              Important numbers for emergency situations
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card
              className="
                bg-white/5
                border border-white/10
                backdrop-blur-xl
                rounded-3xl
                p-8
              "
            >
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Phone className="h-12 w-12 text-red-400 mx-auto mb-4" />

                  <h3 className="font-bold text-xl mb-2 text-white">
                    Emergency Services
                  </h3>

                  <div className="space-y-2 text-white/60">
                    <p className="text-3xl font-bold text-red-400">112</p>

                    <p>All Emergency Services</p>
                  </div>
                </div>

                <div className="text-center">
                  <Shield className="h-12 w-12 text-cyan-300 mx-auto mb-4" />

                  <h3 className="font-bold text-xl mb-2 text-white">
                    Tourist Helpline
                  </h3>

                  <div className="space-y-2 text-white/60">
                    <p className="text-3xl font-bold text-cyan-300">1363</p>

                    <p>Tourist Assistance</p>
                  </div>
                </div>

                <div className="text-center">
                  <MapPin className="h-12 w-12 text-orange-300 mx-auto mb-4" />

                  <h3 className="font-bold text-xl mb-2 text-white">
                    Local Police
                  </h3>

                  <div className="space-y-2 text-white/60">
                    <p className="text-3xl font-bold text-orange-300">100</p>

                    <p>Police Emergency</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Stay Safe During Your Journey
          </h2>

          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            Access emergency support, live tracking, safety alerts,
            and trusted contact coordination anytime during your trip.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="
                h-14 px-8
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-500
                hover:scale-105
                transition-all
                font-semibold
              "
              onClick={() => navigate("/login")}
            >
              Access Safety Dashboard
            </Button>

            <Button
              variant="outline"
              className="
                h-14 px-8
                rounded-2xl
                bg-white/5
                border border-white/10
                backdrop-blur-xl
                hover:bg-white/10
                text-white
              "
              onClick={() => navigate("/")}
            >
              Return to Homepage
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 mt-10">
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

export default EmergencySOS;