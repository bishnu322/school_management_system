import { Student } from "./../models/student.model";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import { Class } from "../models/class.model";

export const createClass = asyncHandler(async (req: Request, res: Response) => {
  const { grade, section, Students, classTeacher, academicYear } = req.body;

  const classes = await Class.create({
    grade,
    section,
    Students,
    classTeacher,
    academicYear,
  });

  await classes.save();

  res.status(201).json({
    message: "classes created successfully...",
    status: "Success",
    success: true,
    data: classes,
  });
});
