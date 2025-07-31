import { populate } from "dotenv";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import { Student } from "../models/student.model";
import { CustomError } from "../middlewares/error-handler.middleware";
import { User } from "../models/user.model";

//? getting all students

export const getAllStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const students = await Student.find()
      .populate("user_id")
      .populate({
        path: "user_id",
        populate: {
          path: "role",
          select: "role",
        },
      });

    res.status(200).json({
      message: "All Students fetched Successfully...",
      status: "Success",
      success: true,
      data: students,
    });
  }
);

//? get student by id

export const getStudentById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const student = await Student.findById(id).populate("user_id");

    if (!student) {
      throw new CustomError("Student not Found !", 400);
    }

    res.status(200).json({
      message: "Student fetched Successfully...",
      status: "Success",
      success: true,
      data: student,
    });
  }
);

//? remove student

export const removeStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      throw new CustomError("Student not Found !", 400);
    }

    const user = await User.findByIdAndDelete(student.user_id);
    console.log(user);

    await student.deleteOne();

    res.status(200).json({
      message: "Students removed Successfully...",
      status: "Success",
      success: true,
      data: student,
    });
  }
);

//? update student

export const updateStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
      // user data
      first_name,
      last_name,
      email,
      phone_number,
      date_of_birth,
      address,
      gender,
      // student data
      roll_number,
      class_id,
    } = req.body;

    // const student = await Student.findByIdAndUpdate(id, { $set: updatedData });
    const student = await Student.findById(id);

    if (!student) {
      throw new CustomError("student not found!", 404);
    }

    if (roll_number !== undefined) student.roll_number = roll_number;
    if (class_id !== undefined) student.class_id = class_id;

    // await student.updateOne({ $set: { roll_number, class_id } });

    // await student.save();

    const user = await User.findById(student.user_id);
    if (!user) {
      throw new CustomError("user not found !", 404);
    }

    if (first_name !== undefined) user.first_name = first_name;
    if (last_name !== undefined) user.last_name = last_name;
    if (email !== undefined) user.email = email;
    if (phone_number !== undefined) user.phone_number = phone_number;
    if (date_of_birth !== undefined) user.date_of_birth = date_of_birth;
    if (address !== undefined) user.address = address;
    if (gender !== undefined) user.gender = gender;

    await student.save();
    await user.save();

    res.status(200).json({
      message: "Students updated Successfully...",
      status: "success",
      success: true,
      data: {
        user,
        student,
      },
    });
  }
);
