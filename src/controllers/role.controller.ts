import { NextFunction, Request, Response } from "express";
import { Role } from "../models/role.model";
import { CustomError } from "../middlewares/error-handler.middleware";
import { asyncHandler } from "../utils/async-handler.utils";

//* create role

export const createRole = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

//* get all role

export const getAllRole = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const roles = await Role.find();

    res.status(200).json({
      message: "All Role fetched successfully",
      status: "Success",
      success: true,
      data: roles,
    });
  }
);
