"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const role_controller_1 = require("../controllers/role.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const global_type_1 = require("../types/global.type");
const router = express_1.default.Router();
router.post("/", (0, auth_middleware_1.authenticate)(global_type_1.Admin), role_controller_1.createRole);
router.get("/", (0, auth_middleware_1.authenticate)(global_type_1.Admin), role_controller_1.getAllRole);
exports.default = router;
