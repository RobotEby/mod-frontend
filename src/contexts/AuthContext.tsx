import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/integrations/api/client";

export interface User {
  id: string;
  email?: string;
  role?: string;
  user_metadata?: Record<string, any>;
  created_at?: string;
}

export interface Session {
  access_token: string;
  refresh_token?: string;
  user: User | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSessionData = async () => {
    try {
      const token = api.auth.getSession();

      if (!token) {
        setSession(null);
        setUser(null);
        setLoading(false);
        return;
      }

      const userData = await api.get<User>("/auth/me");

      const newSession: Session = {
        access_token: token,
        user: userData,
      };

      setSession(newSession);
      setUser(userData);
    } catch (error) {
      console.error("Erro ao validar sessão:", error);
      api.auth.clearSession();
      setSession(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionData();

    const handleAuthChange = () => {
      setLoading(true);
      fetchSessionData();
    };

    window.addEventListener("auth-change", handleAuthChange);

    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
