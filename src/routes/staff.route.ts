import express from "express";
import { getAllStaffs, getStaffById } from "../controllers/staff.controller";

const router = express.Router();

router.get("/", getAllStaffs);
router.get("/:id", getStaffById);

export default router;
