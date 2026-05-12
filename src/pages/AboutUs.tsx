import {
  Shield,
  Users,
  Target,
  Heart,
  Award,
  Globe,
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
import heroImage from "@/assets/hero-northeast.jpg";

const AboutUs = () => {
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

      {/* Header Navigation */}
      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-cyan-300" />

            <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent">
              SAFE DAYS
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

      {/* Hero Section */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Travel Safety"
            className="w-full h-full object-cover opacity-20"
          />

          <div
            className="
            absolute inset-0
            bg-gradient-to-r
            from-[#020617]/95
            via-[#020617]/80
            to-[#020617]/95
          "
          />
        </div>

        <div className="container mx-auto px-4 z-10 relative">
          <div className="text-center mb-16">
            <h1
              className="
              text-5xl md:text-7xl
              font-black
              mb-8
              leading-tight
              tracking-tight
            "
            >
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent">
                About SAFE DAYS
              </span>
            </h1>

            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              AI-powered tourist safety platform combining intelligent travel
              protection, emergency response, and cultural exploration for safer
              journeys across India.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Our Mission
              </h2>

              <p className="text-white/70 mb-8 leading-relaxed text-lg">
                SAFE DAYS combines AI-powered emergency intelligence,
                live safety tracking, and smart travel assistance to
                create safer journeys while enhancing tourism
                experiences across India.
              </p>

              <div className="space-y-5">
                <div className="flex items-center space-x-4">
                  <Shield className="h-6 w-6 text-cyan-300" />

                  <span className="text-white/80">
                    Intelligent tourist safety monitoring
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <Heart className="h-6 w-6 text-cyan-300" />

                  <span className="text-white/80">
                    Human-centered emergency response
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <Globe className="h-6 w-6 text-cyan-300" />

                  <span className="text-white/80">
                    Smart and secure travel experiences
                  </span>
                </div>
              </div>
            </div>

            <Card
              className="
                bg-white/5
                border border-white/10
                backdrop-blur-xl
                rounded-3xl
                p-4
              "
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-white">
                  <Target className="h-6 w-6 text-cyan-300" />

                  <span>Our Vision</span>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-white/70 leading-relaxed">
                  To become India’s most trusted AI-powered tourist
                  safety platform where technology, emergency response,
                  and cultural exploration seamlessly work together
                  to ensure every traveler experiences safe and
                  memorable journeys.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Explore India */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-5">
              Explore India Safely
            </h2>

            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Discover India’s diverse cultures, landscapes, heritage,
              and destinations with AI-powered travel safety.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Kashmir",
                capital: "Srinagar",
                feature: "Mountains & Valleys",
              },
              {
                name: "Rajasthan",
                capital: "Jaipur",
                feature: "Forts & Desert Culture",
              },
              {
                name: "Kerala",
                capital: "Thiruvananthapuram",
                feature: "Backwaters & Nature",
              },
              {
                name: "Goa",
                capital: "Panaji",
                feature: "Beaches & Tourism",
              },
              {
                name: "Maharashtra",
                capital: "Mumbai",
                feature: "Cities & Heritage",
              },
              {
                name: "Sikkim",
                capital: "Gangtok",
                feature: "Monasteries & Mountains",
              },
              {
                name: "Punjab",
                capital: "Chandigarh",
                feature: "Culture & Hospitality",
              },
              {
                name: "Tamil Nadu",
                capital: "Chennai",
                feature: "Temples & Tradition",
              },
            ].map((state, index) => (
              <Card
                key={index}
                className="
                  bg-white/5
                  border border-white/10
                  backdrop-blur-xl
                  rounded-3xl
                  hover:border-cyan-400/30
                  hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]
                  hover:-translate-y-1
                  transition-all duration-300
                "
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-lg text-white">
                    {state.name}
                  </CardTitle>

                  <CardDescription className="text-white/50">
                    Capital: {state.capital}
                  </CardDescription>
                </CardHeader>

                <CardContent className="text-center">
                  <p className="text-sm text-white/60">
                    {state.feature}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Travel Protection */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-5">
              Smart Travel Protection
            </h2>

            <p className="text-xl text-white/60">
              Combining AI-powered safety systems with human support
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
              <blockquote className="text-center italic text-xl text-white/70 mb-10 leading-relaxed">
                “Empowering safer journeys through AI-powered protection,
                emergency response, and community-driven travel support.”
              </blockquote>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Users className="h-14 w-14 text-cyan-300 mx-auto mb-5" />

                  <h3 className="font-semibold mb-3 text-xl">
                    Community
                  </h3>

                  <p className="text-sm text-white/60 leading-relaxed">
                    Strong local communities help create safer and more
                    welcoming travel experiences.
                  </p>
                </div>

                <div className="text-center">
                  <Award className="h-14 w-14 text-cyan-300 mx-auto mb-5" />

                  <h3 className="font-semibold mb-3 text-xl">
                    Excellence
                  </h3>

                  <p className="text-sm text-white/60 leading-relaxed">
                    Advanced technology and rapid response systems ensure
                    dependable tourist safety.
                  </p>
                </div>

                <div className="text-center">
                  <Heart className="h-14 w-14 text-cyan-300 mx-auto mb-5" />

                  <h3 className="font-semibold mb-3 text-xl">
                    Care
                  </h3>

                  <p className="text-sm text-white/60 leading-relaxed">
                    Every traveler deserves secure, stress-free, and
                    memorable journeys.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-5">
              Get In Touch
            </h2>

            <p className="text-xl text-white/60">
              Connect with SAFE DAYS for secure and smarter travel
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card
              className="
                bg-white/5
                border border-white/10
                backdrop-blur-xl
                rounded-3xl
                p-10
                text-center
              "
            >
              <h3 className="text-3xl font-bold mb-8">
                SAFE DAYS Support
              </h3>

              <div className="space-y-5 text-white/70 text-lg">
                <p>📍 Mumbai, Maharashtra, India</p>

                <p>
                  📞 Emergency:
                  <span className="text-red-400 font-semibold ml-2">
                    112
                  </span>
                  {" | "}
                  Tourist Helpline:
                  <span className="text-cyan-300 font-semibold ml-2">
                    1363
                  </span>
                </p>

                <p>✉️ support@safedays.ai</p>
              </div>

              <div className="mt-10">
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
                  onClick={() => navigate("/")}
                >
                  Return to Homepage
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

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

export default AboutUs;