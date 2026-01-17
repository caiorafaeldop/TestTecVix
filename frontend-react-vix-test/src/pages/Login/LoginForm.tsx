import { useState } from "react";
import { useZUserProfile } from "../../stores/useZUserProfile";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../stores/useZTheme";
import { VisibilityOn, VisibilityOff } from "../../icons/Visibility";

interface IProps {
    isRegistering: boolean;
    setIsRegistering: (value: boolean) => void;
}

export const LoginForm = ({ isRegistering, setIsRegistering }: IProps) => {
    const { t } = useTranslation();
    const { theme, mode } = useZTheme();
    const currentTheme = theme[mode];

    const [name, setName] = useState("");
    const [email, setEmail] = useState("usuario@example.com");
    const [password, setPassword] = useState("password123");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    // Checkbox state for "Keep me signed in"
    const [keepSignedIn, setKeepSignedIn] = useState(true);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const setUser = useZUserProfile((state) => state.setUser);
    const navigate = useNavigate();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
        if (isRegistering) {
            if (password !== confirmPassword) {
                toast.error(t("loginRegister.passwordMismatch"));
                return;
            }
            await authService.register({ name, email, password });
            toast.success("Account created successfully! Please login.");
            setIsRegistering(false);
        } else {
            const data = await authService.login({ email, password });
            setUser({
              token: data.token,
              username: data.user.username,
              userEmail: data.user.email,
              role: data.user.role,
              idUser: data.user.idUser,
              idBrand: data.user.idBrandMaster
            });
            toast.success("Login successful!");
            navigate("/");
        }
      } catch (error: any) {
        console.error(error);
        const msg = error.response?.data?.message || (isRegistering ? "Registration failed" : "Login failed");
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };

    const inputStyle = {
        backgroundColor: mode === 'light' ? '#E5E7EB' : '#374151',
        color: mode === 'light' ? '#1F2937' : '#FFFFFF',
        borderColor: 'transparent'
    };
    
    const labelStyle = {
        color: mode === 'light' ? '#6B7280' : '#D1D5DB'
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
            {/* Name Field (Register Only) */}
            {isRegistering && (
                <div className="mb-4">
                    <label className="block text-xs mb-1.5 font-medium" style={labelStyle}>
                        {t("loginRegister.username")} *
                    </label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-[38px] rounded-xl px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm"
                        style={inputStyle}
                        required={isRegistering}
                    />
                </div>
            )}

            {/* Email Field */}
            <div className="mb-4">
                <label className="block text-xs mb-1.5 font-medium" style={labelStyle}>
                    {t("loginRegister.email")} {isRegistering ? '*' : ''}
                </label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-[38px] rounded-xl px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm"
                    style={inputStyle}
                    required
                />
            </div>

            {/* Password Field */}
            <div className="mb-5">
                <label className="block text-xs mb-1.5 font-medium" style={labelStyle}>
                    {t("loginRegister.password")} {isRegistering ? '*' : ''}
                </label>
                <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-[38px] rounded-xl px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm"
                        style={inputStyle}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        {showPassword ? (
                            <VisibilityOff width={20} height={20} fill={mode === 'light' ? '#6B7280' : '#D1D5DB'} />
                        ) : (
                            <VisibilityOn width={20} height={20} fill={mode === 'light' ? '#6B7280' : '#D1D5DB'} />
                        )}
                    </button>
                </div>
            </div>

            {/* Confirm Password Field (Register Only) */}
            {isRegistering && (
                <div className="mb-5">
                    <label className="block text-xs mb-1.5 font-medium" style={labelStyle}>
                        {t("loginRegister.confirmPassword")} *
                    </label>
                    <div className="relative">
                        <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full h-[38px] rounded-xl px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm"
                            style={inputStyle}
                            required={isRegistering}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                            {showConfirmPassword ? (
                                <VisibilityOff width={20} height={20} fill={mode === 'light' ? '#6B7280' : '#D1D5DB'} />
                            ) : (
                                <VisibilityOn width={20} height={20} fill={mode === 'light' ? '#6B7280' : '#D1D5DB'} />
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Options Row (Login Only) */}
            {!isRegistering && (
                <div className="flex items-center justify-between mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={keepSignedIn}
                            onChange={(e) => setKeepSignedIn(e.target.checked)}
                            className="w-3.5 h-3.5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                        />
                        <span className="text-xs font-medium" style={{ color: mode === 'light' ? '#374151' : currentTheme.tertiary }}>
                            {t("loginRegister.staySignedIn")}
                        </span>
                    </label>
                    
                    <a href="#" className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors">
                        {t("loginRegister.forgotPassword")}
                    </a>
                </div>
            )}

            {/* Submit Button */}
            <button 
                type="submit" 
                disabled={loading}
                className="w-full h-[40px] bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-700/20 flex items-center justify-center mb-3 text-sm"
                style={{ backgroundColor: isRegistering ? currentTheme.blue : currentTheme.blueDark, color: '#FFF' }}
            >
                {loading ? <CircularProgress size={20} color="inherit" /> : (isRegistering ? t("loginRegister.register") : t("loginRegister.join"))}
            </button>

            {/* Sign Up / Back Toggle Link */}
            <div className="flex items-center justify-center mb-8">
                <button
                    type="button"
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="text-xs hover:text-blue-800 font-medium transition-colors cursor-pointer"
                    style={{ color: currentTheme.blueMedium }}
                >
                    {isRegistering ? t("loginRegister.login") : t("loginRegister.dontHaveAccount") + " " + t("loginRegister.newAccount")}
                </button>
            </div>

            {/* Footer / Privacy Policy */}
            <div className="w-full flex items-center justify-center gap-3 text-[10px] text-gray-400">
                <span>© Vituax</span>
                <span className="h-2.5 w-[1px] bg-gray-300"></span>
                <a href="#" className="hover:text-blue-600 transition-colors">Privacy and policy</a>
            </div>
        </form>
    );
};
