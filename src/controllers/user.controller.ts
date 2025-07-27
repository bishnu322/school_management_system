import { asyncHandler } from "./../utils/async-handler.utils";
import { Staff } from "./../models/staff.model";
import { NextFunction, Request, Response } from "express";
import { Student } from "../models/student.model";
import { CustomError } from "../middlewares/error-handler.middleware";
import { User } from "../models/user.model";
import { Role } from "../models/role.model";

export const userRegistration = asyncHandler(
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

    const userRegistration = new User({
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

    const userRole = await Role.findById(role);

    if (role && userRole?.role === "STUDENT") {
      const studentRegistration = await Student.create({
        user_id,
        class_id,
        roll_number,
      });

      await studentRegistration.save();
    }

    if (
      (role && role === "TEACHER") ||
      role === "ADMIN" ||
      role === "SUPER_ADMIN" ||
      role === "ACCOUNTANT"
    ) {
      const staffRegistration = await Staff.create({
        employee_id,
        department,
        salary,
        qualification,
        experienceYear,
        date_of_join,
        staff_data,
      });

      await staffRegistration.save();
    }

    await userRegistration.save();

    res.status(201).json({
      message: `${role}: registered successfully...`,
      status: "Success",
      success: true,
      data: userRegistration,
    });
  }
);
