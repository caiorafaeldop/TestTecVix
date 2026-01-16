import { prisma } from "../database/client";
import { AppError } from "../errors/AppError";
import { STATUS_CODE } from "../constants/statusCode";
import bcrypt from "bcryptjs";

export class UserService {
  async listAll() {
    return await prisma.user.findMany({
      select: {
        idUser: true,
        username: true,
        email: true,
        role: true,
        idBrandMaster: true,
        isActive: true,
        lastLoginDate: true,
      },
    });
  }

  async getById(idUser: string) {
    const user = await prisma.user.findUnique({
      where: { idUser },
      select: {
          idUser: true,
          username: true,
          email: true,
          role: true,
          idBrandMaster: true,
          isActive: true,
          createdAt: true
      }
    });

    if (!user) {
      throw new AppError("User not found", STATUS_CODE.NOT_FOUND);
    }

    return user;
  }

  async create(data: any) {
    const { username, email, password, role, idBrandMaster } = data;

    const userExists = await prisma.user.findFirst({
        where: { email }
    });

    if (userExists) {
        throw new AppError("User already exists", STATUS_CODE.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: role || 'member',
        idBrandMaster: idBrandMaster ? Number(idBrandMaster) : null,
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(idUser: string, data: any) {
    const user = await prisma.user.findUnique({ where: { idUser } });
    if (!user) throw new AppError("User not found", STATUS_CODE.NOT_FOUND);

    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { idUser },
      data,
    });

    const { password: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async delete(idUser: string) {
    const user = await prisma.user.findUnique({ where: { idUser } });
    if (!user) throw new AppError("User not found", STATUS_CODE.NOT_FOUND);
    
    // Soft delete
    await prisma.user.update({
        where: { idUser },
        data: { deletedAt: new Date(), isActive: false }
    });

    return { message: "User deleted" };
  }

  async updateAvatar(idUser: string, avatarPath: string) {
    const user = await prisma.user.findUnique({ where: { idUser } });
    if (!user) throw new AppError("User not found", STATUS_CODE.NOT_FOUND);

    const updatedUser = await prisma.user.update({
      where: { idUser },
      data: { profileImgUrl: avatarPath, updatedAt: new Date() },
    });

    const { password: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
}
