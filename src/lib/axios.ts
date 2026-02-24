import axios from "axios";
import { token } from "./token";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  //   withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Attach token
api.interceptors.request.use((config) => {
  const t = token.get();
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

// Handle 401 globally (token expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 ||
      error.response?.data?.message === "Unauthenticated."
    ) {
      token.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
