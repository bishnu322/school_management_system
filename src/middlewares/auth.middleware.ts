import { NextFunction, Response } from "express";
import { IAllowedRole, TCustomRequest } from "./../types/global.type";
import { CustomError } from "./error-handler.middleware";
import { verifyJwtToken } from "../utils/jwt-token.utils";
import { User } from "../models/user.model";

export const authenticate = (role: IAllowedRole[]) => {
  return async (req: TCustomRequest, res: Response, next: NextFunction) => {
    try {
      const access_token: string | undefined = req.cookies.access_token;

      if (!access_token) {
        throw new CustomError("Unauthorized user!", 401);
      }

      const decodedJwtData = await verifyJwtToken(access_token);

      if (Date.now() > decodedJwtData.exp * 1000) {
        throw new CustomError("Session expire access token", 401);
      }

      const user = await User.findById(decodedJwtData._id);

      if (!user) {
        throw new CustomError("Unauthorized access token", 401);
      }

      if (role && !role.includes(decodedJwtData.role)) {
        throw new CustomError("forbidden access denied !", 403);
      }

      req.user = {
        _id: decodedJwtData._id,
        first_name: decodedJwtData.first_name,
        last_name: decodedJwtData.last_name,
        email: decodedJwtData.email,
        role: decodedJwtData.role,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};
