import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Configuração da base URL da API
// Em desenvolvimento, usa o proxy do Vite (/api)
// Em produção, usa a variável de ambiente ou o padrão
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    // Se a variável de ambiente termina com /api, não adiciona novamente
    const baseUrl = import.meta.env.VITE_API_BASE_URL.endsWith('/api')
      ? import.meta.env.VITE_API_BASE_URL
      : `${import.meta.env.VITE_API_BASE_URL}/api`;
    return `${baseUrl}/v1`;
  }
  // Em desenvolvimento, usa o proxy do Vite
  // Em produção, usa o backend direto
  return import.meta.env.DEV ? '/api/v1' : 'http://localhost:3000/api/v1';
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
    const token = localStorage.getItem('token');

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
          // Não autorizado - limpar token e redirecionar para login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.dispatchEvent(new Event('auth-change'));

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
