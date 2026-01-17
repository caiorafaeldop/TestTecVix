import { useState } from "react";
import { TRole, useZUserProfile } from "../stores/useZUserProfile";
import { useAuth } from "./useAuth";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export interface IUserDB {
  idUser: string;
  idBrandMaster: number | null;
  username: string;
  email: string;
  userPhoneNumber: string | null;
  profileImgUrl: null | string;
  role: "admin" | "manager" | "member";
  isActive: boolean;
  socketId: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt: string | Date | null;
  fullName?: string;
  lastLoginDate?: string | Date | null;
}

interface ICreateNewUser {
  username: string;
  email: string;
  role: TRole;
  password?: string;
  fullName?: string;
  userPhoneNumber?: string;
  idBrandMaster?: number;
  isActive?: boolean;
  position?: string;
  department?: string;
  companyName?: string;
  hiringDate?: string;
}

export const useUserResources = () => {
  const { idUser, setUser, role, idBrand } = useZUserProfile();
  const { getAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const updateUser = async (data: Partial<IUserDB>) => {
    setIsLoading(true);
    try {
      const response = await api.put<IUserDB>(`/user/${idUser}`, data);
      setIsLoading(false);

      setUser({
        profileImgUrl: response.data.profileImgUrl,
        username: response.data.username,
        userEmail: response.data.email,
        idBrand: response.data.idBrandMaster,
        role: response.data.role,
        userPhoneNumber: response.data.userPhoneNumber,
        fullName: response.data.fullName,
      });

      return response.data;
    } catch (error: any) {
      setIsLoading(false);
      const message = error.response?.data?.message || t("generic.errorToSaveData");
      toast.error(message);
      return null;
    }
  };

  const updateUserById = async (targetIdUser: string, data: Partial<ICreateNewUser>) => {
    setIsLoading(true);
    try {
      const response = await api.put<IUserDB>(`/user/${targetIdUser}`, data);
      setIsLoading(false);
      return response.data;
    } catch (error: any) {
      setIsLoading(false);
      const message = error.response?.data?.message || t("generic.errorToSaveData");
      toast.error(message);
      return null;
    }
  };

  const createUserByManager = async (data: ICreateNewUser) => {
    if (role !== "admin" && role !== "manager") return null;
    const idBrandMaster = idBrand;
    if (!idBrandMaster) {
      toast.error(t("generic.errorToSaveData"));
      return null;
    }

    setIsLoading(true);
    try {
      const response = await api.post(`/user`, {
        ...data,
        idBrandMaster,
      });
      setIsLoading(false);
      return response.data;
    } catch (error: any) {
      setIsLoading(false);
      const message = error.response?.data?.message || t("generic.errorToSaveData");
      toast.error(message);
      return null;
    }
  };

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const response = await api.get<IUserDB[]>("/user");
      setIsLoading(false);
      return response.data;
    } catch (error: any) {
      setIsLoading(false);
      const message = error.response?.data?.message || t("generic.errorToLoadData");
      // toast.error(message); // Optional: silent fail or toast
      return [];
    }
  };

  const deleteUser = async (targetIdUser: string) => {
     setIsLoading(true);
     try {
       await api.delete(`/user/${targetIdUser}`);
       setIsLoading(false);
       return true;
     } catch (error: any) {
       setIsLoading(false);
       const message = error.response?.data?.message || t("generic.errorToSaveData");
       toast.error(message);
       return false;
     }
  };

  const updateAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);

    setIsLoading(true);
    try {
        const response = await api.patch(`/user/${idUser}/avatar`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        setIsLoading(false);

        // Update local user state
        setUser({
            profileImgUrl: response.data.profileImgUrl,
            username: response.data.username,
            userEmail: response.data.email,
            idBrand: response.data.idBrandMaster,
            role: response.data.role,
            userPhoneNumber: response.data.userPhoneNumber,
            fullName: response.data.fullName,
        });

        return response.data;
    } catch (error: any) {
        setIsLoading(false);
        const message = error.response?.data?.message || "Failed to upload avatar";
        toast.error(message);
        return null;
    }
  };

  return { 
    isLoading, 
    updateUser, 
    createUserByManager, 
    updateAvatar,
    getAllUsers,
    deleteUser,
    updateUserById,
  };
};
