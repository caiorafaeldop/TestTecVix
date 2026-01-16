import { Response, Request } from "express";
import { UserService } from "../services/UserService";
import { STATUS_CODE } from "../constants/statusCode";
import { AppError } from "../errors/AppError";

export class UserController {
  private userService = new UserService();

  async listAll(req: Request, res: Response) {
    const result = await this.userService.listAll();
    return res.status(STATUS_CODE.OK).json(result);
  }

  async getById(req: Request, res: Response) {
    const idUser = req.params.idUser as string;
    const result = await this.userService.getById(idUser);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async create(req: Request, res: Response) {
    const result = await this.userService.create(req.body);
    return res.status(STATUS_CODE.CREATED).json(result);
  }

  async update(req: Request, res: Response) {
      const idUser = req.params.idUser as string;
      const result = await this.userService.update(idUser, req.body);
      return res.status(STATUS_CODE.OK).json(result);
  }

  async delete(req: Request, res: Response) {
      const idUser = req.params.idUser as string;
      const result = await this.userService.delete(idUser);
      return res.status(STATUS_CODE.OK).json(result);
  }

  async updateAvatar(req: Request, res: Response) {
      const idUser = req.params.idUser as string;
      if (!req.file) {
          throw new AppError("No file uploaded", STATUS_CODE.BAD_REQUEST);
      }
      
      const avatarPath = req.file.path.replace(/\\/g, "/");
      const result = await this.userService.updateAvatar(idUser, avatarPath);
      return res.status(STATUS_CODE.OK).json(result);
  }
}
