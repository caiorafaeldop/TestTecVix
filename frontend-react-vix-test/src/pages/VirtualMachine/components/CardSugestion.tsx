import { Stack } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { TextRob20Font1MB } from "../../../components/Text1MB";
import { useTranslation } from "react-i18next";
import { TextRob12Font2Xs } from "../../../components/Text2Xs";
import { Btn } from "../../../components/Buttons/Btn";
import { TextRob14FontXsB } from "../../../components/TextXsB";

interface IProps {
  cpu?: number;
  ram?: number;
  disk?: number;
  title: string;
  description: string;
  onClick: () => void;
}
export const CardSugestion = ({
  cpu,
  ram,
  disk,
  title,
  description,
  onClick,
}: IProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();

  return (
    <Stack
      sx={{
        backgroundColor: theme[mode].light,
        border: `1px solid ${theme[mode].grayLightV2}`,
        borderRadius: "16px",
        height: "180px",
        padding: "20px",
        gap: "12px",
        width: "100%",
        maxWidth: "280px",
        justifyContent: "space-between",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: `0px 10px 20px 0px ${theme[mode].grayLight}`,
          transform: "translateY(-4px)",
        },
      }}
    >
      <Stack
        sx={{
          gap: "8px",
        }}
      >
        <TextRob20Font1MB
          sx={{
            color: theme[mode].black,
            width: "100%",
            fontSize: "16px",
            fontFamily: "Roboto",
            fontWeight: "600",
            lineHeight: "22px",
            wordWrap: "break-word",
          }}
        >
          {title}
        </TextRob20Font1MB>

        <TextRob12Font2Xs
          sx={{
            color: theme[mode].gray,
            fontSize: "13px",
            fontWeight: "400",
            lineHeight: "18px",
          }}
        >
          {description}
        </TextRob12Font2Xs>
      </Stack>

      <Stack
        sx={{
          borderBottom: `1px solid ${theme[mode].grayLightV2}`,
          height: "0px",
        }}
      />
      {/* Tags */}
      <Stack
        sx={{
          flexDirection: "row",
          gap: "8px",
        }}
      >
        {/* CPU */}
        {cpu && (
          <Stack
            flexDirection={"row"}
            gap={"4px"}
            sx={{
              backgroundColor: theme[mode].grayLightV2,
              borderRadius: "6px",
              height: "24px",
              alignItems: "center",
              padding: "0px 8px",
              border: `1px solid ${theme[mode].grayLight}`,
            }}
          >
            <TextRob12Font2Xs
              sx={{
                color: theme[mode].black,
                fontSize: "11px",
                fontWeight: "500",
              }}
            >
              {t("createVm.cpuSuggestion")}:
            </TextRob12Font2Xs>
            <TextRob12Font2Xs
              sx={{
                color: theme[mode].black,
                fontSize: "12px",
                fontWeight: "700",
              }}
            >
              {cpu}
            </TextRob12Font2Xs>
          </Stack>
        )}
        {/* RAM */}
        {ram && (
          <Stack
            flexDirection={"row"}
            gap={"4px"}
            sx={{
              backgroundColor: theme[mode].grayLightV2,
              borderRadius: "6px",
              height: "24px",
              alignItems: "center",
              padding: "0px 8px",
              border: `1px solid ${theme[mode].grayLight}`,
            }}
          >
            <TextRob12Font2Xs
              sx={{
                color: theme[mode].black,
                fontSize: "11px",
                fontWeight: "500",
              }}
            >
              {t("createVm.ramSuggestion")}:
            </TextRob12Font2Xs>
            <TextRob12Font2Xs
              sx={{
                color: theme[mode].black,
                fontSize: "12px",
                fontWeight: "700",
              }}
            >
              {ram}GB
            </TextRob12Font2Xs>
          </Stack>
        )}
        {/* Disk */}
        {disk && (
          <Stack
            flexDirection={"row"}
            gap={"4px"}
            sx={{
              backgroundColor: theme[mode].grayLightV2,
              borderRadius: "6px",
              height: "24px",
              alignItems: "center",
              padding: "0px 8px",
              border: `1px solid ${theme[mode].grayLight}`,
            }}
          >
            <TextRob12Font2Xs
              sx={{
                color: theme[mode].black,
                fontSize: "11px",
                fontWeight: "500",
              }}
            >
              {t("home.disk")}:
            </TextRob12Font2Xs>
            <TextRob12Font2Xs
              sx={{
                color: theme[mode].black,
                fontSize: "12px",
                fontWeight: "700",
              }}
            >
              {disk}GB
            </TextRob12Font2Xs>
          </Stack>
        )}
      </Stack>
      <Btn
        onClick={onClick}
        sx={{
          paddingLeft: "9px",
          paddingRight: "9px",
          paddingTop: "6px",
          paddingBottom: "6px",
          borderRadius: "4px",
          border: "1px solid",
          borderColor: theme[mode].blueDark,
          justifyContent: "center",
          alignItems: "center",
          display: "inline-flex",
          height: "28px",
        }}
      >
        <TextRob14FontXsB
          sx={{
            color: theme[mode].blueDark,
            fontSize: "13px",
            fontWeight: "600",
            lineHeight: "14px",
          }}
        >
          {t("createVm.suggestionBtn")}
        </TextRob14FontXsB>
      </Btn>
    </Stack>
  );
};
