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
exports.updateAttendance = exports.getAttendanceByUser = exports.createAttendance = exports.getAllAttendance = void 0;
const async_handler_utils_1 = require("../utils/async-handler.utils");
const attendance_model_1 = require("../models/attendance.model");
const user_model_1 = require("../models/user.model");
const error_handler_middleware_1 = require("../middlewares/error-handler.middleware");
//* fetching all the attendance
exports.getAllAttendance = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const attendance = yield attendance_model_1.Attendance.find({}).populate("user_id");
    res.status(200).json({
        message: "all attendance fetched.. ",
        status: "Success",
        success: true,
        data: attendance,
    });
}));
//* creating attendance
exports.createAttendance = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, status, date, remark } = req.body;
    const user = yield user_model_1.User.findById(user_id);
    if (!user) {
        throw new error_handler_middleware_1.CustomError("User not found, enter valid user!", 404);
    }
    const attendance = yield attendance_model_1.Attendance.create({
        user_id,
        status,
        date,
        remark,
    });
    res.status(201).json({
        message: "attendance created successfully",
        status: "Success",
        success: true,
        data: attendance,
    });
}));
//* get attendance by userid
exports.getAttendanceByUser = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const { from_date, to_date } = req.query;
    const filter = { user_id: user_id };
    if (from_date || to_date) {
        if (from_date) {
            filter.date = {
                $gte: from_date,
            };
        }
        if (to_date) {
            filter.date = {
                $lte: to_date,
            };
        }
    }
    if (!user_id) {
        throw new error_handler_middleware_1.CustomError("Enter valid user, not found!", 400);
    }
    const attendance = yield attendance_model_1.Attendance.find(filter).populate("userId");
    res.status(200).json({
        message: "attendance fetch by user successfully",
        status: "Success",
        success: true,
        data: attendance,
    });
}));
//* updating  attendance By id
exports.updateAttendance = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    const attendance = yield attendance_model_1.Attendance.findById(id);
    if (!attendance) {
        throw new error_handler_middleware_1.CustomError("attendance is not there!", 400);
    }
    if (!status) {
        throw new error_handler_middleware_1.CustomError("status field cannot be empty!", 400);
    }
    attendance.status = status;
    yield attendance.save();
    res.status(200).json({
        message: "user attendance updated successfully",
        status: "Success",
        success: true,
        data: attendance,
    });
}));
