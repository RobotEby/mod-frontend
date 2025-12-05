import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { Store } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { clearAuth } from '@/features/user/userSlice';

// Variável para armazenar a referência do store
let store: Store<RootState> | null = null;

// Função para configurar o store no api-client
export const setupApiClient = (reduxStore: Store<RootState>) => {
  store = reduxStore;
};

// Função para obter o token do Redux store
const getTokenFromStore = (): string | null => {
  // Sempre tenta pegar do Redux primeiro, depois localStorage como fallback
  if (store) {
    try {
      const state = store.getState();
      // Usa optional chaining para evitar erro se session for null
      const token = state.user.session?.access_token;
      if (token) {
        return token;
      }
    } catch (error) {
      // Se houver erro ao acessar o store, usa localStorage
      console.warn('Erro ao acessar token do Redux store:', error);
    }
  }

  // Fallback para localStorage (útil quando o usuário ainda não fez login)
  return localStorage.getItem('token');
};

const getApiBaseUrl = () => {
  return `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
};

const API_BASE_URL = getApiBaseUrl();
// Criação da instância do axios
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação nas requisições
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

// Interceptor para tratar respostas e erros
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Tratamento de erros HTTP
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as { message?: string; error?: string };

      switch (status) {
        case 401:
          // Não autorizado - limpar estado do Redux e localStorage
          if (store) {
            store.dispatch(clearAuth());
          } else {
            // Fallback se store não estiver configurado
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }

          // Redirecionar para login apenas se não estiver já na página de auth
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
      // Requisição foi feita mas não houve resposta
      console.error(
        'Erro de conexão:',
        'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.',
      );
    } else {
      // Erro ao configurar a requisição
      console.error('Erro na configuração da requisição:', error.message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
