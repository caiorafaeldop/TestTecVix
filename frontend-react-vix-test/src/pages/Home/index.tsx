import { useState } from "react";
import { Stack } from "@mui/material";
import { ScreenFullPage } from "../../components/ScreenFullPage";
import { VmsCardsList } from "./components/VmsCardsList";
import { useZTheme } from "../../stores/useZTheme";
import { shadow } from "../../utils/shadow";
import { useCloseMenuTimed } from "../../hooks/useCloseMenuTimed";
import { MainGraphic } from "./components/Graphics/MainGraphic";
import { TopGraphic } from "./components/Graphics/TopGraphic";
import { BottomGraphic } from "./components/Graphics/BottomGraphic";
import { ExpandButton } from "../../components/Buttons/ExpandButton";
import { ModalChart } from "./components/Graphics/ModalChart";
import { useZGlobalVar } from "../../stores/useZGlobalVar";
import { WelcomeCards } from "./components/WelcomeCards";
import { useListVms } from "../../hooks/useListVms";

export const HomePage = () => {
  const { theme, mode } = useZTheme();
  useCloseMenuTimed();
  const { totalCountVMs } = useZGlobalVar();
  const [selectedChart, setSelectedChart] = useState<
    "main" | "top" | "bottom" | null
  >(null);
  const { vmList, isLoading } = useListVms();

  return (
    <>
      <ScreenFullPage>
        <Stack
          width={"100%"}
          flexDirection={"row"}
          sx={{
            justifyContent: "flex-start",
            "@media (max-width: 744px)": {
              flexDirection: "column",
            },
          }}
        >
          {!isLoading && (!vmList || vmList.length === 0) ? (
            <WelcomeCards />
          ) : (
            <Stack
              sx={{
                width: "100%",
                gap: "16px",
              }}
            >
              <VmsCardsList />
              {/* Maps container */}
              {Boolean(totalCountVMs) && (
                <Stack
                  sx={{
                    height: "100%",
                    minHeight: "300px",
                    flexDirection: "row",
                    gap: "12px",
                    padding: "0px 32px",
                    paddingBottom: "8px",
                    "@media (max-width: 865px)": {
                      flexDirection: "column",
                      maxHeight: "unset",
                    },
                  }}
                >
                  {/* Main map */}
                  <Stack
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      width: "50%",
                      height: "100%",
                      borderRadius: "16px",
                      boxShadow: `0px 4px 4px 0px ${shadow(mode)}`,
                      padding: "16px",
                      paddingTop: "24px",
                      backgroundColor: theme[mode].mainBackground,
                      "@media (max-width: 865px)": {
                        flexDirection: "column",
                        width: "100%",
                        minHeight: "325px",
                      },
                    }}
                  >
                    <ExpandButton onClick={() => setSelectedChart("main")} />
                    <MainGraphic />
                  </Stack>
                  {/* Seconds Maps */}
                  <Stack
                    sx={{
                      width: "50%",
                      height: "100%",
                      gap: "12px",
                      "@media (max-width: 865px)": {
                        width: "100%",
                        minHeight: "425px",
                      },
                    }}
                  >
                    {/* Memory map */}
                    <Stack
                      sx={{
                        position: "relative",
                        borderRadius: "16px",
                        boxShadow: `0px 4px 4px 0px ${shadow(mode)}`,
                        height: "100%",
                        backgroundColor: theme[mode].mainBackground,
                        padding: "8px",
                        paddingTop: "16px",
                      }}
                    >
                      <ExpandButton
                        sx={{
                          zIndex: 100,
                        }}
                        onClick={() => setSelectedChart("bottom")}
                      />
                      <BottomGraphic />
                    </Stack>
                  </Stack>
                </Stack>
              )}
            </Stack>
          )}
        </Stack>
      </ScreenFullPage>
      {Boolean(selectedChart) && (
        <ModalChart
          open={Boolean(selectedChart)}
          onClose={() => setSelectedChart(null)}
        >
          {selectedChart === "main" && <MainGraphic />}
          {selectedChart === "top" && <TopGraphic />}
          {selectedChart === "bottom" && <BottomGraphic />}
        </ModalChart>
      )}
    </>
  );
};
