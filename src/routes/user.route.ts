import express from "express";
import {
  getAllUser,
  getUserById,
  removeUser,
  updateUser,
  userRegistration,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/", userRegistration);
router.get("/", getAllUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", removeUser);

export default router;
