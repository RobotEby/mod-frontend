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

  signUp: async (
    email: string,
    password: string,
    metadata?: { full_name?: string },
  ): Promise<{ error: Error | null }> => {
    if (mockUsers[email]) {
      return { error: new Error('Usuário já existe') };
    }

    const user: User = {
      id: `user-${Date.now()}`,
      email,
      full_name: metadata?.full_name,
    };

    mockUsers[email] = {
      password,
      user,
    };

    return { error: null };
  },

  signInWithPassword: async (email: string, password: string): Promise<{ error: Error | null }> => {
    const userData = mockUsers[email];

    if (!userData || userData.password !== password) {
      return { error: new Error('Email ou senha inválidos') };
    }

    const token = `mock-token-${Date.now()}`;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData.user));

    triggerAuthChange();

    return { error: null };
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
