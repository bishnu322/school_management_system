import express, { Request, Response } from "express";
import {
  checkAuth,
  getAllUser,
  getUserById,
  removeUser,
  updateUser,
  userRegistration,
} from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { Admin } from "../types/global.type";
import { fileUploader } from "../middlewares/uploader.middleware";

const router = express.Router();
const upload = fileUploader();

router.get("/authorize", authenticate([]), checkAuth);

router.post("/", upload.single("profile_image"), userRegistration);
router.get("/", getAllUser);
router.get("/:id", getUserById);
router.put("/:id", upload.single("profile_image"), updateUser);
router.delete("/:id", authenticate(Admin), removeUser);

export default router;
