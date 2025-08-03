import express from "express";
import {
  getAllStudent,
  getStudentById,
  removeStudent,
  updateStudent,
} from "../controllers/student.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { Admin } from "../types/global.type";

const router = express.Router();

router.get("/", getAllStudent);
router.get("/:id", getStudentById);
router.delete("/:id", authenticate(Admin), removeStudent);
router.put("/:id", updateStudent);

export default router;
