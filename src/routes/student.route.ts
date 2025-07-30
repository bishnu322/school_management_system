import express from "express";
import {
  createStudent,
  getAllStudent,
  getStudentById,
} from "../controllers/student.controller";

const router = express.Router();

router.post("/", createStudent);
router.get("/", getAllStudent);
router.get("/:id", getStudentById);

export default router;
