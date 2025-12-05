import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { accountClient } from '@/integrations/account/account-client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    metadata?: { full_name?: string },
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await accountClient.signIn({ email, password });
      const user = {
        email: response.email,
        full_name: response.full_name,
      };

      setUser(user);
      setSession({ user, access_token: response.token });
      setLoading(false);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', response.token);
      return { error: null };
    } catch (error) {
      throw new Error(error.message || 'Erro ao fazer login');
    }
  };

  const signUp = async (email: string, password: string, full_name: string) => {
    try {
      const response = await accountClient.signUp({ email, password, full_name });

      const user = {
        email: response.email,
        full_name: response.full_name,
      };

      setUser(user);
      setSession({ user, access_token: response.token });
      setLoading(false);

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', response.token);
      return { error: null };
    } catch (error) {
      throw new Error(error.message || 'Erro ao criar conta');
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
