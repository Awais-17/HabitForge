import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
});

export const habitService = {
  getHabits: (userId: string) => api.get(`/habits?userId=${userId}`),
  createHabit: (data: any) => api.post('/habits', data),
  updateHabit: (habitId: string, data: any) => api.put(`/habits/${habitId}`, data),
  deleteHabit: (habitId: string) => api.delete(`/habits/${habitId}`),
  completeHabit: (habitId: string, userId: string) => 
    api.post(`/habits/${habitId}/complete`, { userId }),
  getAnalytics: (userId: string, days: number = 30) => 
    api.get(`/habits/analytics?userId=${userId}&days=${days}`),
};

export const userService = {
  register: (name: string, email: string) => api.post('/users/register', { name, email }),
  getUser: (userId: string) => api.get(`/users/${userId}`),
  updateUser: (userId: string, data: { name?: string; email?: string }) => api.put(`/users/${userId}`, data),
  seedHistory: (userId: string) => api.post(`/users/${userId}/seed`),
  upgradeToPremium: (userId: string) => api.post(`/users/${userId}/upgrade`),
};

export default api;
