import express from "express";
import { registerStudent } from "../controllers/user.controller";

const router = express.Router();

router.post("/", registerStudent);

export default router;
