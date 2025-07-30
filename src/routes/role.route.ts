import express from "express";
import { createRole, getAllRole } from "../controllers/role.controller";

const router = express.Router();

router.post("/", createRole);
router.get("/", getAllRole);

export default router;
