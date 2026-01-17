import { Router } from "express";
import { BrandMasterController } from "../controllers/BrandMasterController";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { authMiddleware, authorizeRole } from "../middlewares/authMiddleware";
import { upload } from "../config/multer";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.BRANDMASTER; // /api/v1/brand-master

const brandMasterRoutes = Router();

export const makeBrandMasterController = () => {
  return new BrandMasterController();
};

const brandMasterController = makeBrandMasterController();

brandMasterRoutes.get(`${BASE_PATH}/self`, authMiddleware, async (req, res) => {
  await brandMasterController.getSelf(req, res);
});

brandMasterRoutes.get(
  `${BASE_PATH}/:idBrandMaster`,
  authMiddleware,
  async (req, res) => {
    await brandMasterController.getById(req, res);
  },
);

brandMasterRoutes.get(
  `${BASE_PATH}`,
  authMiddleware,
  async (req, res) => {
    await brandMasterController.listAll(req, res);
  },
);

brandMasterRoutes.post(
  `${BASE_PATH}`,
  authMiddleware,
  authorizeRole(['admin', 'manager']),
  async (req, res) => {
    await brandMasterController.createNewBrandMaster(req, res);
  },
);

brandMasterRoutes.put(
  `${BASE_PATH}/:idBrandMaster`,
  authMiddleware,
  authorizeRole(['admin', 'manager']),
  async (req, res) => {
    await brandMasterController.updateBrandMaster(req, res);
  },
);

brandMasterRoutes.delete(
  `${BASE_PATH}/:idBrandMaster`,
  authMiddleware,
  authorizeRole(['admin']),
  async (req, res) => {
    await brandMasterController.deleteBrandMaster(req, res);
  },
);

brandMasterRoutes.patch(
  `${BASE_PATH}/:idBrandMaster/logo`,
  authMiddleware,
  authorizeRole(["admin"]),
  upload.single("logo"),
  async (req, res) => {
    await brandMasterController.updateLogo(req, res);
  },
);

export { brandMasterRoutes };
