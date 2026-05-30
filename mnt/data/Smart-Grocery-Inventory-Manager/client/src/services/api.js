import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('groceryUser'));
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data)
};

export const groceryAPI = {
  getAll: (params) => API.get('/grocery', { params }),
  create: (data) => API.post('/grocery', data),
  update: (id, data) => API.put(`/grocery/${id}`, data),
  remove: (id) => API.delete(`/grocery/${id}`),
  adjustQuantity: (id, change) => API.patch(`/grocery/${id}/quantity`, { change })
};

export const dashboardAPI = {
  get: () => API.get('/dashboard')
};

export default API;
