import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import { Student } from "../models/student.model";

export const createStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const { user_id, class_id, roll_number } = req.body;

    const students = await Student.create({
      user_id,
      class_id,
      roll_number,
    });

    await students.save();

    res.status(201).json({
      message: "Student created Successfully...",
      status: "Success",
      success: true,
      data: students,
    });
  }
);
