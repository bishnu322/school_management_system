import express from "express";
import {
  changePassword,
  logInUser,
  logoutUser,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/", logInUser);
router.post("/logout", logoutUser);
router.put("/:id", changePassword);

export default router;
