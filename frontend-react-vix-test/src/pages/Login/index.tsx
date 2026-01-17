import { useState, useEffect } from "react";
import { LoginForm } from "./LoginForm";
import cloudStorageImg from "../../assets/cloud_storage_illustration.png";
import securityImg from "../../assets/security_illustration.png";
import globalNetworkImg from "../../assets/global_network_illustration.png";
import logoImg from "../../assets/Vituax_LOGO_Versao_Principal_RBG.svg";
import logoImgWhite from "../../assets/Vituax_LOGO_Versao_Principal_Branco.svg";
import { SwithLanguages } from "../../components/SwithLanguages";
import { SwithThemeMode } from "../../components/SwithThemeMode";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../stores/useZTheme";

export const LoginPage = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const currentTheme = theme[mode];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isRegistering, setIsRegistering] = useState(false);

  const slides = [
    {
        title: t("loginRegister.slideOneTitle"),
        desc: t("loginRegister.slideOneDesc"),
        img: cloudStorageImg
    },
    {
        title: t("loginRegister.slideTwoTitle"),
        desc: t("loginRegister.slideTwoDesc"),
        img: securityImg 
    },
    {
        title: t("loginRegister.slideThreeTitle"),
        desc: t("loginRegister.slideThreeDesc"),
        img: globalNetworkImg 
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div 
        className="flex flex-col lg:flex-row min-h-screen w-full overflow-y-auto transition-colors duration-300"
        style={{ backgroundColor: currentTheme.mainBackground }}
    >
      {/* Left Column (Authentication) */}
      <div 
        className="w-full lg:w-[45%] flex flex-col min-h-screen relative transition-colors duration-300"
        style={{ backgroundColor: currentTheme.mainBackground }}
      >
        {/* Header: Logo and Actions */}
        <div className="flex justify-between items-center w-full px-6 lg:px-16 pt-8 z-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <img src={mode === 'dark' ? logoImgWhite : logoImg} alt="Vituax Logo" className="h-8 md:h-9" />
            </div>

            {/* Actions: Languages & Theme */}
            <div className="flex items-center gap-2">
                <SwithLanguages keepShow />
                <SwithThemeMode />
            </div>
        </div>

        {/* Content: Fixed Top Alignment (Moved higher) */}
        <div className="flex-1 flex flex-col px-6 lg:px-16 pt-10 lg:pt-14 pb-12">
            <div className="w-full max-w-[350px] mx-auto">
                <h1 
                    className="text-[22px] md:text-[24px] font-bold mb-8 transition-colors duration-300"
                    style={{ color: mode === 'light' ? '#1E1E1E' : currentTheme.dark }}
                >
                    {isRegistering ? t("loginRegister.register") : t("loginRegister.access")}
                </h1>
                
                <LoginForm isRegistering={isRegistering} setIsRegistering={setIsRegistering} />
            </div>
        </div>
      </div>

      {/* Right Column (Hero) - Hidden on small screens, shown on large */}
      <div className="hidden lg:block lg:w-[55%] p-3 lg:p-4 h-screen lg:sticky lg:top-0">
        <div className="w-full h-full rounded-[32px] relative overflow-hidden">
            
            {/* Full-size Image */}
            <img 
                key={currentSlide}
                src={slides[currentSlide].img} 
                alt="Illustration" 
                className="absolute inset-0 w-full h-full object-cover animate-fadeIn" 
            />

            {/* Carousel Indicators - positioned at bottom center */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {slides.map((_, index) => (
                    <button 
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 shadow-lg ${
                            currentSlide === index 
                                ? 'bg-white' 
                                : 'bg-white/40 hover:bg-white/60'
                        }`}
                    />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
