import { Request } from "express";
import mongoose from "mongoose";

export enum IGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum IAllowedRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  ACCOUNTANT = "ACCOUNTANT",
  STUDENT = "STUDENT",
}

export interface IjwtPayload {
  _id: mongoose.Schema.Types.ObjectId;
  role: IAllowedRole;
  first_name: string;
  last_name: string;
  email: string;
}

export interface IjwtDecodedPayload extends IjwtPayload {
  exp: number;
  iat: number;
}

export const onlyUser = [IAllowedRole.STUDENT];
export const superAdmin = [IAllowedRole.SUPER_ADMIN];
export const Admin = [IAllowedRole.ADMIN];

export type TCustomRequest = Request & {
  user?: IjwtPayload;
};
