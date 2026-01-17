import { Box, Button, Grid, IconButton, Stack, Typography, Link } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { useTranslation } from "react-i18next";
import { PencilCicleIcon } from "../../../icons/PencilCicleIcon";
import { TextRob16Font1S } from "../../../components/Text1S";
import { TextRob12Font2Xs } from "../../../components/Text2Xs";
import { useRef, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ImgFromDB } from "../../../components/ImgFromDB";

interface CustomInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  showPasswordToggle?: boolean;
}

const CustomInput = ({
  label,
  value,
  onChange,
  required = false,
  placeholder = "",
  type = "text",
  disabled = false,
  showPasswordToggle = false,
}: CustomInputProps) => {
  const { theme, mode } = useZTheme();
  const [showPassword, setShowPassword] = useState(false);

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
          type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            flex: 1,
            width: "100%",
            minWidth: 0,
            padding: "0 12px",
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            color: disabled
              ? mode === "dark"
                ? "#6B7280"
                : "#9CA3AF"
              : mode === "dark"
              ? "#FFFFFF"
              : "#1F2937",
            fontSize: "14px",
            height: "100%",
          }}
        />
        {showPasswordToggle ? (
          <IconButton
            size="small"
            onClick={() => setShowPassword(!showPassword)}
            sx={{ mr: 0.5, color: mode === "dark" ? "#9CA3AF" : "#6B7280", flexShrink: 0 }}
          >
            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
          </IconButton>
        ) : (
          <IconButton size="small" sx={{ mr: 0.5, flexShrink: 0 }}>
            <PencilCicleIcon fill={mode === "dark" ? "#9CA3AF" : "#6B7280"} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

interface MspFormStepTwoProps {
  onConfirm: () => void;
  onBack: () => void;
  onClear: () => void;
  isLoading?: boolean;
}

export const MspFormStepTwo = ({ onConfirm, onBack, onClear, isLoading }: MspFormStepTwoProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    mspDomain,
    setMSPDomain,
    admName,
    setAdmName,
    admEmail,
    setAdmEmail,
    admPhone,
    setAdmPhone,
    position,
    setPosition,
    admPassword,
    setAdmPassword,
    admUsername,
    setAdmUsername,
    brandLogoUrl,
    setBrandLogo,
    setShowErrorPageTwo,
  } = useZMspRegisterPage();

  const [previewUrl, setPreviewUrl] = useState<string | null>(brandLogoUrl || null);

  const handleConfirm = () => {
    // Validação dos campos obrigatórios
    if (!mspDomain || !admName || !admEmail) {
      setShowErrorPageTwo(true);
      return;
    }
    setShowErrorPageTwo(false);
    onConfirm();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validar tamanho (50mb)
      if (file.size > 50 * 1024 * 1024) {
        return;
      }
      // Validar extensão
      const validExtensions = [".svg", ".png", ".jpg", ".jpeg", ".gif", ".webp"];
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
      if (!validExtensions.includes(fileExtension)) {
        return;
      }

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setBrandLogo({
        brandLogoUrl: url,
        brandObjectName: file.name,
      });
    }
  };

  const handleRemoveLogo = () => {
    setPreviewUrl(null);
    setBrandLogo({
      brandLogoUrl: "",
      brandObjectName: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
      {/* Seção: Domínio do MSP */}
      <Box
        sx={{
          background: mode === "dark" ? "#1E293B" : "#F8FAFC",
          borderRadius: "12px",
          padding: "20px",
          border: `1px solid ${mode === "dark" ? "#334155" : "#E2E8F0"}`,
        }}
      >
        <TextRob16Font1S
          sx={{
            color: theme[mode].black,
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "20px",
            mb: 2,
          }}
        >
          {t("mspRegister.mspDomain")}
        </TextRob16Font1S>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CustomInput
              label={t("mspRegister.domain")}
              value={mspDomain}
              onChange={setMSPDomain}
              required
              placeholder="XX.XXX.XXX"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Seção: Administrador principal da MSP */}
      <Box
        sx={{
          background: mode === "dark" ? "#1E293B" : "#F8FAFC",
          borderRadius: "12px",
          padding: "20px",
          border: `1px solid ${mode === "dark" ? "#334155" : "#E2E8F0"}`,
        }}
      >
        <TextRob16Font1S
          sx={{
            color: theme[mode].black,
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "20px",
            mb: 2,
          }}
        >
          {t("mspRegister.principalAdmin")}
        </TextRob16Font1S>

        <Grid container spacing={2}>
          {/* Linha 1: Nome, E-mail */}
          <Grid item xs={12} md={6}>
            <CustomInput
              label={t("mspRegister.completeName")}
              value={admName}
              onChange={setAdmName}
              required
              placeholder={t("mspRegister.completeNamePlaceholder")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomInput
              label={t("mspRegister.email")}
              value={admEmail}
              onChange={setAdmEmail}
              required
              placeholder={t("mspRegister.emailPlaceholder")}
              type="email"
            />
          </Grid>

          {/* Linha 2: Telefone, Cargo, Senha, Username */}
          <Grid item xs={12} md={3}>
            <CustomInput
              label={t("mspRegister.phone")}
              value={admPhone}
              onChange={setAdmPhone}
              placeholder="(00) 90000-0000"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <CustomInput
              label={t("mspRegister.position")}
              value={position}
              onChange={setPosition}
              placeholder={t("mspRegister.positionPlaceholder")}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <CustomInput
              label={t("mspRegister.initialPassword")}
              value={admPassword}
              onChange={setAdmPassword}
              required
              placeholder={t("mspRegister.initialPasswordPlaceholder")}
              showPasswordToggle
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <CustomInput
              label="Nome de Usuário"
              value={admUsername}
              onChange={setAdmUsername}
              placeholder="Nome de Usuário"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Seção: Logotipo da empresa */}
      <Box
        sx={{
          background: mode === "dark" ? "#1E293B" : "#F8FAFC",
          borderRadius: "12px",
          padding: "20px",
          border: `1px solid ${mode === "dark" ? "#334155" : "#E2E8F0"}`,
        }}
      >
        <TextRob16Font1S
          sx={{
            color: theme[mode].black,
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "20px",
            mb: 1,
          }}
        >
          {t("mspRegister.companyLogo")}
        </TextRob16Font1S>
        <TextRob12Font2Xs
          sx={{
            color: mode === "dark" ? "#9CA3AF" : "#6B7280",
            fontSize: "12px",
            mb: 2,
          }}
        >
          {t("mspRegister.companyLogoSubtitle")}
        </TextRob12Font2Xs>

        <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Área de Upload */}
          <Box
            onClick={() => fileInputRef.current?.click()}
            sx={{
              width: "120px",
              height: "100px",
              border: `2px dashed ${mode === "dark" ? "#4B5563" : "#D1D5DB"}`,
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": {
                borderColor: theme[mode].blueMedium,
                backgroundColor: mode === "dark" ? "#374151" : "#F3F4F6",
              },
            }}
          >
            <CloudUploadIcon sx={{ color: mode === "dark" ? "#6B7280" : "#9CA3AF", mb: 1 }} />
            <Typography
              sx={{
                color: mode === "dark" ? "#9CA3AF" : "#6B7280",
                fontSize: "10px",
                textAlign: "center",
                px: 1,
              }}
            >
              Clique aqui para fazer upload do seu logo
            </Typography>
          </Box>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".svg,.png,.jpg,.jpeg,.gif,.webp"
            style={{ display: "none" }}
          />

          {/* Preview */}
          {previewUrl && (
            <Box
              sx={{
                width: "120px",
                height: "100px",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: mode === "dark" ? "#374151" : "#F3F4F6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px",
              }}
            >
              <ImgFromDB
                src={previewUrl}
                alt="Logo preview"
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
            </Box>
          )}

          {/* Links e Specs */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Link
              component="button"
              onClick={() => fileInputRef.current?.click()}
              sx={{
                color: theme[mode].blueMedium,
                fontSize: "13px",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Alterar logo
            </Link>
            {previewUrl && (
              <Link
                component="button"
                onClick={handleRemoveLogo}
                sx={{
                  color: theme[mode].danger,
                  fontSize: "13px",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Remover logo
              </Link>
            )}
            <Box sx={{ mt: 1 }}>
              <Typography sx={{ color: mode === "dark" ? "#6B7280" : "#9CA3AF", fontSize: "11px" }}>
                • Padrão: 145x50px
              </Typography>
              <Typography sx={{ color: mode === "dark" ? "#6B7280" : "#9CA3AF", fontSize: "11px" }}>
                • Tamanho: 50mb
              </Typography>
              <Typography sx={{ color: mode === "dark" ? "#6B7280" : "#9CA3AF", fontSize: "11px" }}>
                • Formatos: .svg .png .jpg .gif .webp
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Botões */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={isLoading}
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
              "&:disabled": {
                backgroundColor: theme[mode].gray,
              },
            }}
          >
            {t("mspRegister.confirm")}
          </Button>
          <Button
            variant="outlined"
            onClick={onBack}
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
            {t("mspRegister.back")}
          </Button>
        </Box>
        <Link
          component="button"
          onClick={onClear}
          sx={{
            color: mode === "dark" ? "#9CA3AF" : "#6B7280",
            fontSize: "14px",
            textDecoration: "none",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {t("mspRegister.clear")}
        </Link>
      </Box>
    </Stack>
  );
};
