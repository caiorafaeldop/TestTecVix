import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AppError } from "../errors/AppError";
import { STATUS_CODE } from "../constants/statusCode";
import { CustomRequest } from "../types/custom";
import { prisma } from "../database/client";

export const authMiddleware = async (
  req: CustomRequest<any>,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token not provided", STATUS_CODE.UNAUTHORIZED);
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new AppError("Token not provided", STATUS_CODE.UNAUTHORIZED);
  }

  try {
    const payload = verifyToken(token);
    
    const user = await prisma.user.findUnique({
      where: { idUser: payload.idUser },
    });

    if (!user) {
      throw new AppError("User not found", STATUS_CODE.UNAUTHORIZED);
    }

    req.user = user;
    next();
  } catch (error) {
    throw new AppError("Invalid Token", STATUS_CODE.UNAUTHORIZED);
  }
};

export const authorizeRole = (roles: string[]) => {
  return (req: CustomRequest<any>, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError("User not authenticated", STATUS_CODE.UNAUTHORIZED);
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError("Insufficient permissions", STATUS_CODE.FORBIDDEN);
    }

    next();
  };
};
