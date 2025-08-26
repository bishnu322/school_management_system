"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const staff_controller_1 = require("../controllers/staff.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const global_type_1 = require("../types/global.type");
const router = express_1.default.Router();
router.get("/", staff_controller_1.getAllStaffs);
router.get("/:id", staff_controller_1.getStaffById);
router.delete("/:id", (0, auth_middleware_1.authenticate)(global_type_1.Admin), staff_controller_1.removeStaff);
router.put("/:id", (0, auth_middleware_1.authenticate)(global_type_1.Admin), staff_controller_1.updateStaff);
exports.default = router;
