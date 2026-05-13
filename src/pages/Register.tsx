import { useState } from "react";
import { Shield, Eye, EyeOff, Mail, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-northeast.jpg";
// ⬇️ use Supabase directly (remove postJSON)
import { supabase } from "@/lib/supabaseClient";
import {
  connectWallet,
  registerOnBlockchain
} from "@/blockchain";
import { useTranslation } from "react-i18next";
const Register = () => {
    // ✅ Fake Blockchain ID Generator
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [useBlockchain, setUseBlockchain] = useState(false);
const { t } = useTranslation();
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});
  const [isLoading, setIsLoading] = useState(false);
  const [generatedBlockchainId, setGeneratedBlockchainId] = useState<string | null>(null);
  const [showBlockchainPopup, setShowBlockchainPopup] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password;
const confirm = formData.confirmPassword;
    if (!name || !email || !password || !confirm) {
  toast({
    title: "All fields are required",
    description: "Please fill in all fields.",
    variant: "destructive",
  });
  return;
}

if (password.length < 6) {
  toast({
    title: "Weak password",
    description: "Password must be at least 6 characters.",
    variant: "destructive",
  });
  return;
}

if (password !== confirm) {
  toast({
    title: "Password mismatch",
    description: "Passwords do not match.",
    variant: "destructive",
  });
  return;
}

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
const { data, error } = await supabase.auth.signUp({
  email,
  password,
        options: {
          data: { full_name: name, role: "tourist" },
          // If you later enable email confirmations, you can add:
          // emailRedirectTo: "http://localhost:8080"
        },
      });

      if (error) throw error;

 // 🔗 Try to create Blockchain ID (non-blocking)


// ✅ SAVE TO LOCAL STORAGE (FOR LOGIN)
// localStorage.setItem(
//   "user",
//   JSON.stringify({
//     name: name,        
//      email: email,     // ✅ ADD THIS
//     blockchainId: fakeId,
//     password: password,
//     role: "tourist", 
//   })
// );

// ✅ SAVE TO SUPABASE PROFILE
const user = data.user;

if (!user) {
  throw new Error("User not created");
}

let blockchainId: string | null = null;

if (useBlockchain) {

  const walletAddress = await connectWallet();

  if (!walletAddress) {
    throw new Error("Wallet not connected");
  }

  blockchainId = walletAddress;

  const txHash = await registerOnBlockchain(
    name,
    blockchainId
  );

console.log("Blockchain Transaction:", txHash);
localStorage.setItem(
  "safeUser",
  JSON.stringify({
    email: email,
    blockchainId: blockchainId,
    role: "tourist",
  })
);

setGeneratedBlockchainId(blockchainId);
setShowBlockchainPopup(true);
}


// ✅ CREATE PROFILE ROW (IMPORTANT)
const { error: profileError } = await supabase
  .from("profiles")
  .upsert({
    id: user.id,
    full_name: name,
    email: email,
    role: "tourist",
    blockchain_id: blockchainId,
  });

if (profileError) {
  console.error(profileError);
  throw profileError;
}

// ✅ SHOW BLOCKCHAIN ID
// If email confirmations are OFF, a session exists immediately. If ON, user must verify email first.
      const needsEmailConfirmation = !data.session;

      toast({
        title: "Registration Successful",
        description: needsEmailConfirmation
          ? "Please check your inbox to confirm your email before logging in."
          : "Welcome to SAFE DAYS! Please login to continue.",
      });

    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error?.message || "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt="North East India"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(8,47,73,0.85),_rgba(2,6,23,0.95))]" />
      </div>

      <div className="w-full max-w-md px-4">
        {/* Brand */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 inline-flex items-center gap-2">
            <Shield className="h-8 w-8 text-emerald-400" />
            <span className="text-2xl font-bold tracking-wide text-white">SAFE DAYS</span>
          </div>
        </div>

        {/* Card */}
        <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl ring-1 ring-white/10">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl text-white">{t("createAccount")}</CardTitle>
            <CardDescription className="text-white/70">
              {t("registerSafetyEcosystem")}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/90">{t("fullName")}</Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    placeholder={t("enterFullName")}
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-emerald-400"
                    required
                  />
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90">{t("emailAddress")}</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("enterEmailAddress")}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-emerald-400"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                </div>
              </div>
{/* Password */}
<div className="space-y-2">
  <Label htmlFor="password" className="text-white/90">
    {t("password")}
  </Label>

  <div className="relative">
    <Input
      id="password"
      type={showPassword ? "text" : "password"}
      placeholder={t("enterPassword")}
      value={formData.password}
      onChange={(e) =>
        handleInputChange("password", e.target.value)
      }
      className="pr-10 bg-white/5 border-white/10 text-white"
      required
    />

    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="absolute right-0 top-0 h-full px-3"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <EyeOff className="h-4 w-4 text-white/60" />
      ) : (
        <Eye className="h-4 w-4 text-white/60" />
      )}
    </Button>
  </div>
</div>

{/* Confirm Password */}
<div className="space-y-2">
  <Label htmlFor="confirmPassword" className="text-white/90">
    {t("confirmPassword")}
  </Label>

  <div className="relative">
    <Input
      id="confirmPassword"
      type={showConfirmPassword ? "text" : "password"}
      placeholder={t("confirmPasswordPlaceholder")}
      value={formData.confirmPassword}
      onChange={(e) =>
        handleInputChange("confirmPassword", e.target.value)
      }
      className="pr-10 bg-white/5 border-white/10 text-white"
      required
    />

    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="absolute right-0 top-0 h-full px-3"
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
    >
      {showConfirmPassword ? (
        <EyeOff className="h-4 w-4 text-white/60" />
      ) : (
        <Eye className="h-4 w-4 text-white/60" />
      )}
    </Button>
  </div>
</div>
              <div className="flex items-center gap-2">
  <input
    type="checkbox"
    checked={useBlockchain}
    onChange={(e) => setUseBlockchain(e.target.checked)}
  />

  <label className="text-white text-sm">
    {t("registerBlockchain")}
  </label>
</div>
              {/* Register Button */}
              <Button
                type="submit"
                className="w-full py-3 text-base font-medium tracking-wide bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-white shadow-lg shadow-emerald-900/20"
                disabled={
  isLoading ||
  !formData.name ||
  !formData.email ||
  !formData.password ||
  !formData.confirmPassword
}

              >
                {isLoading ? t("creatingAccount") : t("register")}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-white/60">{t("alreadyAccount")}</p>
              <div className="flex items-center justify-center gap-4">
                <Button variant="link" className="text-emerald-300 hover:text-emerald-200" onClick={() => navigate("/login")}>
                 {t("loginHere")}
                </Button>
                <Button variant="link" className="text-white/70 hover:text-white" onClick={() => navigate("/")}>
                  ← {t("backToHomepage")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
            </div>

      {/* 🔐 Blockchain ID Popup */}
      {showBlockchainPopup && generatedBlockchainId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-zinc-900 rounded-xl p-6 w-[90%] max-w-md text-center shadow-xl border border-emerald-500">

            <h2 className="text-xl font-bold text-white mb-2">
             {t("yourBlockchainId")}
            </h2>

            <p className="text-emerald-400 font-mono text-lg break-all mb-3">
              {generatedBlockchainId}
            </p>

            <p className="text-sm text-gray-300 mb-4">
              {t("blockchainLinked")}
            </p>

            <div className="flex gap-3">
              <Button
                className="flex-1"
                onClick={() => {
                  navigator.clipboard.writeText(generatedBlockchainId);
                  alert(t("copied"));
                }}
              >
                {t("copyId")}
              </Button>

              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowBlockchainPopup(false);
                  navigate("/login");
                }}
              >
                {t("goToLogin")}
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
  
};

export default Register;