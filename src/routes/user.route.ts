import express from "express";
import {
  getAllUser,
  getUserById,
  removeUser,
  updateUser,
  userRegistration,
} from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { Admin } from "../types/global.type";

const router = express.Router();

router.post("/", authenticate(Admin), userRegistration);
router.get("/", getAllUser);
router.get("/:id", getUserById);
router.put("/:id", authenticate(Admin), updateUser);
router.delete("/:id", authenticate(Admin), removeUser);

export default router;
