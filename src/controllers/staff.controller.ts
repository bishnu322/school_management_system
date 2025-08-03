import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import { Staff } from "../models/staff.model";
import { CustomError } from "../middlewares/error-handler.middleware";
import { User } from "../models/user.model";

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

    if (!staffs) {
      throw new CustomError("staffs not found", 404);
    }

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

    if (!staff) {
      throw new CustomError("staff not found!", 404);
    }

    res.status(200).json({
      message: "All staffs fetched Successfully...",
      status: "success",
      success: true,
      data: staff,
    });
  }
);

// * remove staff

export const removeStaff = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const staff = await Staff.findById(id);

  if (!staff) {
    throw new CustomError("staff not found !", 404);
  }

  const userId = staff.user_id;

  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new CustomError("user not found !", 404);
  }

  await staff.deleteOne();

  res.status(200).json({
    message: "staff removed successfully",
    status: "Success",
    success: true,
    data: {
      staff,
      user,
    },
  });
});

// * update staff

export const updateStaff = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const {
    //user data
    first_name,
    last_name,
    email,
    phone_number,
    date_of_birth,
    address,
    gender,
    role,
    password,

    // staff data
    employee_id,
    department,
    salary,
    qualification,
    experienceYear,
    date_of_join,
    staff_data,
  } = req.body;

  const staff = await Staff.findById(id);

  if (!staff) {
    throw new CustomError("Staff not found!", 404);
  }
});
