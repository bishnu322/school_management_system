import express from "express";
import {
  getAllStudent,
  getStudentById,
} from "../controllers/student.controller";

const router = express.Router();

router.get("/", getAllStudent);
router.get("/:id", getStudentById);

export default router;
