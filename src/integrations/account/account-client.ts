import apiClient from '@/lib/api-client';
import { LoginData, LoginResponse, RegisterData, RegisterResponse } from './interface';

export class AccountClient {
  async signUp(data: RegisterData): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>('/account/register', data);

    return response.data;
  }

  async signIn(data: LoginData): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/account/login', data);

    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/account/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('email');
      window.dispatchEvent(new Event('auth-change'));
    }
  }

  async getProfile() {
    const response = await apiClient.get('/account/profile');
    return response.data;
  }

  async updateProfile(data: Partial<RegisterData & { full_name?: string }>) {
    const response = await apiClient.put('/account/profile', data);

    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.dispatchEvent(new Event('auth-change'));
    }

    return response.data;
  }
}

export const accountClient = new AccountClient();
