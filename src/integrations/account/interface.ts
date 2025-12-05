export interface User {
  id?: string;
  email: string;
  full_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterResponse extends User {
  token: string;
}

export interface LoginResponse extends User {
  token: string;
}
