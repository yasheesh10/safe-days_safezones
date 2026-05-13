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
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
              <span>{t("back")}</span>
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
            {t("privacy")}{" "}
            <span className="text-cyan-300">
              {t("policy")}
            </span>
          </h1>

          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            {t("privacySubtitle")}
          </p>

          <p className="text-sm text-white/40 mt-5">
            {t("lastUpdated")}
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
                {t("infoCollect")}
              </CardTitle>
            </CardHeader>

            <CardContent className="text-white/70 space-y-4">
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("fullNameEmail")}</li>
                <li>{t("trustedContacts")}</li>
                <li>{t("liveLocationData")}</li>
                <li>{t("deviceBrowser")}</li>
                <li>{t("platformLogs")}</li>
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
                {t("howUseInfo")}
              </CardTitle>
            </CardHeader>

            <CardContent className="text-white/70">
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("provideSOS")}</li>
                <li>{t("enableMonitoring")}</li>
                <li>{t("manageAccounts")}</li>
                <li>{t("improvePlatform")}</li>
                <li>{t("travelNotifications")}</li>
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
                {t("dataSecurity")}
              </CardTitle>
            </CardHeader>

            <CardContent className="text-white/70 space-y-4 leading-relaxed">
              <p>
                {t("secureInfrastructure")}
              </p>

              <p>
                {t("sensitiveLocation")}
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
                {t("dataSharing")}
              </CardTitle>
            </CardHeader>

            <CardContent className="text-white/70 space-y-4 leading-relaxed">
              <p>
                {t("noSellData")}
              </p>

              <p>
                {t("shareEmergency")}
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
                {t("userRights")}
              </CardTitle>
            </CardHeader>

            <CardContent className="text-white/70">
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("accessInfo")}</li>
                <li>{t("dataCorrection")}</li>
                <li>{t("deleteInfo")}</li>
                <li>{t("withdrawConsent")}</li>
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
                {t("contactUs")}
              </CardTitle>
            </CardHeader>

            <CardContent className="text-white/70 space-y-5">
              <p>
                {t("privacySupport")}
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
                  {t("emergencyHelpline")}
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
            {t("smartSafety")}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-white/60">
            <div>
              {t("emergencyNumber")}
              <span className="text-red-400 font-semibold ml-2">
                112
              </span>
            </div>

            <div>
              {t("touristHelpline")}
              <span className="text-cyan-300 font-semibold ml-2">
                1363
              </span>
            </div>
          </div>

          <p className="mt-8 text-xs text-white/40">
            {t("privacyCopyright")}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;