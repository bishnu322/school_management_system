import express from "express";
import { changePassword, logInUser } from "../controllers/auth.controller";

const router = express.Router();

router.post("/", logInUser);
router.put("/:id", changePassword);

export default router;
