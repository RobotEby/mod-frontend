import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signUp, signIn, signOut, fetchUser } from './userThunks';
import { AccountUser } from '@/types/account';

interface Session {
  user: AccountUser;
  access_token: string;
}

interface UserState {
  user: AccountUser | null;
  session: Session | null;
  loading: boolean;
}

const loadInitialState = (): UserState => {
  try {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (userStr && token) {
      const user = JSON.parse(userStr);
      return {
        user,
        session: {
          user,
          access_token: token,
        },
        loading: false,
      };
    }
  } catch (error) {
    console.error('Erro ao carregar estado do localStorage:', error);
  }

  return {
    user: null,
    session: null,
    loading: false,
  };
};

const initialState: UserState = loadInitialState();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AccountUser | null>) {
      state.user = action.payload;
      if (action.payload && state.session) {
        state.session.user = action.payload;
      }
    },
    setSession(state, action: PayloadAction<Session>) {
      state.session = action.payload;
      state.user = action.payload.user;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    clearAuth(state) {
      state.user = null;
      state.session = null;
      state.loading = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      const user = {
        id: action.payload.id!,
        email: action.payload.email,
        full_name: action.payload.full_name,
      };
      state.user = user;
      state.session = {
        user,
        access_token: action.payload.token,
      };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(signUp.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      const user = {
        id: action.payload.id!,
        email: action.payload.email,
        full_name: action.payload.full_name,
      };
      state.user = user;
      state.session = {
        user,
        access_token: action.payload.token,
      };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(signIn.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(signOut.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.user = null;
      state.session = null;
      state.loading = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    });
    builder.addCase(signOut.rejected, (state) => {
      state.user = null;
      state.session = null;
      state.loading = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    });

    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      if (state.session) {
        state.session.user = action.payload;
      }
      localStorage.setItem('user', JSON.stringify(action.payload));
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setUser, setSession, setLoading, clearAuth } = userSlice.actions;
export default userSlice.reducer;
