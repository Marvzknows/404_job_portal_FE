import api from "@/lib/axios";
import { MeResponseT, UserT } from "@/types/auth";

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
  login: async (data: LoginForm) => {
    const res = await api.post("/login", data);
    return res.data;
  },

  register: async (data: RegisterForm) => {
    const res = await api.post("/register", data);
    return res.data;
  },

  logout: async () => {
    const res = await api.post("/logout");
    return res.data;
  },

  me: async (): Promise<MeResponseT> => {
    const res = await api.get<MeResponseT>("/me");
    return res.data;
  },
};
