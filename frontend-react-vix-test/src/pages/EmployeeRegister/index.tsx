import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Typography,
  Grid,
  Fade,
  IconButton,
  Select,
  alpha,
  Stack,
  CircularProgress,
} from "@mui/material";
import { DropDown } from "../../components/Inputs/DropDown";
import { FilterIcon } from "../../icons/FilterIcon";
import {
  Add,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { PencilCicleIcon } from "../../icons/PencilCicleIcon";
import { useZTheme } from "../../stores/useZTheme";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { TextRob14Font1Xs } from "../../components/Text1Xs";
import { ScreenFullPage } from "../../components/ScreenFullPage";
import { TextRob20Font1MB } from "../../components/Text1MB";
import { IUserDB, useUserResources } from "../../hooks/useUserResources";
import { TRole, useZUserProfile } from "../../stores/useZUserProfile";

// Custom Input Component with label above and pencil icon
const CustomInput = ({ 
  label, 
  value, 
  onChange, 
  required = false, 
  type = "text",
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword,
  placeholder = "",
  mode,
  theme,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  placeholder?: string;
  mode: "light" | "dark";
  theme: any;
}) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
    <Typography 
      variant="body2" 
      sx={{ 
        fontWeight: 500, 
        color: mode === "dark" ? "#D1D5DB" : "#374151",
        fontSize: "13px",
      }}
    >
      {label} {required && <span style={{ color: "#EF4444" }}>*</span>}
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
        onChange={onChange}
        placeholder={placeholder}
        required={required}
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
      {showPasswordToggle ? (
        <IconButton size="small" onClick={onTogglePassword} sx={{ mr: 0.5, color: mode === "dark" ? "#9CA3AF" : "#6B7280", flexShrink: 0 }}>
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

// Custom Select Component with label above
const CustomSelect = ({
  label,
  value,
  onChange,
  required = false,
  options,
  mode,
  theme,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  options: { value: string; label: string }[];
  mode: "light" | "dark";
  theme: any;
}) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
    <Typography 
      variant="body2" 
      sx={{ 
        fontWeight: 500, 
        color: mode === "dark" ? "#D1D5DB" : "#374151",
        fontSize: "13px",
      }}
    >
      {label} {required && <span style={{ color: "#EF4444" }}>*</span>}
    </Typography>
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as string)}
      size="small"
      sx={{
        backgroundColor: mode === "dark" ? "#374151" : "#F3F4F6",
        borderRadius: "8px",
        color: mode === "dark" ? "#FFFFFF" : "#1F2937",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: mode === "dark" ? "#4B5563" : "#E5E7EB",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme[mode].blueMedium,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme[mode].blueMedium,
        },
        "& .MuiSelect-icon": {
          color: mode === "dark" ? "#9CA3AF" : "#6B7280",
        },
      }}
    >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </Select>
  </Box>
);

// Custom Date Input Component
const CustomDateInput = ({
  label,
  value,
  onChange,
  required = false,
  mode,
  theme,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  mode: "light" | "dark";
  theme: any;
}) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
    <Typography 
      variant="body2" 
      sx={{ 
        fontWeight: 500, 
        color: mode === "dark" ? "#D1D5DB" : "#374151",
        fontSize: "13px",
      }}
    >
      {label} {required && <span style={{ color: "#EF4444" }}>*</span>}
    </Typography>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: mode === "dark" ? "#374151" : "#F3F4F6",
        borderRadius: "8px",
        border: `1px solid ${mode === "dark" ? "#4B5563" : "#E5E7EB"}`,
        overflow: "hidden",
        height: "40px",
        "&:focus-within": {
          borderColor: theme[mode].blueMedium,
        },
      }}
    >
      <input
        type="date"
        value={value}
        onChange={onChange}
        required={required}
        style={{
          flex: 1,
          padding: "0 12px",
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          color: mode === "dark" ? "#FFFFFF" : "#1F2937",
          fontSize: "14px",
          height: "100%",
        }}
      />
    </Box>
  </Box>
);

export const EmployeeRegisterPage = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { role: currentUserRole } = useZUserProfile();
  const { getAllUsers, createUserByManager, updateUserById, deleteUser, isLoading } = useUserResources();
  
  const [employees, setEmployees] = useState<IUserDB[]>([]);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    idUser: "",
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    position: "", // Not persisted
    department: "", // Not persisted
    permission: "member" as TRole,
    hiringDate: "", // Not persisted
    status: "active",
    companyName: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [companyFilter, setCompanyFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const formRef = useRef<HTMLDivElement>(null);

  const fetchUsers = async () => {
    setLoading(true);
    const users = await getAllUsers();
    setEmployees(users);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing && formData.password !== formData.confirmPassword) {
      toast.error(t("colaboratorRegister.dontMatch"));
      return;
    }
    if (formData.password && formData.password !== formData.confirmPassword) {
        toast.error(t("colaboratorRegister.dontMatch"));
        return;
    }

    const payload: any = {
        username: formData.username,
        email: formData.email,
        role: formData.permission,
        fullName: formData.name,
        userPhoneNumber: formData.phone,
        isActive: formData.status === "active",
        // position, department, hiringDate ignored as backend doesn't support them yet
    };

    if (formData.password) {
        payload.password = formData.password;
    }

    let success;
    if (isEditing) {
        success = await updateUserById(formData.idUser, payload);
        if (success) toast.success(t("colaboratorRegister.userEdited"));
    } else {
        success = await createUserByManager(payload);
        if (success) toast.success(t("colaboratorRegister.userCreated"));
    }

    if (success) {
        handleClear();
        fetchUsers(); // Refresh list immediately
    }
  };

  const handleClear = () => {
    setFormData({
      idUser: "",
      name: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      confirmPassword: "",
      position: "",
      department: "",
      permission: "member",
      hiringDate: "",
      status: "active",
      companyName: "",
    });
    setIsEditing(false);
  };

  const handleEdit = (emp: IUserDB) => {
    setFormData({
      idUser: emp.idUser,
      name: emp.fullName || "",
      email: emp.email,
      phone: emp.userPhoneNumber || "",
      username: emp.username,
      password: "",
      confirmPassword: "",
      position: "", // Data not available
      department: "", // Data not available
      permission: emp.role,
      hiringDate: "",
      status: emp.isActive ? "active" : "inactive",
      companyName: "", // emp.idBrandMaster ? ... logic needed if mapping brands
    });
    setIsEditing(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleDelete = async (emp: IUserDB) => {
    if (window.confirm(`Are you sure you want to delete ${emp.username}?`)) {
        const success = await deleteUser(emp.idUser);
        if (success) {
            toast.success(`${emp.username} foi removido com sucesso`);
            fetchUsers();
        }
    }
  };

  const getStatusColor = (active: boolean) => {
    return active ? "#10B981" : "#6B7280";
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "#EF4444";
      case "manager": return "#F59E0B";
      default: return "#3B82F6";
    }
  };

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
          {t("colaboratorRegister.title")}
        </TextRob20Font1MB>
      }
      subtitle={
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "16px" }}>
          {t("colaboratorRegister.subtitle")}
        </Typography>
      }
      sxTitleSubTitle={{
        paddingLeft: "40px",
        paddingRight: "40px",
      }}
      sxContainer={{
        paddingLeft: "40px",
        paddingRight: "40px",
        paddingBottom: "40px",
        display: "block",
      }}
    >
      <Box sx={{ width: "100%" }}>
        {/* Form Card */}
        {currentUserRole !== "member" && (
          <Fade in timeout={700}>
            <Paper
            ref={formRef}
            elevation={0}
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              backgroundColor: mode === "dark" 
                ? alpha(theme[mode].mainBackground, 0.8)
                : theme[mode].mainBackground,
              border: `1px solid ${alpha(theme[mode].primary, 0.1)}`,
            }}
          >
            <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 3, color: theme[mode].black }}>
              {isEditing ? t("colaboratorRegister.registersManagement") : t("colaboratorRegister.subtitle")}
            </Typography>

            <Grid container spacing={2}>
                  {/* Row 1 */}
                  <Grid item xs={12} md={4}>
                    <CustomInput
                      label="Full Name"
                      value={formData.name}
                      onChange={handleChange("name")}
                      required
                      mode={mode}
                      theme={theme}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CustomInput
                      label="Email"
                      value={formData.email}
                      onChange={handleChange("email")}
                      required
                      type="email"
                      mode={mode}
                      theme={theme}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CustomInput
                      label="Phone"
                      value={formData.phone}
                      onChange={handleChange("phone")}
                      required
                      placeholder="(00) 00000-0000"
                      mode={mode}
                      theme={theme}
                    />
                  </Grid>

                  {/* Row 2 */}
                  <Grid item xs={12} md={4}>
                    <CustomInput
                      label="Username"
                      value={formData.username}
                      onChange={handleChange("username")}
                      required
                      mode={mode}
                      theme={theme}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CustomInput
                      label="Password"
                      value={formData.password}
                      onChange={handleChange("password")}
                      required={!isEditing}
                      showPasswordToggle
                      showPassword={showPassword}
                      onTogglePassword={() => setShowPassword(!showPassword)}
                      mode={mode}
                      theme={theme}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CustomInput
                      label="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange("confirmPassword")}
                      required={!isEditing}
                      showPasswordToggle
                      showPassword={showPassword}
                      onTogglePassword={() => setShowPassword(!showPassword)}
                      mode={mode}
                      theme={theme}
                    />
                  </Grid>

                  {/* Row 3 */}
                  <Grid item xs={12} md={4}>
                    <CustomInput
                      label="Position"
                      value={formData.position}
                      onChange={handleChange("position")}
                      // required // Removed required as backend doesn't store it
                      mode={mode}
                      theme={theme}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CustomInput
                      label="Department"
                      value={formData.department}
                      onChange={handleChange("department")}
                      mode={mode}
                      theme={theme}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CustomSelect
                      label="User Permission"
                      value={formData.permission}
                      onChange={handleSelectChange("permission")}
                      required
                      options={[
                        { value: "admin", label: "Admin" },
                        { value: "manager", label: "Manager" },
                        { value: "member", label: "Member" },
                      ]}
                      mode={mode}
                      theme={theme}
                    />
                  </Grid>

                  {/* Row 4 */}
                  <Grid item xs={12} md={4}>
                    <CustomDateInput
                      label="Hiring Date"
                      value={formData.hiringDate}
                      onChange={handleChange("hiringDate")}
                      mode={mode}
                      theme={theme}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CustomSelect
                      label="Status"
                      value={formData.status}
                      onChange={handleSelectChange("status")}
                      required
                      options={[
                        { value: "active", label: "Active" },
                        { value: "inactive", label: "Inactive" },
                      ]}
                      mode={mode}
                      theme={theme}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CustomSelect
                      label="Company Name"
                      value={formData.companyName}
                      onChange={handleSelectChange("companyName")}
                      options={[
                        { value: "", label: "Select company..." },
                        { value: "vituax", label: "Vituax" },
                        { value: "upix", label: "UPIX" },
                        { value: "msptech", label: "MSP Tech" },
                      ]}
                      mode={mode}
                      theme={theme}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Add />}
                    disabled={isLoading}
                    sx={{
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                      backgroundColor: theme[mode].blueDark,
                      "&:hover": {
                        backgroundColor: theme[mode].blue,
                      },
                    }}
                  >
                    {isEditing ? t("colaboratorRegister.save") : t("colaboratorRegister.save")}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleClear}
                    sx={{
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      textTransform: "none",
                    }}
                  >
                    {t("colaboratorRegister.clear")}
                  </Button>
                </Box>
              </Paper>
            </Fade>
          )}

            {/* Employee List */}
            <Fade in timeout={900}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: mode === "dark"
                    ? alpha(theme[mode].mainBackground, 0.8)
                    : theme[mode].mainBackground,
                  border: `1px solid ${alpha(theme[mode].primary, 0.1)}`,
                }}
              >
                {/* Title and Filters */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
                  <Typography variant="h6" fontWeight="500" sx={{ color: theme[mode].black }}>
                    {t("colaboratorRegister.tableTitle")}
                  </Typography>
                  <Stack direction="row" gap={2}>
                    <DropDown
                      data={[
                        { label: "All companies", value: "all" },
                        { label: "Vituax", value: "vituax" },
                        { label: "UPIX", value: "upix" },
                      ]}
                      onChange={(val) => setCompanyFilter(val?.value as string)}
                      value={{
                        label:
                          companyFilter === "all"
                            ? "All companies"
                            : companyFilter === "vituax"
                            ? "Vituax"
                            : "UPIX",
                        value: companyFilter,
                      }}
                      sxContainer={{
                        width: "180px",
                        "@media (max-width: 659px)": {
                          width: "100%",
                        },
                      }}
                      placeholder="All companies"
                      placeholderIcon={<FilterIcon fill={theme[mode].gray} />}
                    />
                    <DropDown
                      data={[
                        { label: "All users", value: "all" },
                        { label: "Admin", value: "admin" },
                        { label: "Manager", value: "manager" },
                        { label: "Member", value: "member" },
                      ]}
                      onChange={(val) => setUserFilter(val?.value ?? "all")}
                      value={{
                        label:
                          !userFilter || userFilter === "all"
                            ? "All users"
                            : userFilter.charAt(0).toUpperCase() +
                              userFilter.slice(1),
                        value: userFilter ?? "all",
                      }}
                      sxContainer={{
                        width: "180px",
                        "@media (max-width: 659px)": {
                          width: "100%",
                        },
                      }}
                      placeholder="All users"
                      placeholderIcon={<FilterIcon fill={theme[mode].gray} />}
                    />
                  </Stack>
                </Box>

                {/* Employee Cards */}
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {employees
                    .filter(param => userFilter === "all" ? true : param.role === userFilter)
                    .map((emp, index) => (
                    <Fade in timeout={300 + index * 100} key={emp.idUser}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: `1px solid ${alpha(theme[mode].primary, 0.1)}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          gap: 2,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            borderColor: theme[mode].primary,
                            boxShadow: `0 2px 8px ${alpha(theme[mode].primary, 0.1)}`,
                          },
                        }}
                      >
                        {/* Left: Avatar + Name + Email */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 3 }}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                              backgroundColor: theme[mode].blueMedium,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              fontWeight: 600,
                              fontSize: 16,
                            }}
                          >
                            {emp.profileImgUrl ? (
                                <img src={emp.profileImgUrl} alt={emp.username} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                            ) : (
                                (emp.fullName || emp.username).charAt(0).toUpperCase()
                            )}
                          </Box>
                          <Box>
                            <Typography fontWeight="600" sx={{ color: theme[mode].black, fontSize: 14 }}>
                              {emp.fullName || emp.username}
                            </Typography>
                            <Typography variant="body2" sx={{ color: mode === "dark" ? "#9CA3AF" : "#6B7280", fontSize: 13 }}>
                              {emp.email}
                            </Typography>
                          </Box>
                        </Box>
                        
                        {/* Status Section */}
                        <Box sx={{ textAlign: "left", flex: 2 }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: theme[mode].black, 
                              fontSize: 13,
                              fontWeight: 500,
                            }}
                          >
                            Status
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: mode === "dark" ? "#9CA3AF" : "#6B7280", 
                              fontSize: 12 
                            }}
                          >
                            Last Login: {
                              emp.lastLoginDate 
                                ? new Date(emp.lastLoginDate).toLocaleDateString() 
                                : emp.updatedAt 
                                  ? new Date(emp.updatedAt).toLocaleDateString() 
                                  : 'N/A'
                            }
                          </Typography>
                        </Box>

                        {/* Tags: Role + Company + Status */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", flex: 3 }}>
                          <TextRob14Font1Xs
                            sx={{
                              display: "inline-block",
                              px: 1.5,
                              py: 0.3,
                              borderRadius: "12px",
                              border: `1px solid ${getRoleColor(emp.role)}`,
                              color: getRoleColor(emp.role),
                              fontSize: 14,
                              fontWeight: 400,
                              cursor: "default",
                            }}
                          >
                            {emp.role === "admin" ? "Administrator" : emp.role === "manager" ? "Manager" : "Member"}
                          </TextRob14Font1Xs>
                          
                          <TextRob14Font1Xs
                            sx={{
                              display: "inline-block",
                              px: 1.5,
                              py: 0.3,
                              borderRadius: "12px",
                              border: `1px solid ${getStatusColor(emp.isActive)}`,
                              color: getStatusColor(emp.isActive),
                              fontSize: 14,
                              fontWeight: 400,
                              cursor: "default",
                            }}
                          >
                            {emp.isActive ? "Active" : "Inactive"}
                          </TextRob14Font1Xs>
                        </Box>

                        {/* Right: Edit + Delete */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1, justifyContent: "flex-end" }}>
                          {currentUserRole !== "member" && (
                            <>
                                <IconButton 
                                size="small" 
                                onClick={() => handleEdit(emp)}
                                sx={{ 
                                    "&:hover": { opacity: 0.8 },
                                }}
                                >
                                <PencilCicleIcon fill={theme[mode].blueMedium} />
                                </IconButton>
                                <IconButton 
                                size="small" 
                                onClick={() => handleDelete(emp)}
                                sx={{ 
                                    "&:hover": { opacity: 0.8 },
                                }}
                                >
                                <DeleteForeverIcon sx={{ color: "#EF4444" }} />
                                </IconButton>
                            </>
                          )}
                        </Box>
                      </Paper>
                    </Fade>
                  ))}
                </Box>
                )}
              </Paper>
            </Fade>
      </Box>
    </ScreenFullPage>
  );
};
