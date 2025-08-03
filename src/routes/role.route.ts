import express from "express";
import { createRole, getAllRole } from "../controllers/role.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { Admin } from "../types/global.type";

const router = express.Router();

router.post("/", authenticate(Admin), createRole);
router.get("/", authenticate(Admin), getAllRole);

export default router;
