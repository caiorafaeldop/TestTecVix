import { Box, Paper, Typography, useTheme, Zoom } from "@mui/material";
import { RegisterForm } from "./RegisterForm";

export const RegisterPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.background.default} 100%)`,
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
        "@keyframes gradient": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    >
      <Zoom in={true} style={{ transitionDelay: '300ms' }}>
        <Paper
          elevation={24}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: 450,
            borderRadius: 4,
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(20, 20, 30, 0.7)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: "blur(10px)",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: theme.palette.secondary.main }}>
            Join Us
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Create your account to get started
          </Typography>

          <RegisterForm />
        </Paper>
      </Zoom>
    </Box>
  );
};
