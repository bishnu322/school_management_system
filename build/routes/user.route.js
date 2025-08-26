"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const global_type_1 = require("../types/global.type");
const uploader_middleware_1 = require("../middlewares/uploader.middleware");
const router = express_1.default.Router();
const upload = (0, uploader_middleware_1.fileUploader)();
router.post("/", upload.single("profile_image"), user_controller_1.userRegistration);
router.get("/", user_controller_1.getAllUser);
router.get("/:id", user_controller_1.getUserById);
router.put("/:id", upload.single("profile_img"), user_controller_1.updateUser);
router.delete("/:id", (0, auth_middleware_1.authenticate)(global_type_1.Admin), user_controller_1.removeUser);
exports.default = router;
