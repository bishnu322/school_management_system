import { NextFunction, Request, Response } from "express";
import { Role } from "../models/role.model";
import { CustomError } from "../middlewares/error-handler.middleware";

export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.body;

    if (!role) {
      throw new CustomError("role is required !", 400);
    }

    const roles = await Role.create({ role });

    await roles.save();

    res.status(201).json({
      message: "Role created successfully",
      status: "Success",
      success: true,
      data: roles,
    });
  } catch (error) {
    next(error);
  }
};
