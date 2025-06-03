import axios from 'axios';

const api = axios.create({
  baseURL: 'https://test-fe.mysellerpintar.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menambahkan header Authorization
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;