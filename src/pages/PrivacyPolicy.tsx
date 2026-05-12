import {
  Shield,
  ArrowLeft,
  Users,
  Lock,
  Database,
  Globe,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

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
      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 relative">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="
                flex items-center space-x-2
                text-white hover:bg-white/10
                rounded-2xl
              "
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>

            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-cyan-300" />

              <span className="text-lg font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent">
                SAFE DAYS
              </span>
            </div>
          </div>

          
        </div>
      </header>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-16 max-w-5xl relative z-10">
        {/* Hero */}
        <div className="text-center mb-16">
          <div
            className="
              w-24 h-24
              rounded-full
              bg-cyan-500/10
              border border-cyan-500/20
              flex items-center justify-center
              mx-auto mb-8
              backdrop-blur-xl
            "
          >
            <Shield className="h-12 w-12 text-cyan-300" />
          </div>

          <h1
            className="
              text-5xl md:text-6xl
              font-black
              mb-6
              tracking-tight
            "
          >
            Privacy{" "}
            <span className="text-cyan-300">Policy</span>
          </h1>

          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Learn how SAFE DAYS collects, protects, and securely manages
            your information while delivering safer travel experiences.
          </p>

          <p className="text-sm text-white/40 mt-5">
            Last updated: September 2025
          </p>
        </div>

        <div className="space-y-8">
          {/* Information We Collect */}
          <Card
            className="
              bg-white/5
              border border-white/10
              backdrop-blur-xl
              rounded-3xl
            "
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Users className="h-5 w-5 text-cyan-300" />
                Information We Collect
              </CardTitle>
            </CardHeader>

            <CardContent className="text-white/70 space-y-4">
              <ul className="list-disc pl-6 space-y-2">
                <li>Full name and email address</li>
                <li>Trusted emergency contact details</li>
                <li>Live location data for SOS & safety services</li>
                <li>Device and browser information</li>
                <li>Platform usage and interaction logs</li>
              </ul>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card
            className="
              bg-white/5
              border border-white/10
              backdrop-blur-xl
              rounded-3xl
            "
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Lock className="h-5 w-5 text-cyan-300" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>

            <CardContent className="text-white/70">
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide emergency SOS services</li>
                <li>Enable live safety monitoring and alerts</li>
                <li>Manage user accounts securely</li>
                <li>Improve platform performance and reliability</li>
                <li>Send important travel safety notifications</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card
            className="
              bg-white/5
              border border-white/10
              backdrop-blur-xl
              rounded-3xl
            "
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Database className="h-5 w-5 text-cyan-300" />
                Data Storage & Security
              </CardTitle>
            </CardHeader>

            <CardContent className="text-white/70 space-y-4 leading-relaxed">
              <p>
                SAFE DAYS uses secure cloud infrastructure, encryption,
                and controlled access systems to protect user information.
              </p>

              <p>
                Sensitive location data is used only during active
                safety monitoring and emergency response scenarios.
              </p>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card
            className="
              bg-white/5
              border border-white/10
              backdrop-blur-xl
              rounded-3xl
            "
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Globe className="h-5 w-5 text-cyan-300" />
                Data Sharing
              </CardTitle>
            </CardHeader>

            <CardContent className="text-white/70 space-y-4 leading-relaxed">
              <p>
                SAFE DAYS does not sell or distribute personal user data.
              </p>

              <p>
                Information may only be shared with emergency responders,
                trusted contacts, or legal authorities when required
                during active emergency situations.
              </p>
            </CardContent>
          </Card>

          {/* User Rights */}
          <Card
            className="
              bg-white/5
              border border-white/10
              backdrop-blur-xl
              rounded-3xl
            "
          >
            <CardHeader>
              <CardTitle className="text-white">
                User Rights
              </CardTitle>
            </CardHeader>

            <CardContent className="text-white/70">
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Request data corrections</li>
                <li>Request deletion of stored information</li>
                <li>Withdraw consent for optional services</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card
            className="
              bg-white/5
              border border-white/10
              backdrop-blur-xl
              rounded-3xl
            "
          >
            <CardHeader>
              <CardTitle className="text-white">
                Contact Us
              </CardTitle>
            </CardHeader>

            <CardContent className="text-white/70 space-y-5">
              <p>
                For privacy-related questions or support:
              </p>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-cyan-300" />

                <a
                  href="mailto:support@safedays.ai"
                  className="text-cyan-300 hover:underline"
                >
                  support@safedays.ai
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-cyan-300" />

                <span>
                  Emergency Helpline:
                  <span className="text-red-400 font-semibold ml-2">
                    112
                  </span>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 pt-10 mt-16 text-center">
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
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;