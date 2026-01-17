import { useNavigate } from "react-router-dom";
import { useZResetAllStates } from "../stores/useZResetAllStates";
import { useZUserProfile } from "../stores/useZUserProfile";
import { FullPage } from "../components/Skeletons/FullPage";
import { useEffect, useState } from "react";

interface IProps {
  children: React.ReactNode;
  onlyManagerOrAdmin?: boolean;
  onlyAdmin?: boolean;
  skeleton?: boolean;
}

export const PrivatePage = ({
  children,
  onlyAdmin = false,
  onlyManagerOrAdmin = false,
}: IProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const { resetAllStates } = useZResetAllStates();
  const { idUser, role } = useZUserProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!idUser) {
      resetAllStates();
      navigate("/login");
      return;
    }

    if (onlyAdmin && role !== "admin") {
      navigate(-1);
      return;
    }

    if (onlyManagerOrAdmin && role !== "admin" && role !== "manager") {
      navigate(-1);
      return;
    }

    setIsChecking(false);
  }, [idUser, role, navigate, resetAllStates, onlyAdmin, onlyManagerOrAdmin]);

  if (isChecking || !idUser) {
    return <FullPage />;
  }

  return <>{children}</>;
};
