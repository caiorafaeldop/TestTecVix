import { PrivatePage } from "../auth/PrivatePage";
import { EmployeeRegisterPage } from "../pages/EmployeeRegister";

export const EmployeeRegisterRouter = {
  path: "/employee-register",
  element: (
    <PrivatePage>
      <EmployeeRegisterPage />
    </PrivatePage>
  ),
};
