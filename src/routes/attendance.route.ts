import express from "express";
import {
  createAttendance,
  getAllAttendance,
  getAttendanceByUser,
} from "../controllers/attendance.controller";

const router = express.Router();

router.post("/", createAttendance);
router.get("/:userId", getAttendanceByUser);
router.get("/", getAllAttendance);

export default router;
