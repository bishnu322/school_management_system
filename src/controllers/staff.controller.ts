import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import { Staff } from "../models/staff.model";
import { CustomError } from "../middlewares/error-handler.middleware";
import { populate } from "dotenv";

//* get all staffs

export const getAllStaffs = asyncHandler(
  async (req: Request, res: Response) => {
    const staffs = await Staff.find()
      .populate("user_id")
      .populate({
        path: "user_id",
        populate: {
          path: "role",
          select: "role", // optional: only return role name
        },
      });

    res.status(200).json({
      message: "All staffs fetched Successfully...",
      status: "success",
      success: true,
      data: staffs,
    });
  }
);

//get staff by id

export const getStaffById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const staff = await Staff.findById(id)
      .populate("user_id")
      .populate({
        path: "user_id",
        populate: {
          path: "role",
          select: "role",
        },
      });

    res.status(200).json({
      message: "All staffs fetched Successfully...",
      status: "success",
      success: true,
      data: staff,
    });
  }
);
