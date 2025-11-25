interface User {
  id: string;
  email: string;
  full_name?: string;
}

interface Session {
  user: User;
  access_token: string;
}

const mockUsers: { [email: string]: { password: string; user: User } } = {};

let currentSession: Session | null = null;

const loadSessionFromStorage = (): Session | null => {
  const stored = localStorage.getItem('mock_session');
  if (stored) {
    currentSession = JSON.parse(stored);
    return currentSession;
  }
  return null;
};

const saveSessionToStorage = (session: Session | null) => {
  if (session) {
    localStorage.setItem('mock_session', JSON.stringify(session));
  } else {
    localStorage.removeItem('mock_session');
  }
};

export const mockAuthService = {
  init: () => {
    return loadSessionFromStorage();
  },

  getSession: async (): Promise<{ data: { session: Session | null } }> => {
    return {
      data: { session: currentSession },
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

    const session: Session = {
      user: userData.user,
      access_token: `mock-token-${Date.now()}`,
    };

    currentSession = session;
    saveSessionToStorage(session);

    return { error: null };
  },

  signOut: async (): Promise<{ error: Error | null }> => {
    currentSession = null;
    saveSessionToStorage(null);
    return { error: null };
  },

  onAuthStateChange: (callback: (event: string, session: Session | null) => void) => {
    callback('INITIAL_SESSION', currentSession);

    return {
      data: {
        subscription: {
          unsubscribe: () => {},
        },
      },
    };
  },

  getCurrentUser: (): User | null => {
    return currentSession?.user || null;
  },
};
