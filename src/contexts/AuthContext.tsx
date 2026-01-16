import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';
import { AccountUser } from '@/types/account';
import { useAppDispatch } from '@/app/hooks';
// import {} from '@/features/user/userSlice';

interface AuthContextType {
  user: AccountUser | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const { data } = await apiClient.get<AccountUser>('/auth/me');

      setUser(data);
      // que, que eu boto aqui? setUser?
      dispatch({ user: data, token });
    } catch (error) {
      console.error('Erro ao carregar sessão:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser: fetchUser }}>
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
