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
  login: (data: LoginForm) => api.post("/login", data).then((res) => res.data),
  register: (data: RegisterForm) =>
    api.post("/register", data).then((res) => res.data),
  logout: () => api.post("/logout"),
  me: () => api.get("/me").then((res) => res.data),
};
