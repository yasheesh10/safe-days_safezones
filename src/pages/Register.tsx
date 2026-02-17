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

const Register = () => {
    // ✅ Fake Blockchain ID Generator
  const generateFakeBlockchainId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "BLK-";
    for (let i = 0; i < 16; i++) {
      id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
  };


  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        description: "Please fill in your name, email, and password.",
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
        title: "Password Mismatch",
        description: "Please ensure both passwords match.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      // ✅ Create user with Supabase Auth. Metadata will populate the `profiles` table via your trigger.
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

// 🔍 Check if user already has a blockchain ID
const { data: existingProfile } = await supabase
  .from("profiles")
  .select("blockchain_id")
  .eq("id", user.id)
  .single();

let fakeId = existingProfile?.blockchain_id;

if (!fakeId) {
  fakeId = generateFakeBlockchainId();
}
localStorage.setItem(
  "safeUser",
  JSON.stringify({
    email: email,
    blockchainId: fakeId,
    role: "tourist",
  })
);

setGeneratedBlockchainId(fakeId);
setShowBlockchainPopup(true);

// ✅ CREATE PROFILE ROW (IMPORTANT)
const { error: profileError } = await supabase
  .from("profiles")
  .upsert({
    id: user.id,
    full_name: name,
    email: email,
    role: "tourist",
    blockchain_id: fakeId,
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
            <CardTitle className="text-2xl text-white">Create Account</CardTitle>
            <CardDescription className="text-white/70">
              Register to access the safety ecosystem
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/90">Full Name</Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
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
                <Label htmlFor="email" className="text-white/90">Email Address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
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
                <Label htmlFor="password" className="text-white/90">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-emerald-400"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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
                <Label htmlFor="confirmPassword" className="text-white/90">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-emerald-400"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-white/60" />
                    ) : (
                      <Eye className="h-4 w-4 text-white/60" />
                    )}
                  </Button>
                </div>
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
                {isLoading ? "Creating Account..." : "Register"}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-white/60">Already have an account?</p>
              <div className="flex items-center justify-center gap-4">
                <Button variant="link" className="text-emerald-300 hover:text-emerald-200" onClick={() => navigate("/login")}>
                  Login here
                </Button>
                <Button variant="link" className="text-white/70 hover:text-white" onClick={() => navigate("/")}>
                  ← Back to Homepage
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
              Your Blockchain ID
            </h2>

            <p className="text-emerald-400 font-mono text-lg break-all mb-3">
              {generatedBlockchainId}
            </p>

            <p className="text-sm text-gray-300 mb-4">
              Save this ID carefully. You will use this to login.
            </p>

            <div className="flex gap-3">
              <Button
                className="flex-1"
                onClick={() => {
                  navigator.clipboard.writeText(generatedBlockchainId);
                  alert("Copied!");
                }}
              >
                Copy ID
              </Button>

              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowBlockchainPopup(false);
                  navigate("/login");
                }}
              >
                Go To Login
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
  
};

export default Register;