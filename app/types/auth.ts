export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  validation: null;
  data: {
    access_token: string;
    user: User;
  };
}
