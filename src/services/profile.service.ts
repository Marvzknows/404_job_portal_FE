import api from "@/lib/axios";

export const profileService = {
  getEmployerProfile: async (id: number) => {
    const response = await api.get(`/employer/${id}`);
    return response.data;
  },
};
