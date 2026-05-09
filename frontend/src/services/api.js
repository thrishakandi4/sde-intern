import axios from 'axios';

const API_BASE_URL = import.meta.env.example.VITE_API_BASE_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { API_BASE_URL };
export default api;
