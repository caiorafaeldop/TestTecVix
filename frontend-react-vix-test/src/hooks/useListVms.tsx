import { useEffect, useState } from "react";
import { api } from "../services/api";
import { IListAll } from "../types/ListAllTypes";
import { toast } from "react-toastify";
import { useLogin } from "./useLogin";
import { useAuth } from "./useAuth";
import { useZGlobalVar } from "../stores/useZGlobalVar";
import { useZUserProfile } from "../stores/useZUserProfile";
import { IVMCreatedResponse } from "../types/VMTypes";

export const useListVms = () => {
  const [vmList, setVmList] = useState<IVMCreatedResponse[]>([]);
  const [vmTotalCount, setVmTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const {
    setCurrentIdVM,
    currentIdVM,
    setCurrentVMName,
    setTotalCountVMs,
    setCurrentVMOS,
  } = useZGlobalVar();
  const { idBrand } = useZUserProfile();
  const { goLogout } = useLogin();
  const { getAuth } = useAuth();

  const fetchListVms = async (
    params: {
      status?: string;
      page?: number;
      limit?: number;
      search?: string;
      idBrandMaster?: number;
    } = {},
  ) => {
    const auth = await getAuth();
    setIsLoading(true);
    const response = await api.get<IListAll<IVMCreatedResponse>>("/vm", {
        params: {
            ...params,
        }
    });

    setIsLoading(false);
    setIsLoading(false);
    
    // axios throws on error status usually, but if we handle it here:
    // With my api.ts interceptor, we might need to adjust.
    // Assuming successful response structure:
    const data = response.data;

    setVmList(data.result || []);
    setVmTotalCount(data.totalCount || 0);
    setTotalCountVMs(data.totalCount || 0);

    if (!currentIdVM && data.result?.length) {
      setCurrentIdVM(data.result[0].idVM);
      setCurrentVMName(data.result[0].vmName);
      setCurrentVMOS(data.result[0].os);
    }
  };

  useEffect(() => {
    fetchListVms({ idBrandMaster: idBrand, limit: 20 });
  }, []);

  return { vmList, vmTotalCount, isLoading, fetchListVms };
};
