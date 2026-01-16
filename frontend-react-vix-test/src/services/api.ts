import axios from "axios";
import { useZUserProfile } from "../stores/useZUserProfile";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1",
});

api.interceptors.request.use((config) => {
  const { token } = useZUserProfile.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useZUserProfile.getState().resetAll();
    }
    return Promise.reject(error);
  },
);
