"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("../controllers/student.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const global_type_1 = require("../types/global.type");
const router = express_1.default.Router();
router.get("/", student_controller_1.getAllStudent);
router.get("/:id", student_controller_1.getStudentById);
router.delete("/:id", (0, auth_middleware_1.authenticate)(global_type_1.Admin), student_controller_1.removeStudent);
router.put("/:id", (0, auth_middleware_1.authenticate)(global_type_1.Admin), student_controller_1.updateStudent);
exports.default = router;
