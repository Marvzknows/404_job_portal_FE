import api from "@/lib/axios";

type LoginForm = {
  email: string;
  password: string;
};

type RegisterForm = {
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const authService = {
  login: async (data: LoginForm) => api.post("/login", data),
  register: async (data: RegisterForm) => api.post("/register", data),
  logout: async () => api.post("/logout"),
  me: async () => api.get("/me"),
};
