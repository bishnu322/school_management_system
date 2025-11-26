import express from "express";
import {
  createAttendance,
  getAllAttendance,
  getAttendanceByUser,
  updateAttendance,
} from "../controllers/attendance.controller";

const router = express.Router();

router.get("/:user_id", getAttendanceByUser);
router.get("/", getAllAttendance);
router.post("/", createAttendance);
router.put("/:id", updateAttendance);

export default router;
