import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import { Staff } from "../models/staff.model";
import { CustomError } from "../middlewares/error-handler.middleware";

export const createTeacher = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      user_id,
      employee_id,
      department,
      salary,
      qualification,
      experienceYear,
      date_of_join,
      staff_data,
    } = req.body;

    if (!user_id) {
      throw new CustomError("user_id is required !", 400);
    }

    if (!employee_id) {
      throw new CustomError("employee_id is required !", 400);
    }

    if (!salary) {
      throw new CustomError("salary is required!", 400);
    }

    if (!qualification) {
      throw new CustomError("qualification is required!", 400);
    }

    if (!experienceYear) {
      throw new CustomError("experience year is required!", 400);
    }

    if (!date_of_join) {
      throw new CustomError("joining is required!", 400);
    }

    const teacher = await Staff.create({
      user_id,
      employee_id,
      department,
      salary,
      qualification,
      experienceYear,
      date_of_join,
      staff_data,
    });

    res.status(201).json({
      message: "Staff created successfully",
      status: "Success",
      success: true,
      data: teacher,
    });
  }
);
