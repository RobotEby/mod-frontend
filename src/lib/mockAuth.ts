import { AccountClient, accountClient } from '@/integrations/account/account-client';
import { LoginResponse, RegisterResponse } from '@/integrations/account/interface';

interface User {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
}

interface Session {
  user: User;
  access_token: string;
}

const mockUsers: { [email: string]: { password: string; user: User } } = {};

const triggerAuthChange = () => {
  window.dispatchEvent(new Event('auth-change'));
};

export const mockAuthService = {
  getSession: async (): Promise<{ data: { session: Session | null } }> => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      return { data: { session: null } };
    }

    return {
      data: {
        session: {
          access_token: token,
          user: JSON.parse(user),
        },
      },
    };
  },

  signUp: async (email: string, password: string, full_name: string): Promise<RegisterResponse> => {
    try {
      const response = await new AccountClient().register({
        email,
        password,
        full_name,
      });

      // Salvar token e email no localStorage após registro bem-sucedido
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({ email: response.email }));
        window.dispatchEvent(new Event('auth-change'));
      }

      return response;
    } catch (error) {
      throw new Error('Erro ao criar conta');
    }
  },

  signIn: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await new AccountClient().login({ email, password });
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify({ email: response.email }));
      window.dispatchEvent(new Event('auth-change'));
    }
    return response;
  },

  signOut: async (): Promise<{ error: Error | null }> => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    triggerAuthChange();
    return { error: null };
  },

  onAuthStateChange: (callback: (event: string, session: Session | null) => void) => {
    return {
      data: {
        subscription: {
          unsubscribe: () => {},
        },
      },
    };
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  updateProfile: async (updates: Partial<User>): Promise<{ error: Error | null }> => {
    const user = localStorage.getItem('user');

    if (!user) {
      return { error: new Error('Usuário não autenticado') };
    }

    const userData: User = JSON.parse(user);
    const updatedUser = { ...userData, ...updates };

    localStorage.setItem('user', JSON.stringify(updatedUser));

    if (mockUsers[userData.email]) {
      mockUsers[userData.email].user = updatedUser;
    }

    triggerAuthChange();
    return { error: null };
  },
};
