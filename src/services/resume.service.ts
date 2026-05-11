import api from "@/lib/axios";

export const resumeService = {
  userResumesListApi: async () => {
    const response = await api.get("/resumes");
    return response.data;
  },

  deleterResumeApi: async (resumeId: string) => {
    const response = await api.delete(`job_seeker/resume/${resumeId}`);
    return response.data;
  },

  uploadResumeApi: async (formData: FormData) => {
    const response = await api.post("job_seeker/resume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
