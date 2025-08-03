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

  if (!staff) throw new CustomError("Staff not found!", 404);

  const user = await User.findById(staff.user_id);

  if (!user) throw new CustomError("user not found!", 404);

  //* update user data model if it changes

  if (first_name) user.first_name = first_name;
  if (last_name) user.last_name = last_name;
  if (email) user.email = email;
  if (phone_number) user.phone_number = phone_number;
  if (date_of_birth) user.date_of_birth = date_of_birth;
  if (address) user.address = address;
  if (gender) user.gender = gender;
  if (role) user.role = role;

  //* updating staff data

  if (employee_id) staff.employee_id = employee_id;
  if (department) staff.department = department;
  if (salary) staff.salary = salary;
  if (qualification) staff.qualification = qualification;
  if (experienceYear) staff.experienceYear = experienceYear;
  if (date_of_join) staff.date_of_join = date_of_join;
  if (staff_data) staff.staff_data = staff_data;

  await user.save();
  await staff.save();

  res.status(200).json({
    message: "staff updated successfully",
    status: "Success",
    success: true,
    data: {
      user,
      staff,
    },
  });
});
