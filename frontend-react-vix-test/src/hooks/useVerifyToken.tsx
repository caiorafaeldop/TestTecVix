import { useState } from "react";
import { useZUserProfile } from "../stores/useZUserProfile";
import { api } from "../services/api";
import { toast } from "react-toastify";

export const useVerifyToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, idUser } = useZUserProfile();

  const verifyPinCode = async (pinCode: string) => {
    if (!pinCode) return;
    const url = false
      ? `/user-vituax/verify-pincode/${idUser}`
      : `/user/verify-pincode/${idUser}`;

    try {
      const response = await api.post<{ token: string | null }>(url, {
        pinCode,
      });

      if (!response.data || !response.data.token) return;
      setUser({ token: response.data.token });

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao verificar PIN");
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, verifyPinCode };
};
