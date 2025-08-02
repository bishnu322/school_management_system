import express from "express";
import {
  getAllStaffs,
  getStaffById,
  removeStaff,
} from "../controllers/staff.controller";

const router = express.Router();

router.get("/", getAllStaffs);
router.get("/:id", getStaffById);
router.delete("/:id", removeStaff);

export default router;
