import express from "express";
import {
  getAllStaffs,
  getStaffById,
  removeStaff,
  updateStaff,
} from "../controllers/staff.controller";

const router = express.Router();

router.get("/", getAllStaffs);
router.get("/:id", getStaffById);
router.delete("/:id", removeStaff);
router.put("/:id", updateStaff);

export default router;
