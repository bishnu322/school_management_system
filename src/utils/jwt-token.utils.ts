import { IjwtDecodedPayload, IjwtPayload } from "./../types/global.type";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "";
const JWT_EXPIRE_IN = process.env.JWT_EXPIRY;

export const generateJwtToken = (payload: IjwtPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE_IN as any });
};

export const verifyJwtToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as IjwtDecodedPayload;
};
