import express from "express";
import {
  getAllStaffs,
  getStaffById,
  removeStaff,
  updateStaff,
} from "../controllers/staff.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { Admin } from "../types/global.type";

const router = express.Router();

router.get("/", getAllStaffs);
router.get("/:id", getStaffById);
router.delete("/:id", authenticate(Admin), removeStaff);
router.put("/:id", authenticate(Admin), updateStaff);

export default router;
