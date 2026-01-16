import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/AuthController";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.AUTH;

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post(`${BASE_PATH}/login`, async (req: Request, res: Response) => {
  await authController.login(req, res);
});

authRoutes.post(`${BASE_PATH}/register`, async (req: Request, res: Response) => {
  await authController.register(req, res);
});

export { authRoutes };
