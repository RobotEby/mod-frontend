import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { accountClient } from '@/integrations/account/account-client';
import {
  LoginData,
  LoginResponse,
  RegisterData,
  RegisterResponse,
} from '@/integrations/account/interface';
import { AccountUser } from '@/types/account';

interface ApiErrorResponse {
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const response = error.response?.data as ApiErrorResponse | undefined;

    if (response?.message) {
      return response.message;
    }
    if (response?.error) {
      return response.error;
    }
    if (response?.errors) {
      const firstError = Object.values(response.errors)[0];
      if (firstError && firstError.length > 0) {
        return firstError[0];
      }
    }

    switch (error.response?.status) {
      case 400:
        return 'Dados inválidos. Verifique as informações e tente novamente.';
      case 401:
        return 'Email ou senha incorretos. Verifique suas credenciais.';
      case 403:
        return 'Acesso negado. Você não tem permissão para realizar esta ação.';
      case 404:
        return 'Recurso não encontrado.';
      case 409:
        return 'Este email já está cadastrado.';
      case 422:
        return 'Dados inválidos. Verifique as informações fornecidas.';
      case 500:
        return 'Erro interno do servidor. Tente novamente mais tarde.';
      default:
        return error.message || 'Ocorreu um erro inesperado. Tente novamente.';
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Ocorreu um erro inesperado. Tente novamente.';
};

export const signUp = createAsyncThunk<RegisterResponse, RegisterData, { rejectValue: string }>(
  'user/signUp',
  async (data, { rejectWithValue }) => {
    try {
      const response = await accountClient.signUp(data);
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const signIn = createAsyncThunk<LoginResponse, LoginData, { rejectValue: string }>(
  'user/signIn',
  async (data, { rejectWithValue }) => {
    try {
      const response = await accountClient.signIn(data);
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const signOut = createAsyncThunk<void, void>('user/signOut', async () => {
  try {
    await accountClient.logout();
  } catch (error) {
    console.warn('Erro ao fazer logout no servidor, mas estado local será limpo:', error);
  }
});

export const fetchUser = createAsyncThunk<AccountUser, void, { rejectValue: string }>(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await accountClient.getProfile();
      return response.data as AccountUser;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);
