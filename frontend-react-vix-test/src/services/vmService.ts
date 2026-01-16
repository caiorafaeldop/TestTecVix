import { api } from "./api";

export interface IVM {
  idVM: number;
  name: string;
  os: string;
  status: 'stopped' | 'running' | 'paused';
  ram_total: number;
  hdd_total: number;
  cpu_total: number;
  ip_address: string;
  createdAt: string;
  pass?: string;
  location?: string;
  hasBackup?: boolean;
}

export const vmService = {
  listAll: async () => {
    const response = await api.get("/vm");
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/vm/${id}`);
    return response.data;
  },
  create: async (data: Partial<IVM>) => {
    const response = await api.post("/vm", data);
    return response.data;
  },
  update: async (id: number, data: Partial<IVM>) => {
    const response = await api.put(`/vm/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/vm/${id}`);
    return response.data;
  },
  // Helper for actions
  changeStatus: async (id: number, status: 'stopped' | 'running' | 'paused') => {
      return await api.put(`/vm/${id}`, { status });
  }
};
