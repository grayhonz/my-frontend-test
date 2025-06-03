// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { AuthResponse, User } from '@/types/auth.types'; // Impor tipe dari auth.type.ts
import axios from '@/utils/api';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuth = (): AuthContextValue => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

 const fetchUser = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        return null;
      }

      // Simpan token ke header Authorization
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

      // Ambil data pengguna dari API
      const response = await axios.get('/auth/me'); // Endpoint untuk mendapatkan data pengguna
      if (response.data && response.data.results && response.data.results.data) {
        setUser(response.data.results.data);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Ketika komponen dimuat, cek apakah ada token dan muat data pengguna
  useEffect(() => {
    fetchUser();
  }, []);



  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post<AuthResponse>('/auth/login', { email, password });
      localStorage.setItem('token', res.data.results.data.token); // Simpan token di localStorage
      console.log('Saved Token:', res.data.results.data.token); // Log token yang disimpan
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.results.data.token}`; // Set header Authorization
      setUser(res.data.results.data.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    }
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout');
      localStorage.removeItem('token'); // Hapus token dari localStorage
      delete axios.defaults.headers.common['Authorization']; // Hapus header Authorization
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return { user, loading, login, logout };
};

export default useAuth;