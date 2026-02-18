// src/pages/Login.tsx
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Shield, Eye, EyeOff, User, Car, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-northeast.jpg";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

type RoleId = "tourist" | "police";

const Login = () => {
  const { t } = useTranslation();
  const roleOptions: {
  id: RoleId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}[] = [

  {
    id: "tourist",
    label: t("tourist"),
    icon: User,
    description: t("touristRoleDesc"),
  },
  {
    id: "police",
    label: t("police"),
    icon: Shield,
    description: t("policeRoleDesc"),
  },
];

  const { setUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleId | "">("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!selectedRole) return;

  try {
    setIsLoading(true);

    const cleanIdentifier = identifier.trim().toUpperCase();
let emailToUse = cleanIdentifier;


// 🧠 If user entered Blockchain ID → get email from profiles

if (cleanIdentifier.startsWith("BLK-")) {
  const storedUser = JSON.parse(localStorage.getItem("safeUser") || "null");

  if (!storedUser || storedUser.blockchainId !== cleanIdentifier) {
    toast({
      title: "Login failed",
      description: "Invalid Blockchain ID",
      variant: "destructive",
    });
    return;
  }

  emailToUse = storedUser.email;
}


// 🔐 Now login using the email (either original OR fetched)
const { data, error } = await supabase.auth.signInWithPassword({
  email: emailToUse,
  password,
});


    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    const user = data.user;

    if (!user) {
      toast({
        title: "Login failed",
        description: "No user returned from Supabase",
        variant: "destructive",
      });
      return;
    }

    // 2️⃣ Fetch profile (role check)
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      toast({
        title: "Profile error",
        description: "Profile not found",
        variant: "destructive",
      });
      return;
    }

    // 3️⃣ Role validation
    if (profile.role !== selectedRole) {
      toast({
        title: "Access denied",
        description: `You are not registered as ${selectedRole}`,
        variant: "destructive",
      });
      return;
    }

    // 4️⃣ Store in auth context (frontend use only)
    setUser({
      id: user.id,
      full_name: profile.full_name,
      role: profile.role,
    });

    toast({
      title: "Login successful",
      description: "Welcome back!",
    });

    // 5️⃣ Navigate
    if (profile.role === "police") {
      navigate("/police");
    } else {
      navigate("/dashboard");
    }
  } finally {
    setIsLoading(false);
  }
};

  const selected = roleOptions.find(r => r.id === selectedRole);

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/70 to-black/60" />

      {/* content */}
      <div className="relative z-10 w-full max-w-md p-6 sm:p-8">
        {/* brand */}
        <div
          className="mb-8 flex items-center justify-center space-x-2 cursor-pointer transition-transform hover:scale-105"
          onClick={() => navigate("/")}
        >
          <Shield className="h-10 w-10 text-emerald-400 drop-shadow-md" />
          <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-300 bg-clip-text text-transparent">
{t("appName")}
          </span>
        </div>

        {/* role selection */}
        <Card className="mb-6 border-0 bg-white/10 shadow-2xl backdrop-blur-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-center text-xl font-semibold text-white">{t("selectRole")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {roleOptions.map((role) => {
                const isActive = role.id === selectedRole;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={[
                      "group rounded-xl border p-3 text-left transition-all duration-200",
                      "bg-white/10 backdrop-blur hover:bg-white/20",
                      isActive ? "border-emerald-400 bg-emerald-500/20 ring-2 ring-emerald-400 ring-offset-2 ring-offset-transparent" : "border-white/20"
                    ].join(" ")}
                    aria-pressed={isActive}
                  >
                    <div className="flex items-center gap-3">
                      {/* emerald inner-glow icon ring (applies to ALL roles) */}
                      <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-emerald-400/70 text-emerald-400 transition-all group-hover:shadow-[0_0_10px_3px_rgba(16,185,129,0.5)]">
                        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_6px_2px_rgba(16,185,129,0.6)]" />
                        <role.icon className="relative z-10 h-5 w-5" />
                      </div>

                      <div>
                        <div className="font-medium text-white">{role.label}</div>
                        <div className="text-xs text-gray-300">{role.description}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* login form */}
        {selected && (
          <Card className="border-0 bg-white/10 shadow-2xl backdrop-blur-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-center gap-2 text-lg text-white">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <selected.icon className="h-4 w-4" />
                </span>
                {selected.label} {t("login")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="identifier" className="text-white/90">
{t("emailOrBlockchain")}
</Label>

<Input
  id="identifier"
  type="text"
  placeholder={t("enterEmailOrBlockchain")}
  value={identifier}
  onChange={(e) => setIdentifier(e.target.value)}

                    className="h-11 border-white/30 bg-white/10 text-white placeholder:text-gray-300 focus-visible:ring-emerald-400"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-white/90">
                    {t("password")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("enterPassword")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 border-white/30 bg-white/10 pr-10 text-white placeholder:text-gray-300 focus-visible:ring-emerald-400"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 grid w-10 place-items-center"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-300" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-300" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="h-11 w-full bg-emerald-500 text-white transition hover:bg-emerald-600"
                  disabled={!identifier || !password || isLoading}
                >{isLoading ? t("authenticating") : t("accessDashboard")}

                </Button>
              </form>

              <div className="mt-4 text-center">
                <Button
                  type="button"
                  variant="link"
                  className="text-emerald-400 hover:text-emerald-300"
                  onClick={() => setSelectedRole("")}
                >← {t("changeRole")}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* register & back */}
<div className="mt-6 text-center space-y-2">
  <p className="text-sm text-gray-300">{t("noAccount")}</p>

  <Button
    variant="link"
    className="text-emerald-400 hover:text-emerald-300"
    onClick={() => navigate("/register")}
  >{t("registerNow")}
  </Button>

  <div>
    <Button
      variant="link"
      className="text-gray-300 hover:text-white"
      onClick={() => navigate("/")}
    >← {t("backToHome")}
    </Button>
  </div>
</div>

      </div>
    </div>
  );
};

export default Login;
