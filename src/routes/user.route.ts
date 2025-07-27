import express from "express";
import { userRegistration } from "../controllers/user.controller";

const router = express.Router();

router.post("/", userRegistration);

export default router;
