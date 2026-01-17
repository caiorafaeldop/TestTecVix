import { Box, Button, Modal, Stack } from "@mui/material";
import { ScreenFullPage } from "../../components/ScreenFullPage";
import { TextRob20Font1MB } from "../../components/Text1MB";
import { useZTheme } from "../../stores/useZTheme";
import { SampleStepper } from "../../components/SampleStepper";
import { useZMspRegisterPage } from "../../stores/useZMspRegisterPage";
import { useTranslation } from "react-i18next";
import { TextRob16Font1S } from "../../components/Text1S";
import { MspTableFilters } from "./MspTable/MspTableFilter";
import { MspTable } from "./MspTable/MspTable";
import { MspModal } from "./MspModal";
import { ModalDeleteMsp } from "./ModalDeleteMsp";
import { useEffect, useState } from "react";
import { ModalUSerNotCreated } from "./ModalUSerNotCreated";
import { ModalDeleteVMsFromMSP } from "./ModalDeleteVMsFromMSP";
import { useBrandMasterResources } from "../../hooks/useBrandMasterResources";
import { AbsoluteBackDrop } from "../../components/AbsoluteBackDrop";
import { useVmResource } from "../../hooks/useVmResource";
import { MspFormStepOne } from "./components/MspFormStepOne";
import { MspFormStepTwo } from "./components/MspFormStepTwo";
import { Add } from "@mui/icons-material";
import { useZUserProfile } from "../../stores/useZUserProfile";

export const MSPRegisterPage = () => {
  const { theme, mode } = useZTheme();
  const {
    activeStep,
    modalOpen,
    mspToBeDeleted,
    setModalOpen,
    setMspToBeDeleted,
    setActiveStep,
    resetAll,
    setIsEditing,
    isEditing,
    brandMasterDeleted,
    vmsToBeDeleted,
    setBrandMasterDeleted,
    setVmsToBeDeleted,
    companyName,
    locality,
    cnpj,
    phone,
    sector,
    contactEmail,
    minConsumption,
    discountRate,
    isPoc,
    mspDomain,
    admName,
    admEmail,
    admPhone,
    position,
    admPassword,
    brandLogoUrl,
    cep,
    city,
    street,
    streetNumber,
    countryState,
    cityCode,
    district,
    setMspList,
    mspList,
  } = useZMspRegisterPage();
  const { t } = useTranslation();
  const { 
    isLoading, 
    createAnewBrandMaster, 
    editBrandMaster, 
    listAllBrands 
  } = useBrandMasterResources();
  const { isLoadingDeleteVM, deleteVM } = useVmResource();
  const { role } = useZUserProfile();
  const [openModalUserNotCreated, setOpenModalUserNotCreated] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const resetAllStepStates = () => {
    setIsEditing([]);
    setActiveStep(0);
    resetAll();
    setShowForm(false);
  };

  const handleCancelAfterDeleteMSP = () => {
    setMspToBeDeleted(null);
    setModalOpen(null);
    setMspToBeDeleted(null);
    setBrandMasterDeleted(null);
    setVmsToBeDeleted([]);
    resetAllStepStates();
  };

  const handleAfterDeleteMSP = async () => {
    await Promise.all(vmsToBeDeleted.map((vm) => deleteVM(vm.idVM)));
    handleCancelAfterDeleteMSP();
  };

  const handleNewMSP = () => {
    resetAll();
    setIsEditing([]);
    setActiveStep(0);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    resetAllStepStates();
  };

  const handleContinueToStepTwo = () => {
    setActiveStep(1);
  };

  const handleBackToStepOne = () => {
    setActiveStep(0);
  };

  const handleClearForm = () => {
    resetAll();
  };

  const handleConfirmCreate = async () => {
    const isEditingMode = isEditing.length > 0;

    if (isEditingMode) {
      // Editar MSP existente
      const idBrandMaster = isEditing[0];
      const result = await editBrandMaster(idBrandMaster, {
        brandName: companyName,
        location: locality,
        cnpj: cnpj,
        smsContact: phone,
        setorName: sector,
        emailContact: contactEmail,
        minConsumption: minConsumption,
        discountRate: (100 - discountRate) / 100, // Converter para decimal
        isPoc: isPoc,
        domain: mspDomain,
        brandLogo: brandLogoUrl,
        cep: cep,
        city: city,
        street: street,
        placeNumber: streetNumber,
        state: countryState,
        cityCode: cityCode ? Number(cityCode) : undefined,
        district: district,
      });

      if (result) {
        // Atualizar lista
        const response = await listAllBrands();
        setMspList(response.result);
        setModalOpen("editedMsp");
        resetAllStepStates();
      }
    } else {
      // Criar novo MSP
      const result = await createAnewBrandMaster({
        companyName: companyName,
        cnpj: cnpj,
        phone: phone,
        sector: sector,
        contactEmail: contactEmail,
        cep: cep || "",
        locality: locality,
        countryState: countryState || "",
        city: city || "",
        street: street || "",
        streetNumber: streetNumber || "",
        admName: admName,
        admEmail: admEmail,
        admPhone: admPhone,
        admPassword: admPassword,
        brandLogo: brandLogoUrl,
        position: "admin",
        mspDomain: mspDomain,
        cityCode: cityCode ? Number(cityCode) : undefined,
        district: district,
        isPoc: isPoc,
        discountRate: (100 - discountRate) / 100,
        minConsumption: minConsumption,
      });

      if (result) {
        // Atualizar lista
        const response = await listAllBrands();
        setMspList(response.result);
        setModalOpen("createdMsp");
        resetAllStepStates();
      }
    }
  };

  // Detectar quando edição é ativada pela tabela
  useEffect(() => {
    if (isEditing.length > 0) {
      setShowForm(true);
    }
  }, [isEditing]);

  useEffect(() => {
    return () => {
      resetAllStepStates();
    };
  }, []);

  const canCreateOrEdit = role === "admin" || role === "manager";
  const isEditingMode = isEditing.length > 0;

  return (
    <ScreenFullPage
      title={
        <TextRob20Font1MB
          sx={{
            color: theme[mode].primary,
            fontSize: "28px",
            fontWeight: "500",
            lineHeight: "40px",
          }}
        >
          {t("mspRegister.title")}
        </TextRob20Font1MB>
      }
      sxTitleSubTitle={{
        paddingLeft: "40px",
        paddingRight: "40px",
      }}
      sxContainer={{
        paddingLeft: "40px",
        paddingRight: "40px",
        paddingBottom: "40px",
      }}
      subtitle={
        <Box
          sx={{
            maxWidth: "646px",
            "@media (max-width: 660px)": { maxWidth: "136px" },
          }}
        >
          <SampleStepper
            activeStep={activeStep}
            stepsNames={[
              t("mspRegister.stepOneTitle"),
              t("mspRegister.stepTwoTitle"),
            ]}
          />
        </Box>
      }
    >
      {Boolean(isLoading || isLoadingDeleteVM) && <AbsoluteBackDrop open />}
      <Stack
        sx={{
          width: "100%",
          gap: "26px",
          borderRadius: "16px",
          boxSizing: "border-box",
        }}
      >
        {/* Formulário de criação/edição */}
        {showForm && (
          <>
            {activeStep === 0 && (
              <MspFormStepOne
                onContinue={handleContinueToStepTwo}
                onCancel={handleCancelForm}
              />
            )}
            {activeStep === 1 && (
              <MspFormStepTwo
                onConfirm={handleConfirmCreate}
                onBack={handleBackToStepOne}
                onClear={handleClearForm}
                isLoading={isLoading}
              />
            )}
          </>
        )}

        {/* Tabela de MSPs */}
        {!showForm && (
          <Stack
            sx={{
              background: theme[mode].mainBackground,
              borderRadius: "16px",
              width: "100%",
              padding: "24px",
              boxSizing: "border-box",
            }}
          >
            <Stack
              sx={{
                gap: "40px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "24px",
                }}
              >
                <TextRob16Font1S
                  sx={{
                    color: theme[mode].black,
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "24px",
                  }}
                >
                  {t("mspRegister.tableTitle")}
                </TextRob16Font1S>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
                  <MspTableFilters />
                  {canCreateOrEdit && (
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      onClick={handleNewMSP}
                      sx={{
                        px: 3,
                        py: 1,
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 500,
                        backgroundColor: theme[mode].blueDark,
                        color: "#FFFFFF",
                        "&:hover": {
                          backgroundColor: theme[mode].blue,
                        },
                      }}
                    >
                      Novo MSP
                    </Button>
                  )}
                </Box>
              </Box>
              <MspTable />
            </Stack>
          </Stack>
        )}
      </Stack>

      {modalOpen !== null && (
        <Modal
          open={modalOpen !== null}
          onClose={() => setModalOpen(null)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            {(modalOpen === "editedMsp" || modalOpen === "createdMsp") && (
              <MspModal
                modalType={modalOpen}
                onClose={() => setModalOpen(null)}
              />
            )}
            {modalOpen === "deletedMsp" && mspToBeDeleted && (
              <ModalDeleteMsp
                mspToDelete={mspToBeDeleted}
                onClose={() => {
                  setModalOpen(null);
                  setMspToBeDeleted(null);
                }}
              />
            )}
          </div>
        </Modal>
      )}
      {openModalUserNotCreated && (
        <ModalUSerNotCreated
          open={openModalUserNotCreated}
          onClose={() => {
            setOpenModalUserNotCreated(false);
            resetAllStepStates();
          }}
        />
      )}
      {Boolean(brandMasterDeleted) && (
        <ModalDeleteVMsFromMSP
          onClose={handleCancelAfterDeleteMSP}
          onConfirm={handleAfterDeleteMSP}
          open={Boolean(brandMasterDeleted)}
          msp={brandMasterDeleted}
          vms={vmsToBeDeleted}
        />
      )}
    </ScreenFullPage>
  );
};
