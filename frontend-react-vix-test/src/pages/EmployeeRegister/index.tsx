import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Paper,
  Typography,
  Grid,
  Fade,
  Chip,
  IconButton,
  InputAdornment,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  Lock,
  Work,
  Badge,
  Visibility,
  VisibilityOff,
  Add,
  Search,
} from "@mui/icons-material";
import { Screen } from "../../components/Screen";
import { Sidebar } from "../../components/Sidebar";
import { useZTheme } from "../../stores/useZTheme";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "manager" | "member";
  department: string;
  status: "active" | "inactive";
}

const mockEmployees: Employee[] = [
  { id: "1", name: "João Silva", email: "joao@vituax.com", phone: "(11) 99999-1234", role: "admin", department: "TI", status: "active" },
  { id: "2", name: "Maria Santos", email: "maria@vituax.com", phone: "(11) 98888-5678", role: "manager", department: "RH", status: "active" },
  { id: "3", name: "Pedro Costa", email: "pedro@vituax.com", phone: "(11) 97777-9012", role: "member", department: "Vendas", status: "inactive" },
];

export const EmployeeRegisterPage = () => {
  const muiTheme = useTheme();
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "member" as "admin" | "manager" | "member",
    department: "",
    position: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [employees] = useState<Employee[]>(mockEmployees);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error(t("colaboratorRegister.dontMatch"));
      return;
    }
    toast.success(isEditing ? t("colaboratorRegister.userEdited") : t("colaboratorRegister.userCreated"));
    handleClear();
  };

  const handleClear = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      confirmPassword: "",
      role: "member",
      department: "",
      position: "",
    });
    setIsEditing(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return muiTheme.palette.error.main;
      case "manager": return muiTheme.palette.warning.main;
      default: return muiTheme.palette.info.main;
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Screen sx={{ backgroundColor: theme[mode].light }}>
      <Box sx={{ display: "flex", height: "100%", width: "100%" }}>
        <Sidebar />
        <Box
          sx={{
            flex: 1,
            p: 4,
            overflowY: "auto",
            background: mode === "dark" 
              ? `linear-gradient(135deg, ${alpha(theme[mode].primary, 0.05)} 0%, ${theme[mode].light} 100%)`
              : theme[mode].light,
          }}
        >
          {/* Header */}
          <Fade in timeout={500}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                fontWeight="600"
                sx={{
                  color: theme[mode].primary,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Badge sx={{ fontSize: 32 }} />
                {t("colaboratorRegister.title")}
                <Typography
                  component="span"
                  sx={{ color: theme[mode].gray, fontWeight: 400 }}
                >
                  {" "}| {t("colaboratorRegister.sideTitle")}
                </Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {t("colaboratorRegister.subtitle")}
              </Typography>
            </Box>
          </Fade>

          {/* Form Card */}
          <Fade in timeout={700}>
            <Paper
              elevation={0}
              component="form"
              onSubmit={handleSubmit}
              sx={{
                p: 4,
                mb: 4,
                borderRadius: 4,
                backgroundColor: mode === "dark" 
                  ? alpha(theme[mode].mainBackground, 0.8)
                  : theme[mode].mainBackground,
                backdropFilter: "blur(10px)",
                border: `1px solid ${alpha(theme[mode].primary, 0.1)}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: `0 8px 32px ${alpha(theme[mode].primary, 0.15)}`,
                },
              }}
            >
              <Typography variant="h6" fontWeight="500" sx={{ mb: 3, color: theme[mode].black }}>
                {isEditing ? t("colaboratorRegister.registersManagement") : t("colaboratorRegister.subtitle")}
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label={t("colaboratorRegister.completeName")}
                    value={formData.name}
                    onChange={handleChange("name")}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label={t("colaboratorRegister.email")}
                    type="email"
                    value={formData.email}
                    onChange={handleChange("email")}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label={t("colaboratorRegister.phone")}
                    value={formData.phone}
                    onChange={handleChange("phone")}
                    placeholder="(00) 00000-0000"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label={t("colaboratorRegister.username")}
                    value={formData.username}
                    onChange={handleChange("username")}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label={t("colaboratorRegister.password")}
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange("password")}
                    required={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label={t("colaboratorRegister.confirmPassword")}
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    required={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    select
                    label={t("colaboratorRegister.permission")}
                    value={formData.role}
                    onChange={handleChange("role")}
                    required
                  >
                    <MenuItem value="admin">{t("colaboratorRegister.admin")}</MenuItem>
                    <MenuItem value="manager">{t("colaboratorRegister.manager")}</MenuItem>
                    <MenuItem value="member">{t("colaboratorRegister.member")}</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label={t("colaboratorRegister.department")}
                    value={formData.department}
                    onChange={handleChange("department")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Work color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label={t("colaboratorRegister.position")}
                    value={formData.position}
                    onChange={handleChange("position")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Badge color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<Add />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${muiTheme.palette.primary.main} 0%, ${muiTheme.palette.primary.dark} 100%)`,
                    boxShadow: `0 4px 14px ${alpha(muiTheme.palette.primary.main, 0.4)}`,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 6px 20px ${alpha(muiTheme.palette.primary.main, 0.5)}`,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {isEditing ? t("colaboratorRegister.save") : t("colaboratorRegister.save")}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleClear}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                  }}
                >
                  {t("colaboratorRegister.clear")}
                </Button>
              </Box>
            </Paper>
          </Fade>

          {/* Employee List */}
          <Fade in timeout={900}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                backgroundColor: mode === "dark"
                  ? alpha(theme[mode].mainBackground, 0.8)
                  : theme[mode].mainBackground,
                backdropFilter: "blur(10px)",
                border: `1px solid ${alpha(theme[mode].primary, 0.1)}`,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
                <Typography variant="h6" fontWeight="500" sx={{ color: theme[mode].black }}>
                  {t("colaboratorRegister.tableTitle")}
                </Typography>
                <TextField
                  size="small"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ minWidth: 250 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {filteredEmployees.map((emp, index) => (
                  <Fade in timeout={300 + index * 100} key={emp.id}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        border: `1px solid ${alpha(theme[mode].primary, 0.1)}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: theme[mode].primary,
                          transform: "translateX(4px)",
                          boxShadow: `0 4px 16px ${alpha(theme[mode].primary, 0.1)}`,
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${getRoleColor(emp.role)} 0%, ${alpha(getRoleColor(emp.role), 0.7)} 100%)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: 600,
                            fontSize: 18,
                          }}
                        >
                          {emp.name.charAt(0).toUpperCase()}
                        </Box>
                        <Box>
                          <Typography fontWeight="600" sx={{ color: theme[mode].black }}>
                            {emp.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {emp.email}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Chip
                          label={emp.role.charAt(0).toUpperCase() + emp.role.slice(1)}
                          size="small"
                          sx={{
                            backgroundColor: alpha(getRoleColor(emp.role), 0.15),
                            color: getRoleColor(emp.role),
                            fontWeight: 600,
                          }}
                        />
                        <Chip
                          label={emp.status === "active" ? t("colaboratorRegister.active") : t("colaboratorRegister.inactive")}
                          size="small"
                          sx={{
                            backgroundColor: emp.status === "active"
                              ? alpha(muiTheme.palette.success.main, 0.15)
                              : alpha(muiTheme.palette.grey[500], 0.15),
                            color: emp.status === "active"
                              ? muiTheme.palette.success.main
                              : muiTheme.palette.grey[500],
                            fontWeight: 600,
                          }}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
                          {emp.department}
                        </Typography>
                      </Box>
                    </Paper>
                  </Fade>
                ))}
              </Box>
            </Paper>
          </Fade>
        </Box>
      </Box>
    </Screen>
  );
};
