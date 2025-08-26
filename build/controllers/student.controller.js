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
exports.updateStudent = exports.removeStudent = exports.getStudentById = exports.getAllStudent = void 0;
const async_handler_utils_1 = require("../utils/async-handler.utils");
const student_model_1 = require("../models/student.model");
const error_handler_middleware_1 = require("../middlewares/error-handler.middleware");
const user_model_1 = require("../models/user.model");
//? getting all students
exports.getAllStudent = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield student_model_1.Student.find()
        .populate("user_id")
        .populate({
        path: "user_id",
        populate: {
            path: "role",
            select: "role",
        },
    });
    res.status(200).json({
        message: "All Students fetched Successfully...",
        status: "Success",
        success: true,
        data: students,
    });
}));
//? get student by id
exports.getStudentById = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const student = yield student_model_1.Student.findById(id).populate("user_id");
    if (!student) {
        throw new error_handler_middleware_1.CustomError("Student not Found !", 400);
    }
    res.status(200).json({
        message: "Student fetched Successfully...",
        status: "Success",
        success: true,
        data: student,
    });
}));
//? remove student
exports.removeStudent = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const student = yield student_model_1.Student.findById(id);
    if (!student) {
        throw new error_handler_middleware_1.CustomError("Student not Found !", 400);
    }
    const user = yield user_model_1.User.findByIdAndDelete(student.user_id);
    console.log(user);
    yield student.deleteOne();
    res.status(200).json({
        message: "Students removed Successfully...",
        status: "Success",
        success: true,
        data: student,
    });
}));
//? update student
exports.updateStudent = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { 
    // user data
    first_name, last_name, email, phone_number, date_of_birth, address, gender, 
    // student data
    roll_number, class_id, } = req.body;
    const student = yield student_model_1.Student.findById(id);
    if (!student) {
        throw new error_handler_middleware_1.CustomError("student not found!", 404);
    }
    if (roll_number !== undefined)
        student.roll_number = roll_number;
    if (class_id !== undefined)
        student.class_id = class_id;
    const user = yield user_model_1.User.findById(student.user_id);
    if (!user) {
        throw new error_handler_middleware_1.CustomError("user not found !", 404);
    }
    if (first_name !== undefined)
        user.first_name = first_name;
    if (last_name !== undefined)
        user.last_name = last_name;
    if (email !== undefined)
        user.email = email;
    if (phone_number !== undefined)
        user.phone_number = phone_number;
    if (date_of_birth !== undefined)
        user.date_of_birth = date_of_birth;
    if (address !== undefined)
        user.address = address;
    if (gender !== undefined)
        user.gender = gender;
    yield student.save();
    yield user.save();
    res.status(200).json({
        message: "Students updated Successfully...",
        status: "success",
        success: true,
        data: {
            user,
            student,
        },
    });
}));
