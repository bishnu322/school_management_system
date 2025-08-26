"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRole = exports.createRole = void 0;
const role_model_1 = require("../models/role.model");
const error_handler_middleware_1 = require("../middlewares/error-handler.middleware");
const async_handler_utils_1 = require("../utils/async-handler.utils");
//* create role
exports.createRole = (0, async_handler_utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = req.body;
    if (!role) {
        throw new error_handler_middleware_1.CustomError("role is required !", 400);
    }
    const roles = yield role_model_1.Role.create({ role });
    yield roles.save();
    res.status(201).json({
        message: "Role created successfully",
        status: "Success",
        success: true,
        data: roles,
    });
}));
//* get all role
exports.getAllRole = (0, async_handler_utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield role_model_1.Role.find();
    res.status(200).json({
        message: "All Role fetched successfully",
        status: "Success",
        success: true,
        data: roles,
    });
}));
