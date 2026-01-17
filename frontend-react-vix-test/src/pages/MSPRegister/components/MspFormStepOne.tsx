import { Box, Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { useTranslation } from "react-i18next";
import { PencilCicleIcon } from "../../../icons/PencilCicleIcon";
import { CheckboxLabel } from "../../../components/CheckboxLabel";
import { TextRob16Font1S } from "../../../components/Text1S";

interface CustomInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
  suffix?: string;
}

const CustomInput = ({
  label,
  value,
  onChange,
  required = false,
  placeholder = "",
  type = "text",
  suffix,
}: CustomInputProps) => {
  const { theme, mode } = useZTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          color: mode === "dark" ? "#D1D5DB" : "#374151",
          fontSize: "13px",
        }}
      >
        {label} {required && <span style={{ color: "#9CA3AF" }}>(Obrigatório)</span>}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: mode === "dark" ? "#374151" : "#F3F4F6",
          borderRadius: "8px",
          border: `1px solid ${mode === "dark" ? "#4B5563" : "#E5E7EB"}`,
          height: "40px",
          "&:focus-within": {
            borderColor: theme[mode].blueMedium,
          },
        }}
      >
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1,
            width: "100%",
            minWidth: 0,
            padding: "0 12px",
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            color: mode === "dark" ? "#FFFFFF" : "#1F2937",
            fontSize: "14px",
            height: "100%",
          }}
        />
        {suffix ? (
          <Typography
            sx={{
              color: mode === "dark" ? "#9CA3AF" : "#6B7280",
              fontSize: "14px",
              mr: 1,
              flexShrink: 0,
            }}
          >
            {suffix}
          </Typography>
        ) : (
          <IconButton size="small" sx={{ mr: 0.5, flexShrink: 0 }}>
            <PencilCicleIcon fill={mode === "dark" ? "#9CA3AF" : "#6B7280"} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

interface MspFormStepOneProps {
  onContinue: () => void;
  onCancel: () => void;
}

export const MspFormStepOne = ({ onContinue, onCancel }: MspFormStepOneProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const {
    companyName,
    setCompanyName,
    locality,
    setLocality,
    cnpj,
    setCnpj,
    phone,
    setPhone,
    sector,
    setSector,
    contactEmail,
    setContactEmail,
    minConsumption,
    setMinConsumption,
    discountRate,
    setDiscountRate,
    isPoc,
    setIsPoc,
    setShowError,
  } = useZMspRegisterPage();

  const handleContinue = () => {
    // Validação dos campos obrigatórios
    if (!companyName || !locality || !cnpj || !sector || !contactEmail) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onContinue();
  };

  return (
    <Stack
      sx={{
        background: theme[mode].mainBackground,
        borderRadius: "16px",
        width: "100%",
        padding: "24px",
        boxSizing: "border-box",
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
        {t("mspRegister.companyInfos")}
      </TextRob16Font1S>

      <Grid container spacing={2}>
        {/* Linha 1: Nome, Localização, CNPJ */}
        <Grid item xs={12} md={4}>
          <CustomInput
            label={t("mspRegister.companyName")}
            value={companyName}
            onChange={setCompanyName}
            required
            placeholder="Vituax"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomInput
            label={t("mspRegister.location")}
            value={locality}
            onChange={setLocality}
            required
            placeholder={t("mspRegister.locationPlaceholder")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomInput
            label={t("mspRegister.cnpj")}
            value={cnpj}
            onChange={setCnpj}
            required
            placeholder="00.000.000/0001-00"
          />
        </Grid>

        {/* Linha 2: Telefone, Setor, E-mail */}
        <Grid item xs={12} md={4}>
          <CustomInput
            label={t("mspRegister.phone")}
            value={phone}
            onChange={setPhone}
            placeholder="(00) 00000-0000"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomInput
            label={t("mspRegister.sector")}
            value={sector}
            onChange={setSector}
            required
            placeholder={t("mspRegister.sectorPlaceholder")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomInput
            label={t("mspRegister.contactEmail")}
            value={contactEmail}
            onChange={setContactEmail}
            required
            placeholder="vituax@gmail.com"
            type="email"
          />
        </Grid>

        {/* Linha 3: Consumo mínimo, Desconto, POC Checkbox */}
        <Grid item xs={12} md={4}>
          <CustomInput
            label={t("mspRegister.minConsumption")}
            value={String(minConsumption)}
            onChange={(val) => setMinConsumption(Number(val) || 0)}
            placeholder="0"
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomInput
            label={t("mspRegister.discountPercentage")}
            value={String(discountRate)}
            onChange={(val) => setDiscountRate(Number(val) || 0)}
            placeholder="0"
            type="number"
            suffix="%"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              pt: 3,
            }}
          >
            <CheckboxLabel
              label={t("mspRegister.isPoc")}
              checked={isPoc}
              handleChange={() => setIsPoc(!isPoc)}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Botões */}
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          onClick={handleContinue}
          sx={{
            px: 4,
            py: 1.2,
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
          {t("mspRegister.save") === "Salvar" ? "Continuar" : "Continue"}
        </Button>
        <Button
          variant="outlined"
          onClick={onCancel}
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 500,
            borderColor: mode === "dark" ? "#4B5563" : "#E5E7EB",
            color: mode === "dark" ? "#D1D5DB" : "#374151",
            "&:hover": {
              borderColor: theme[mode].blueMedium,
              backgroundColor: "transparent",
            },
          }}
        >
          {t("mspRegister.cancel")}
        </Button>
      </Box>
    </Stack>
  );
};
