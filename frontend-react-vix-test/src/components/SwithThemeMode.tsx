import { HalfMoon } from "../icons/HalfMoon";
import { LightModeIcon } from "../icons/LightModeIcon";
import { useZTheme } from "../stores/useZTheme";
import { IconButton, Stack } from "@mui/material";

export const SwithThemeMode = () => {
  const { mode, toggleMode, theme } = useZTheme();

  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
      }}
    >
      <IconButton
        type="button"
        sx={{
          p: 0,
          width: "24px",
          height: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        onClick={toggleMode}
      >
        {mode === "dark" ? (
          <LightModeIcon 
            fill={theme[mode].blueMedium} 
            style={{ width: '22px', height: '22px' }} 
          />
        ) : (
          <HalfMoon 
            fill={theme[mode].blueMedium} 
            style={{ width: '22px', height: '22px' }} 
          />
        )}
      </IconButton>
    </Stack>
  );
};
