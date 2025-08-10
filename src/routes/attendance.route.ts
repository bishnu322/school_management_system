import express from "express";
import {
  createAttendance,
  getAllAttendance,
  getAttendanceByUser,
  updateAttendance,
} from "../controllers/attendance.controller";

const router = express.Router();

router.post("/", createAttendance);
router.put("/:id", updateAttendance);
router.get("/:userId", getAttendanceByUser);
router.get("/", getAllAttendance);

export default router;
