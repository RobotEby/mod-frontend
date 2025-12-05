import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { accountClient } from '@/integrations/account/account-client';
import { AccountUser } from '@/types/account';

interface AuthContextType {
  user: AccountUser | null;
  session: {
    user: AccountUser;
    access_token: string;
  } | null;
  loading: boolean;
  setSession: (session: { user: AccountUser; access_token: string }) => void;
  setUser: (user: AccountUser) => void;
  setLoading: (loading: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  setSession: () => {},
  setUser: () => {},
  setLoading: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [session, setSession] = useState<{ user: AccountUser; access_token: string } | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider value={{ user, session, loading, setSession, setUser, setLoading }}>
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
