import { Stack } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { shadow } from "../../utils/shadow";
import { FormVM } from "./components/FormVM";
import { CardCreateWithIA } from "./components/CardCreateWithIA";
import { useTranslation } from "react-i18next";
import { TextRob20Font1MB } from "../../components/Text1MB";
import { TextRob12Font2Xs } from "../../components/Text2Xs";
import { SugestionsCards } from "./components/SugestionsCards";
import { ScreenFullPage } from "../../components/ScreenFullPage";
import { useEffect } from "react";
import { useZVM } from "../../stores/useZVM";


export const VirtualMachinePage = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { newRandomPassword, resetAll } = useZVM();

  useEffect(() => {
    return () => {
      resetAll();
      newRandomPassword();
    };
  }, []);

  return (
    <ScreenFullPage
      title={
        <TextRob20Font1MB
          sx={{
            color: theme[mode].primary,
            fontSize: "20px",
            fontWeight: "500",
            lineHeight: "28px",
          }}
        >
          {t("createVm.createVm")}
        </TextRob20Font1MB>
      }
      subtitle={
        <TextRob12Font2Xs
          sx={{
            color: theme[mode].gray,
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "16px",
          }}
        >
          {t("createVm.fillTheFields")}
        </TextRob12Font2Xs>
      }
      sxTitleSubTitle={{
        maxWidth: "1394px",
        "@media (max-width: 1700px)": {
          paddingLeft: "40px",
        },
      }}
    >
      <>
        <Stack
          width={"100%"}
          className=""
          flexDirection={"row"}
          sx={{
            backgroundColor: theme[mode].mainBackground,
            width: "85%",
            height: "100%",
            borderRadius: "16px",
            boxShadow: `0px 4px 4px 0px ${shadow(mode)}`,
            marginBottom: "12px",
            "@media (min-width: 1431px)": {
              marginBottom: "0px",
              flex: 1, // Divide as colunas igualmente
            },
          }}
        >
          <FormVM />
        </Stack>

        {/* IA modal card and sugestions */}
        <Stack
          sx={{
            width: "85%",
            marginBottom: "32px",
            justifyContent: "flex-start",
            gap: "12px",
            "@media (min-width: 1431px)": {
              marginBottom: "0px",
              flex: 1, // Divide as colunas igualmente
              maxWidth: "none",
            },
          }}
        >
          {/* Sugestions */}
          <Stack
            sx={{
              backgroundColor: theme[mode].mainBackground,
              boxShadow: `0px 4px 4px 0px ${shadow(mode)}`,
              borderRadius: "16px",
              "@media (min-width: 1431px)": {
                display: "block",
              },
            }}
          >
            <SugestionsCards />
          </Stack>
          {/* IA modal card */}
          <Stack
            width={"100%"}
            className=""
            flexDirection={"column"}
            sx={{
              backgroundColor: theme[mode].lightV2,
              boxShadow: `0px 4px 4px 0px ${shadow(mode)}`,
              border: `1px solid ${theme[mode].grayLight}`,
              borderRadius: "12px",
            }}
          >
            <CardCreateWithIA />
          </Stack>

        </Stack>
      </>
    </ScreenFullPage>
  );
};
