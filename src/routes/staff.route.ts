import express from "express";
import { getAllStaffs } from "../controllers/staff.controller";

const router = express.Router();

router.get("/", getAllStaffs);

export default router;
