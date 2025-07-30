import { populate } from "dotenv";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import { Student } from "../models/student.model";
import { CustomError } from "../middlewares/error-handler.middleware";

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

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      throw new CustomError("Student not Found !", 400);
    }

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
    const updatedData = req.body;

    const student = await Student.findByIdAndUpdate(id, { $set: updatedData });

    res.status(200).json({
      message: "Students updated Successfully...",
      status: "success",
      success: true,
      data: student,
    });
  }
);
