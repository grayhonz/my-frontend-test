export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  message: string;
  error: boolean;
  code: number;
  results: {
    data: {
      user: User;
      token: string;
    };
  };
}