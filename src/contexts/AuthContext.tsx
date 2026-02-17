// src/contexts/AuthContext.tsx

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

// Types
type UserType = {
  id: string;
  full_name: string;
  role: string;
};

type AuthContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  // Load session on app start
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, role")
          .eq("id", data.session.user.id)
          .single();

        setUser({
          id: data.session.user.id,
          full_name: profile?.full_name || "User",
          role: profile?.role || "tourist",
        });
      }

      setLoading(false);
    };

    loadUser();

    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => useContext(AuthContext);
