import { useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useZUserProfile } from "../stores/useZUserProfile";
import { IBrandMasterResponse } from "../types/BrandMasterTypes";
import { useBrandMasterInfos } from "./useBrandMasterInfos";

export const useLoadingApp = (notLoginPage: boolean = false) => {
  const [loading, setLoading] = useState(true);
  const { resetAll: resetAllUser, idUser } = useZUserProfile();
  const { setBrandInfos } = useBrandMasterInfos();
  const path = window.location.pathname;

  const fetchTheme = async () => {
    setLoading(true);
    try {
      const { data } = await api.get<IBrandMasterResponse>("/brand-master/self");

      if (data) {
        setBrandInfos(data);
      }
    } catch (error) {
      console.error("Failed to fetch theme:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheme();
  }, [path]);

  useEffect(() => {
    if (idUser) {
      resetAllUser();
    }
  }, []);

  return {
    loading,
  };
};
