import express from "express";
import { logInUser } from "../controllers/auth.controller";

const router = express.Router();

router.post("/", logInUser);

export default router;
