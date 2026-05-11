import api from "@/lib/axios";

export type UpdateProfilePayload = {
  bio: string;
  portfolio?: string;
  current_job_title: string;
  phone: string;
  location: string;
};

export const profileService = {
  getEmployerProfile: async (id: number) => {
    const response = await api.get(`/employer/${id}`);
    return response.data;
  },

  createEmployerProfile: async (data: FormData) => {
    const response = await api.post("/employer/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  UpdateEmployerProfileApi: async (id: number, data: FormData) => {
    const response = await api.put(`/employer/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  UpdateEmployerProfileLogo: async (id: number, logo: File) => {
    const response = await api.put(`/employer/${id}/logo`, logo, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getJobSeekerProfileApi: async (id: string) => {
    const response = await api.get(`/job_seeker/${id}`);
    return response.data;
  },

  updateProfileAvatarApi: async (formData: FormData) => {
    const response = await api.post(`/profile/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateJobSeekerProfileApi: async (
    data: UpdateProfilePayload,
    jobSeekerId: string,
  ) => {
    const response = await api.put(`job_seeker/${jobSeekerId}`, data);
    return response.data;
  },

  createJobSeekerProfileApi: async (formData: FormData) => {
    const response = await api.post("/job_seeker", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
