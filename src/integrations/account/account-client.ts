import apiClient from '@/lib/api-client';
import { LoginData, LoginResponse, RegisterData, RegisterResponse } from './interface';

export class AccountClient {
  async register(data: RegisterData): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>('/account/register', data);

    return response.data;
  }

  async login(data: LoginData): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/account/login', data);

    // Salvar token e dados do usuário no localStorage após login bem-sucedido
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      // Salvar objeto user completo (LoginResponse estende User)
      const userData = {
        email: response.data.email,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      window.dispatchEvent(new Event('auth-change'));
    }

    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/account/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      // Sempre limpar dados locais, mesmo se a requisição falhar
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('email'); // Limpar email também se existir
      window.dispatchEvent(new Event('auth-change'));
    }
  }

  async getProfile() {
    const response = await apiClient.get('/account/profile');
    return response.data;
  }

  async updateProfile(data: Partial<RegisterData & { full_name?: string }>) {
    const response = await apiClient.put('/account/profile', data);

    // Atualizar dados do usuário no localStorage
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.dispatchEvent(new Event('auth-change'));
    }

    return response.data;
  }
}

// Exportar instância singleton para facilitar o uso
export const accountClient = new AccountClient();
