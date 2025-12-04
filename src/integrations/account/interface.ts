export interface User {
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
}

export interface RegisterData extends User {
  password: string;
}
export interface LoginData extends User {
  password: string;
}

export interface RegisterResponse extends User {
  token: string;
}

export interface LoginResponse extends User {
  token: string;
}
