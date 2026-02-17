import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

/* ---------------- SUPABASE ---------------- */
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

/* ---------------- TYPES ---------------- */
type UserType = {
  id: string;
  full_name: string;
  role: string;
};

type AuthContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
};

/* ---------------- CONTEXT ---------------- */
const AuthContext = createContext<AuthContextType | null>(null);

/* ---------------- PROVIDER ---------------- */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  // 🔁 Restore session on refresh
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session?.user) {
        setUser({
          id: data.session.user.id,
          full_name: data.session.user.email || "User",
          role: "tourist",
        });
      }
    };

    getSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

/* ---------------- HOOK ---------------- */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
