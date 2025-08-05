import { asyncHandler } from "./../utils/async-handler.utils";
import { Staff } from "./../models/staff.model";
import { NextFunction, Request, Response } from "express";
import { Student } from "../models/student.model";
import { CustomError } from "../middlewares/error-handler.middleware";
import { User } from "../models/user.model";
import { Role } from "../models/role.model";
import { hashPassword } from "../utils/bcrypt.utils";
import { generatePassword } from "../utils/passwordGenerator.utils";
import { sendMail } from "../utils/mailer.utils";

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

    const userRole = await Role.findById(role);
    if (!userRole?.role) {
      throw new CustomError("role not found", 404);
    }

    const userRegister: any = new User({
      first_name,
      last_name,
      email,
      role,
      phone_number,
      date_of_birth,
      address,
      gender,
    });
    const password = await generatePassword();

    console.log(password);

    if (!password) {
      throw new CustomError("password is required!", 400);
    }

    const hashedPassword = await hashPassword(password);
    userRegister.password = hashedPassword;

    const { _id: user_id } = await userRegister.save();

    if (userRole.role === "STUDENT") {
      const studentRegistration = await Student.create({
        user_id,
        class_id,
        roll_number,
      });

      await studentRegistration.save();
    } else {
      const staffRegistration = new Staff({
        user_id,
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

    await sendMail({
      to: email,
      subject: "Login password",
      html: `<div>Your login password: ${password}</div>
          <p>please! change your password after login</p>
      `,
    });

    res.status(201).json({
      message: `user registered successfully...`,
      status: "Success",
      success: true,
      data: userRegister,
    });
  }
);

//* get all users

export const getAllUser = asyncHandler(async (req: Request, res: Response) => {
  const allUsers = await User.find().populate("role");

  res.status(201).json({
    message: `All user fetched successfully...`,
    status: "Success",
    success: true,
    data: allUsers,
  });
});

// * get user by ID

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById(id).populate("role");

  if (!user) {
    throw new CustomError("User not found!", 404);
  }

  res.status(200).json({
    message: `user fetched successfully...`,
    status: "Success",
    success: true,
    data: user,
  });
});

//* update user

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const user = await User.findByIdAndUpdate(id, { $set: payload }).populate(
    "role"
  );

  if (!user) {
    throw new CustomError("user not found!", 404);
  }

  res.status(200).json({
    message: `updated successfully...`,
    status: "Success",
    success: true,
    data: user,
  });
});

// * remove user

export const removeUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  res.status(200).json({
    message: `user deleted successfully...`,
    status: "Success",
    success: true,
    data: user,
  });
});
