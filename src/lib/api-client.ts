import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { Store } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { clearAuth } from '@/features/user/userSlice';

let store: Store<RootState> | null = null;

export const setupApiClient = (reduxStore: Store<RootState>) => {
  store = reduxStore;
};

const getTokenFromStore = (): string | null => {
  if (store) {
    try {
      const state = store.getState();
      const token = state.user.session?.access_token;
      if (token) {
        return token;
      }
    } catch (error) {
      console.warn('Erro ao acessar token do Redux store:', error);
    }
  }

  return localStorage.getItem('token');
};

const getApiBaseUrl = () => {
  const base = import.meta.env.VITE_API_BASE_URL;
  if (!base) {
    console.warn(
      '[api-client] VITE_API_BASE_URL is not set. Copy .env.example to .env and set it, ' +
        'otherwise API requests will fail. Falling back to http://localhost:3000 for now.',
    );
  }
  return `${base || 'http://localhost:3000'}/api/v1`;
};

const API_BASE_URL = getApiBaseUrl();
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getTokenFromStore();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as { message?: string; error?: string };

      switch (status) {
        case 401:
          if (store) {
            store.dispatch(clearAuth());
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }

          if (!window.location.pathname.includes('/auth')) {
            window.location.href = '/auth';
          }
          break;

        case 403:
          console.error(
            'Acesso negado:',
            data.message || data.error || 'Você não tem permissão para acessar este recurso',
          );
          break;

        case 404:
          console.error(
            'Recurso não encontrado:',
            data.message || data.error || 'O recurso solicitado não foi encontrado',
          );
          break;

        case 500:
          console.error(
            'Erro interno do servidor:',
            data.message || data.error || 'Ocorreu um erro no servidor',
          );
          break;

        default:
          console.error(
            'Erro na requisição:',
            data.message || data.error || 'Ocorreu um erro desconhecido',
          );
      }
    } else if (error.request) {
      console.error(
        'Erro de conexão:',
        'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.',
      );
    } else {
      console.error('Erro na configuração da requisição:', error.message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
