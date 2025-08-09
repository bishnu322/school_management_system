import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import { Attendance } from "../models/attendance.model";
import { User } from "../models/user.model";
import { CustomError } from "../middlewares/error-handler.middleware";

//* fetching all the attendance

export const getAllAttendance = asyncHandler(
  async (req: Request, res: Response) => {
    const attendance = await Attendance.find({}).populate("userId");

    res.status(200).json({
      message: "all attendance fetched.. ",
      status: "Success",
      success: true,
      data: attendance,
    });
  }
);

//* creating attendance

export const createAttendance = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, status, date, remark } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      throw new CustomError("User not found, enter valid user!", 404);
    }

    const attendance = await Attendance.create({
      userId,
      status,
      date,
      remark,
    });

    res.status(201).json({
      message: "attendance created successfully",
      status: "Success",
      success: true,
      data: attendance,
    });
  }
);

// get attendance by userid

export const getAttendanceByUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    const { from_date, to_date } = req.query;

    const filter: Record<string, any> = { userId: userId };

    if (from_date || to_date) {
      if (from_date) {
        filter.date = {
          $gte: from_date,
        };
      }

      if (to_date) {
        filter.date = {
          $lte: to_date,
        };
      }
    }

    if (!userId) {
      throw new CustomError("Enter valid user, not found!", 400);
    }

    const attendance = await Attendance.find(filter).populate("userId");

    res.status(201).json({
      message: "attendance fetch by user successfully",
      status: "Success",
      success: true,
      data: attendance,
    });
  }
);
