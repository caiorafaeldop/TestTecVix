import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { STATUS_CODE } from "../constants/statusCode";

const secret = process.env.JWT_SECRET || "default_secret";

interface IPayload {
  idUser: string;
  role: string;
  idBrandMaster?: number | null;
}

export const genToken = (payload: IPayload) => {
  return jwt.sign(payload, secret, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret) as IPayload;
  } catch (error) {
    throw new AppError("Invalid or expired token", STATUS_CODE.UNAUTHORIZED);
  }
};
