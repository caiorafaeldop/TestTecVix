import React, { useMemo } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useZTheme } from "../stores/useZTheme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { mode, theme: themeStore } = useZTheme();

  const currentTheme = themeStore[mode];

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        primary: {
          main: currentTheme.blueMedium, 
          light: currentTheme.blueLight,
          dark: currentTheme.blueDark,
          contrastText: "#fff",
        },
        secondary: {
          main: currentTheme.tertiary,
        },
        background: {
          default: currentTheme.mainBackground,
          paper: currentTheme.light,
        },
        text: {
          primary: mode === "light" ? currentTheme.black : currentTheme.dark,
          secondary: currentTheme.gray,
        },
        error: {
          main: currentTheme.danger,
        },
        success: {
          main: currentTheme.ok,
        },
        warning: {
          main: currentTheme.warning,
        },
      },
      typography: {
        fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        h1: { fontSize: "2.5rem", fontWeight: 700 },
        h2: { fontSize: "2rem", fontWeight: 600 },
        h3: { fontSize: "1.75rem", fontWeight: 600 },
        button: { textTransform: "none", fontWeight: 600 },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              padding: "8px 16px",
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: "none",
            },
            elevation1: {
                boxShadow: `0px 4px 20px ${currentTheme.shadow}`
            }
          },
        },
      },
    });
  }, [mode, currentTheme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer theme={mode} position="top-right" />
      {children}
    </ThemeProvider>
  );
};
