import express from "express";
import { createRole } from "../controllers/role.controller";

const router = express.Router();

router.post("/", createRole);

export default router;
