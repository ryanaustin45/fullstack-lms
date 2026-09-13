import { api } from './api';
import { User } from '../types';

export async function login(email: string, password: string) {
  const { data } = await api.post('/auth/login', { email, password });
  localStorage.setItem('access_token', data.data.access_token);
  localStorage.setItem('refresh_token', data.data.refresh_token);
  localStorage.setItem('user', JSON.stringify(data.data.user));
  return data.data.user as User;
}

export async function register(name: string, email: string, password: string, role: 'peserta' | 'pemateri') {
  const { data } = await api.post('/auth/register', { name, email, password, role });
  return data.data;
}

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
}

export function getCurrentUser(): User | null {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
}

export function isAuthenticated() {
  return !!localStorage.getItem('access_token');
}