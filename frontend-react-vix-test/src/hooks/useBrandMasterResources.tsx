import { useState } from "react";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { IListAll } from "../types/ListAllTypes";
import { useZUserProfile } from "../stores/useZUserProfile";
import { useTranslation } from "react-i18next";
import { useZBrandInfo } from "../stores/useZBrandStore";
import { useUploadFile } from "./useUploadFile";
import { IBrandMasterBasicInfo } from "../types/BrandMasterTypes";


interface IUpdateBrandMaster {
  brandName?: string;
  idBrandTheme?: number;
  isActive?: boolean;
  brandLogo?: string;
  domain?: string;
  emailContact?: string;
  cnpj?: string;
  setorName?: string;
  location?: string;
  state?: string;
  city?: string;
  cep?: string;
  street?: string;
  placeNumber?: string;
  smsContact?: string;
  mspDomain?: string;
  admName?: string;
  admEmail?: string;
  admPhone?: string;
  admPassword?: string;
  cityCode?: number;
  district?: string;
  isPoc?: boolean;
  discountRate?: number;
  minConsumption?: number;
  manual?: string;
  termsOfUse?: string;
  privacyPolicy?: string;
  retailPercentageDefault?: string | number;
}

interface IBrandMasterResource {
  brandName: string;
  idBrandTheme: number;
  isActive: boolean;
  brandLogo: string;
  domain: string;
  setorName: string;
  fieldName: string;
  location: string;
  city: string;
  emailContact: string;
  smsContact: string;
  timezone: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt: string | Date | null;
  stripeUserId?: string | null;
  discountRate?: number;
  minConsumption?: number;
  manual?: string;
  termsOfUse?: string;
  privacyPolicy?: string;
  hasSelfRegister?: boolean;
  hasPrepaid?: boolean;
  retailPercentageDefault?: string | number;
}

interface ICreateNewBrandMaster {
  companyName: string;
  cnpj: string;
  phone: string;
  sector: string;
  contactEmail: string;
  cep: string;
  locality: string;
  countryState: string;
  city: string;
  street: string;
  streetNumber: string;
  admName: string;
  admEmail: string;
  admPhone: string;
  admPassword: string;
  admUsername: string;
  brandLogo: string;
  position: "admin";
  mspDomain: string;
  cityCode?: number;
  district?: string;
  isPoc?: boolean;
  discountRate?: number;
  minConsumption?: number;
}

export interface INewMSPResponse {
  idBrandMaster: number;
  brandLogo: string | null;
  brandName: string | null;
  cep: null | string;
  city: string | null;
  cnpj: string | null;
  domain: string | null;
  contract: string | null;
  emailContact: string | null;
  fieldName: string | null;
  idBrandTheme: number;
  isActive: boolean;
  location: string | null;
  placeNumber: string | null;
  setorName: string | null;
  smsContact: string | null;
  state: string | null;
  street: string | null;
  timezone: string | null;
  createdAt: Date | string | null;
  updatedAt: Date | string | null;
  deletedAt: Date | string | null;
  stripeUserId?: string | null;
  isStripeActive?: boolean | null;
  cityCode: number | null;
  district: string | null;
  isPoc: boolean;
  discountRate?: number | string;
  minConsumption?: number;
  manual?: string | null;
  termsOfUse?: string | null;
  privacyPolicy?: string | null;
  hasSelfRegister?: boolean;
  hasPrepaid?: boolean;
  retailPercentageDefault?: string | number;
  users?: any[];
}

export const useBrandMasterResources = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getAuth } = useAuth();
  const { role, idBrand } = useZUserProfile();
  const { t } = useTranslation();
  const {
    brandName,
    setBrandInfo,
    idBrand: idBrandInfo,
    domain,
  } = useZBrandInfo();
  const { getFileByObjectName } = useUploadFile();

  const updateBrandMaster = async ({
    brandName,
    idBrandTheme,
    brandLogo,
    domain,
  }: IUpdateBrandMaster) => {
    if (!role || (role !== "admin" && role !== "manager")) return;
    setIsLoading(true);
    try {
      const response = await api.put(`/brand-master/${idBrand}`, {
        brandName,
        idBrandTheme,
        brandLogo,
        domain,
      });
      setIsLoading(false);
      toast.success(t("whiteLabel.dnsSaved"));
      return response.data;
    } catch (error: any) {
      setIsLoading(false);
      const message = error.response?.data?.message || t("generic.errorToSaveData");
      toast.error(message);
      return;
    }
  };

  const updateBrandMasterInfo = async (data: Partial<IBrandMasterResource>) => {
    if (data.brandName && brandName !== data.brandName && role !== "admin") {
      toast.error(t("generic.errorOlnlyAdmin"));
      return;
    }

    if (data.domain && domain !== data.domain && role !== "admin") {
      toast.error(t("generic.errorOlnlyAdmin"));
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.put<IBrandMasterResource>(
        `/brand-master/${idBrand}`,
        data
      );
      setIsLoading(false);
      const dataResponse = response.data;
      const { url } = await getFileByObjectName(dataResponse.brandLogo);
      setBrandInfo({
        brandName: dataResponse.brandName,
        brandLogo: url || "",
        domain: dataResponse.domain || "",
        setorName: dataResponse.setorName || "",
        fieldName: dataResponse.fieldName || "",
        location: dataResponse.location || "",
        city: dataResponse.city || "",
        emailContact: dataResponse.emailContact || "",
        smsContact: dataResponse.smsContact || "",
        timezone: dataResponse.timezone || "",
        stripeUserId: dataResponse?.stripeUserId || null,
        discountRate: Number(dataResponse?.discountRate) || 1,
        manual: dataResponse?.manual || null,
        termsOfUse: dataResponse?.termsOfUse || null,
        privacyPolicy: dataResponse?.privacyPolicy || null,
        hasSelfRegister: dataResponse?.hasSelfRegister || false,
      });

      return response.data;
    } catch (error: any) {
      setIsLoading(false);
      const message = error.response?.data?.message || t("generic.errorToSaveData");
      toast.error(message);
      return;
    }
  };

  const updateDomain = async (domain: string) => {
    if (role !== "admin" && role !== "manager") {
      toast.error(t("generic.errorOlnlyAdmin"));
      return;
    }

    if (idBrandInfo !== idBrand) {
      toast.error(t("generic.errorToSaveData"));
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post(`/dns/register`, {
        idBrandMaster: idBrand,
        domain,
      });
      setIsLoading(false);
      return response.data;
    } catch (error: any) {
      setIsLoading(false);
      const message = error.response?.data?.message || t("generic.errorToSaveData");
      toast.error(message);
      return;
    }
  };

  const createAnewBrandMaster = async (data: ICreateNewBrandMaster) => {
    if (!data) return null;

    if (role !== "admin" && role !== "manager") {
      toast.error(t("generic.errorOlnlyAdmin"));
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.post<INewMSPResponse>(`/brand-master`, {
        brandName: data.companyName,
        idBrandTheme: 1,
        isActive: true,
        brandLogo: data.brandLogo,
        domain: data.mspDomain,
        setorName: data.sector,
        fieldName: undefined,
        location: data.locality,
        city: data.city,
        emailContact: data.contactEmail,
        smsContact: data.phone,
        timezone: undefined,
        state: data.countryState,
        street: data.street,
        placeNumber: data.streetNumber,
        cnpj: data.cnpj,
        cep: data.cep,
        cityCode: data?.cityCode ? data.cityCode : undefined,
        district: data?.district ? data.district : undefined,
        isPoc: Boolean(data?.isPoc),
        discountRate: data?.discountRate,
        minConsumption: data?.minConsumption,
        admName: data.admName,
        admEmail: data.admEmail,
        admPhone: data.admPhone,
        admPassword: data.admPassword,
        admUsername: data.admUsername,
      });

      setIsLoading(false);
      return { brandMaster: response.data };
    } catch (error: any) {
      setIsLoading(false);
      const message = error.response?.data?.message || t("generic.errorToSaveData");
      toast.error(message);
      return;
    }
  };

  const listAllBrands = async () => {
    setIsLoading(true);
    try {
      const response = await api.get<IListAll<INewMSPResponse>>("/brand-master");
      setIsLoading(false);
      return response.data;
    } catch (error: any) {
      setIsLoading(false);
      const message = error.response?.data?.message || t("generic.errorToSaveData");
      toast.error(message);
      return {
        totalCount: 0,
        result: [],
      };
    }
  };

  const deleteBrandMaster = async (brandMasterId: number | string) => {
    if (!brandMasterId) return null;

    if (role !== "admin" && role !== "manager") {
      toast.error(t("generic.errorOlnlyAdmin"));
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.delete<{
        brandMaster: IBrandMasterBasicInfo;
      }>(`/brand-master/${brandMasterId}`);

      setIsLoading(false);
      return response.data;
    } catch (error: any) {
      setIsLoading(false);
      const message = error.response?.data?.message || t("generic.errorToSaveData");
      toast.error(message);
      return;
    }
  };

  const editBrandMaster = async (
    brandMasterId: number | string,
    data: IUpdateBrandMaster,
  ) => {
    if (!brandMasterId) return null;
    if (!data) return null;
    if (role !== "admin" && role !== "manager") {
      toast.error(t("generic.errorOlnlyAdmin"));
      return;
    }
    try {
      const response = await api.put<INewMSPResponse>(
        `/brand-master/${brandMasterId}`,
        {
          brandName: data.brandName,
          emailContact: data.emailContact,
          cnpj: data.cnpj,
          setorName: data.setorName,
          location: data.location,
          state: data.state,
          city: data.city,
          cep: data.cep,
          street: data.street,
          placeNumber: data.placeNumber,
          smsContact: data.smsContact,
          brandLogo: data.brandLogo,
          domain: data.domain,
          cityCode: data?.cityCode ? data.cityCode : undefined,
          district: data?.district ? data.district : undefined,
          isPoc: Boolean(data?.isPoc),
          discountRate: data?.discountRate,
          minConsumption: data?.minConsumption,
          retailPercentageDefault: Number(data?.retailPercentageDefault)
            ? Number(data?.retailPercentageDefault)
            : undefined,
        }
      );

      return {
        brandMaster: response.data,
      };
    } catch (error: any) {
      const message = error.response?.data?.message || t("generic.errorToSaveData");
      toast.error(message);
      return;
    }
  };

  const getSelf = async () => {
    if (!idBrand) return null;
    setIsLoading(true);
    try {
      const response = await api.get<INewMSPResponse>(`/brand-master/${idBrand}`);
      setIsLoading(false);
      return response.data;
    } catch (error: any) {
      setIsLoading(false);
      const message = error.response?.data?.message || t("generic.errorToSaveData");
      toast.error(message);
      return null;
    }
  };

  const updateLogo = async (file: File) => {
    if (!role || role !== "admin") {
      toast.error(t("generic.errorOlnlyAdmin"));
      return;
    } 
    const formData = new FormData();
    formData.append("logo", file);

    const targetId = idBrand || idBrandInfo;

    if (!targetId) {
        toast.error(t("generic.errorToSaveData"));
        return;
    }

    setIsLoading(true);
    try {
        const response = await api.patch(`/brand-master/${targetId}/logo`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        setIsLoading(false);

        const brandData = response.data;
        // Need to resolve explicit URL if backend returns relative path
        // Assuming backend returns full URL or we use a helper. 
        // Existing code used getFileByObjectName. 
        // If backend returns updated object, let's look at `brandLogo` property.
        
        // Simple assignment if brandLogo is the URL or path
        
        const { url } = await getFileByObjectName(brandData.brandLogo);

        setBrandInfo({
          brandName: brandData.brandName, // fixed spread type issue
          brandLogo: url || "",
          domain: brandData.domain || "",
          setorName: brandData.setorName || "",
          fieldName: brandData.fieldName || "",
          location: brandData.location || "",
          city: brandData.city || "",
          emailContact: brandData.emailContact || "",
          smsContact: brandData.smsContact || "",
          timezone: brandData.timezone || "",
          stripeUserId: brandData?.stripeUserId || null,
          discountRate: Number(brandData?.discountRate) || 1,
          manual: brandData?.manual || null,
          termsOfUse: brandData?.termsOfUse || null,
          privacyPolicy: brandData?.privacyPolicy || null,
          hasSelfRegister: brandData?.hasSelfRegister || false,
        });
        toast.success(t("whiteLabel.dnsSaved"));
        return brandData;
    } catch (error: any) {
        setIsLoading(false);
        const message = error.response?.data?.message || "Failed to upload logo";
        toast.error(message);
        return;
    }
  };

  return {
    isLoading,
    updateBrandMaster,
    updateBrandMasterInfo,
    updateDomain,
    createAnewBrandMaster,
    listAllBrands,
    deleteBrandMaster,
    editBrandMaster,
    getSelf,
    updateLogo,
  };
};

/*
export const brandMasterSchema = z.object({
  brandName: z.string().nullable().optional(),
  idBrandTheme: z.number().int().nullable().optional(),
  isActive: z.boolean().optional().default(false).optional(),
  brandLogo: z.string().nullable().optional(),
  domain: z.string().nullable().optional(),
  setorName: z.string().nullable().optional(),
  fieldName: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  emailContact: z.string().nullable().optional(),
  smsContact: z.string().nullable().optional(),
  timezone: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  street: z.string().nullable().optional(),
  placeNumber: z.string().nullable().optional(),
  cnpj: z.string().nullable().optional(),
});
*/
