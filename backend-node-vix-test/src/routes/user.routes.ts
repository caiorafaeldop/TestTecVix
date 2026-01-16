import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { authMiddleware, authorizeRole } from "../middlewares/authMiddleware";
import { upload } from "../config/multer";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.USER;

const userRoutes = Router();
const userController = new UserController();

userRoutes.get(BASE_PATH, authMiddleware, authorizeRole(['admin', 'manager']), async (req, res) => {
    await userController.listAll(req, res);
});

userRoutes.get(`${BASE_PATH}/:idUser`, authMiddleware, async (req, res) => {
    await userController.getById(req, res);
});

userRoutes.post(BASE_PATH, authMiddleware, authorizeRole(['admin', 'manager']), async (req, res) => {
    await userController.create(req, res);
});

userRoutes.put(`${BASE_PATH}/:idUser`, authMiddleware, authorizeRole(['admin', 'manager']), async (req, res) => {
    await userController.update(req, res);
});

userRoutes.delete(`${BASE_PATH}/:idUser`, authMiddleware, authorizeRole(['admin']), async (req, res) => {
    await userController.delete(req, res);
});

userRoutes.patch(`${BASE_PATH}/:idUser/avatar`, authMiddleware, upload.single("avatar"), async (req, res) => {
    await userController.updateAvatar(req, res);
});

export { userRoutes };
