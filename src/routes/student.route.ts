import express from "express";
import {
  getAllStudent,
  getStudentById,
  removeStudent,
} from "../controllers/student.controller";

const router = express.Router();

router.get("/", getAllStudent);
router.get("/:id", getStudentById);
router.delete("/:id", removeStudent);

export default router;
