import { toast } from "react-toastify";
import { api } from "../services/api";
import { useAuth } from "./useAuth";
import { useState } from "react";

export const useUploadFile = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getAuth } = useAuth();

  const uploadFile = async (file: File) => {
    const auth = await getAuth();
    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    try {
      const response = await api.post<{ objectName: string; url: string }>(
        "/uploads",
        formData,
        {
          timeout: 120000,
          headers: { ...auth, "Content-Type": "multipart/form-data" },
        },
      );
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao fazer upload");
      return { url: "", objectName: "" };
    } finally {
      setIsUploading(false);
    }


  };

  // Função para fazer upload do arquivo
  const handleUpload = async (file: File) => {
    if (!file) {
      return;
    }
    return await uploadFile(file);
  };

  const getFileByObjectName = async (objectName: string) => {
    if (!objectName) return { url: "" };
    if (
      objectName.includes("https://") ||
      objectName.includes("http://") ||
      objectName.includes("/assets") ||
      objectName.includes("blob:")
    )
      return { url: objectName };
    setIsLoading(true);
    let urlParam = objectName[0] === "/" ? objectName.slice(1) : objectName;
    if (urlParam.startsWith("uploads/")) {
      urlParam = urlParam.replace("uploads/", "");
    }
    try {
      const response = await api.get<{ url: string }>(
        `/uploads/${urlParam}`,
      );
      return { url: response.data?.url || "" };
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao buscar arquivo");
      return { url: "" };
    } finally {
      setIsLoading(false);
    }

  };

  return { handleUpload, isUploading, getFileByObjectName, isLoading };
};
