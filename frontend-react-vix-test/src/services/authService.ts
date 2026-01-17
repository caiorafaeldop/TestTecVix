import { api } from "./api";
import { IUserProfile } from "../stores/useZUserProfile";

export const authService = {
  login: async (data: any) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },
  register: async (data: any) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },
  getSelf: async () => {
      const response = await api.get("/auth/self");
      return response.data;
  }
};
