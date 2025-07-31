import express from "express";
import {
  getAllStudent,
  getStudentById,
  removeStudent,
  updateStudent,
} from "../controllers/student.controller";

const router = express.Router();

router.get("/", getAllStudent);
router.get("/:id", getStudentById);
router.delete("/:id", removeStudent);
router.put("/:id", updateStudent);

export default router;
