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
exports.updateStaff = exports.removeStaff = exports.getStaffById = exports.getAllStaffs = void 0;
const async_handler_utils_1 = require("../utils/async-handler.utils");
const staff_model_1 = require("../models/staff.model");
const error_handler_middleware_1 = require("../middlewares/error-handler.middleware");
const user_model_1 = require("../models/user.model");
//* get all staffs
exports.getAllStaffs = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const staffs = yield staff_model_1.Staff.find()
        .populate("user_id")
        .populate({
        path: "user_id",
        populate: {
            path: "role",
            select: "role", // optional: only return role name
        },
    });
    if (!staffs) {
        throw new error_handler_middleware_1.CustomError("staffs not found", 404);
    }
    res.status(200).json({
        message: "All staffs fetched Successfully...",
        status: "success",
        success: true,
        data: staffs,
    });
}));
//get staff by id
exports.getStaffById = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const staff = yield staff_model_1.Staff.findById(id)
        .populate("user_id")
        .populate({
        path: "user_id",
        populate: {
            path: "role",
            select: "role",
        },
    });
    if (!staff) {
        throw new error_handler_middleware_1.CustomError("staff not found!", 404);
    }
    res.status(200).json({
        message: "All staffs fetched Successfully...",
        status: "success",
        success: true,
        data: staff,
    });
}));
// * remove staff
exports.removeStaff = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const staff = yield staff_model_1.Staff.findById(id);
    if (!staff) {
        throw new error_handler_middleware_1.CustomError("staff not found !", 404);
    }
    const userId = staff.user_id;
    const user = yield user_model_1.User.findByIdAndDelete(userId);
    if (!user) {
        throw new error_handler_middleware_1.CustomError("user not found !", 404);
    }
    yield staff.deleteOne();
    res.status(200).json({
        message: "staff removed successfully",
        status: "Success",
        success: true,
        data: {
            staff,
            user,
        },
    });
}));
// * update staff
exports.updateStaff = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { 
    //user data
    first_name, last_name, email, phone_number, date_of_birth, address, gender, role, 
    // staff data
    employee_id, department, salary, qualification, experienceYear, date_of_join, staff_data, } = req.body;
    const staff = yield staff_model_1.Staff.findById(id);
    if (!staff)
        throw new error_handler_middleware_1.CustomError("Staff not found!", 404);
    const user = yield user_model_1.User.findById(staff.user_id);
    if (!user)
        throw new error_handler_middleware_1.CustomError("user not found!", 404);
    //* update user data model if it changes
    if (first_name)
        user.first_name = first_name;
    if (last_name)
        user.last_name = last_name;
    if (email)
        user.email = email;
    if (phone_number)
        user.phone_number = phone_number;
    if (date_of_birth)
        user.date_of_birth = date_of_birth;
    if (address)
        user.address = address;
    if (gender)
        user.gender = gender;
    if (role)
        user.role = role;
    //* updating staff data
    if (employee_id)
        staff.employee_id = employee_id;
    if (department)
        staff.department = department;
    if (salary)
        staff.salary = salary;
    if (qualification)
        staff.qualification = qualification;
    if (experienceYear)
        staff.experienceYear = experienceYear;
    if (date_of_join)
        staff.date_of_join = date_of_join;
    if (staff_data)
        staff.staff_data = staff_data;
    yield user.save();
    yield staff.save();
    res.status(200).json({
        message: "staff updated successfully",
        status: "Success",
        success: true,
        data: {
            user,
            staff,
        },
    });
}));
