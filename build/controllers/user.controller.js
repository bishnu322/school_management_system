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
exports.removeUser = exports.updateUser = exports.getUserById = exports.getAllUser = exports.userRegistration = void 0;
const async_handler_utils_1 = require("./../utils/async-handler.utils");
const staff_model_1 = require("./../models/staff.model");
const student_model_1 = require("../models/student.model");
const error_handler_middleware_1 = require("../middlewares/error-handler.middleware");
const user_model_1 = require("../models/user.model");
const role_model_1 = require("../models/role.model");
const bcrypt_utils_1 = require("../utils/bcrypt.utils");
const passwordGenerator_utils_1 = require("../utils/passwordGenerator.utils");
const mailer_utils_1 = require("../utils/mailer.utils");
const cloudinary_service_utils_1 = require("../utils/cloudinary-service.utils");
// import { staffSchema, studentSchema } from "../schemas/userSchema";
const folder_name = "user_profile/";
// register user
exports.userRegistration = (0, async_handler_utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { 
    // user data
    first_name, last_name, email, phone_number, date_of_birth, address, gender, role, 
    // student data
    roll_number, class_id, 
    //staff data
    employee_id, department, salary, qualification, experienceYear, date_of_join, staff_data, } = req.body;
    const profile_image = req.file;
    const userRole = yield role_model_1.Role.findById(role);
    if (!(userRole === null || userRole === void 0 ? void 0 : userRole.role)) {
        throw new error_handler_middleware_1.CustomError("role not found", 404);
    }
    const userRegister = new user_model_1.User({
        first_name,
        last_name,
        email,
        role,
        phone_number,
        date_of_birth,
        address,
        gender,
    });
    const { public_id, path } = yield (0, cloudinary_service_utils_1.profileImageUploader)(profile_image.path, folder_name);
    userRegister.profile_image = {
        path: path,
        public_id: public_id,
    };
    const password = yield (0, passwordGenerator_utils_1.generatePassword)();
    if (!password) {
        throw new error_handler_middleware_1.CustomError("password is required!", 400);
    }
    const hashedPassword = yield (0, bcrypt_utils_1.hashPassword)(password);
    userRegister.password = hashedPassword;
    const { _id: user_id } = yield userRegister.save();
    if (userRole.role === "STUDENT") {
        const studentRegistration = yield student_model_1.Student.create({
            user_id,
            class_id,
            roll_number,
        });
        yield studentRegistration.save();
    }
    else {
        const staffRegistration = new staff_model_1.Staff({
            user_id,
            employee_id,
            department,
            salary,
            qualification,
            experienceYear,
            date_of_join,
            staff_data,
        });
        yield staffRegistration.save();
    }
    yield (0, mailer_utils_1.sendMail)({
        to: email,
        subject: "Login password",
        html: `<div>Your login password: ${password}</div>
          <p>please! change your password after login</p>
      `,
    });
    res.status(201).json({
        message: `user registered successfully...`,
        status: "Success",
        success: true,
        data: userRegister,
    });
}));
//* get all users
exports.getAllUser = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield user_model_1.User.find().populate("role");
    res.status(201).json({
        message: `All user fetched successfully...`,
        status: "Success",
        success: true,
        data: allUsers,
    });
}));
// * get user by ID
exports.getUserById = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_model_1.User.findById(id).populate("role");
    if (!user) {
        throw new error_handler_middleware_1.CustomError("User not found!", 404);
    }
    res.status(200).json({
        message: `user fetched successfully...`,
        status: "Success",
        success: true,
        data: user,
    });
}));
//* update user
exports.updateUser = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const user = yield user_model_1.User.findByIdAndUpdate(id, { $set: payload }).populate("role");
    if (!user) {
        throw new error_handler_middleware_1.CustomError("user not found!", 404);
    }
    res.status(200).json({
        message: `updated successfully...`,
        status: "Success",
        success: true,
        data: user,
    });
}));
// * remove user
exports.removeUser = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_model_1.User.findByIdAndDelete(id);
    res.status(200).json({
        message: `user deleted successfully...`,
        status: "Success",
        success: true,
        data: user,
    });
}));
