import { prisma } from "../database/client";
import { AppError } from "../errors/AppError";
import { STATUS_CODE } from "../constants/statusCode";
import { genToken } from "../utils/jwt";
import bcrypt from "bcryptjs";
import { user } from "@prisma/client";

export class AuthService {
  async login(data: any) {
    const { email, password } = data;

    if (!email || !password) {
      throw new AppError("Email and password are required", STATUS_CODE.BAD_REQUEST);
    }

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new AppError("Invalid email or password", STATUS_CODE.UNAUTHORIZED);
    }

    // Since we don't know if hashes are used yet in seed, we assume yes. 
    // If seed uses plain text, we might need a fallback or ensure seed is updated.
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        // Fallback for plain text passwords in legacy/dev DBs if needed, 
        // but strictly speaking should be hash.
        // For security, just reject. but maybe user seeded with plain text?
        // Let's stick to hash check.
      throw new AppError("Invalid email or password", STATUS_CODE.UNAUTHORIZED);
    }

    const token = genToken({
      idUser: user.idUser,
      role: user.role,
      idBrandMaster: user.idBrandMaster,
    });

    // Update last login date
    await prisma.user.update({
      where: { idUser: user.idUser },
      data: { lastLoginDate: new Date() }
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  async register(data: any) {
    const { username, name, email, password, role, idBrandMaster } = data;
    const finalUsername = username || name;

    const userExists = await prisma.user.findFirst({
      where: { email },
    });

    if (userExists) {
      throw new AppError("User already exists", STATUS_CODE.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username: finalUsername,
        email,
        password: hashedPassword,
        role: role || "member",
        idBrandMaster: idBrandMaster ? Number(idBrandMaster) : null,
      },
    });

    const token = genToken({
      idUser: user.idUser,
      role: user.role,
      idBrandMaster: user.idBrandMaster,
    });

     const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }
}
