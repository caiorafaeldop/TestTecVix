import { useState } from "react";
import { useAuth } from "./useAuth";
import { api } from "../services/api";
import { IListAll, IParams } from "../types/ListAllTypes";
import { IVMBackup } from "../types/VMTypes";
import { toast } from "react-toastify";

export const useVMBackupResource = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const { getAuth } = useAuth();

  const listAllBackupsFromThisVM = async (
    idVM: number,
    params: IParams = {},
  ) => {
    const auth = await getAuth();
    try {
      const response = await api.get<IListAll<IVMBackup>>("/vm-backup", {
        headers: auth,
        params: {
          ...params,
          idVM,
        },
      });
      const backups = response.data?.result;
      const totalCount = parseInt(response.data?.totalCount?.toString());
      return { totalCount, backups };
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao listar backups");
      return { totalCount: 0, backups: [] };
    } finally {
      setIsLoading(false);
    }
  };

  const restoreThisBackup = async (idVMBackup: number) => {
    const auth = await getAuth();
    try {
      const response = await api.put<IVMBackup>(
        `/vm-backup/restore/${idVMBackup}`,
        { isRestored: true },
        { headers: auth },
      );
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao restaurar backup");
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  const createBackup = async (idVM: number) => {
    const auth = await getAuth();
    try {
      const response = await api.post<IVMBackup>(
        `/vm-backup`,
        { idVM },
        { headers: auth },
      );
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao criar backup");
    } finally {
      setIsLoadingCreate(false);
    }
  };

  return {
    isLoading,
    listAllBackupsFromThisVM,
    isLoadingCreate,
    isLoadingUpdate,
    restoreThisBackup,
    createBackup,
    // isLoadingDelete,
  };
};
