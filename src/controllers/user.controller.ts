import { asyncHandler } from "./../utils/async-handler.utils";
import { Staff } from "./../models/staff.model";
import { NextFunction, Request, Response } from "express";
import { Student } from "../models/student.model";
import { CustomError } from "../middlewares/error-handler.middleware";
import { User } from "../models/user.model";

export const registerStudent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      // user data
      first_name,
      last_name,
      email,
      phone_number,
      date_of_birth,
      address,
      gender,
      role,

      // student data
      roll_number,
      class_id,

      //staff data
      employee_id,
      department,
      salary,
      qualification,
      experienceYear,
      date_of_join,
      staff_data,
    } = req.body;

    if (!first_name) {
      throw new CustomError("first name is required!", 400);
    }

    const userRegistration = await User.create({
      first_name,
      last_name,
      email,
      role,
      phone_number,
      date_of_birth,
      address,
      gender,
    });

    const userData = await userRegistration.save();

    const user_id = userData._id;

    const studentRegistration = await Student.create({
      user_id,
      class_id,
      roll_number,
    });

    await studentRegistration.save();

    res.status(201).json({
      message: "student registered successfully...",
      status: "Success",
      success: true,
      data: studentRegistration,
    });
  }
);
