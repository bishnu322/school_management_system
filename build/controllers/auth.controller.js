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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgerPassword = exports.changePassword = exports.logInUser = void 0;
const async_handler_utils_1 = require("../utils/async-handler.utils");
const user_model_1 = require("../models/user.model");
const error_handler_middleware_1 = require("../middlewares/error-handler.middleware");
const bcrypt_utils_1 = require("../utils/bcrypt.utils");
const jwt_token_utils_1 = require("../utils/jwt-token.utils");
// * login
exports.logInUser = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_model_1.User.findOne({ email: email }).populate("role");
    // console.log(user);
    if (!user) {
        throw new error_handler_middleware_1.CustomError("User not found!, for this email", 404);
    }
    if (!password) {
        throw new error_handler_middleware_1.CustomError("password is required", 400);
    }
    const payload = {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
    };
    const isMatchedPassword = yield (0, bcrypt_utils_1.comparePassword)(password, user.password);
    if (!isMatchedPassword) {
        throw new error_handler_middleware_1.CustomError("password is wrong, enter valid password", 400);
    }
    const access_token = yield (0, jwt_token_utils_1.generateJwtToken)(payload);
    const _a = user._doc, { password: pass } = _a, otherData = __rest(_a, ["password"]);
    res
        .cookie("access_token", access_token, {
        secure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: true,
        maxAge: Number(process.env.COOKIE_EXPIRY) * 24 * 60 * 60 * 1000,
    })
        .status(200)
        .json({
        message: "authorized user",
        status: "Success",
        success: true,
        data: otherData,
    });
}));
// * changePassword
exports.changePassword = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, old_password, new_password } = req.body;
    if (!email)
        throw new error_handler_middleware_1.CustomError("email is required!", 400);
    if (!old_password)
        throw new error_handler_middleware_1.CustomError("old password is required!", 400);
    if (!new_password)
        throw new error_handler_middleware_1.CustomError("new password is required!", 400);
    const user = yield user_model_1.User.findOne({ email }).select("+password");
    if (!user) {
        throw new error_handler_middleware_1.CustomError("user does not exist", 401);
    }
    const isPasswordMatch = yield (0, bcrypt_utils_1.comparePassword)(old_password, user.password);
    if (!isPasswordMatch) {
        throw new error_handler_middleware_1.CustomError("password does not match!", 401);
    }
    const hashedPassword = yield (0, bcrypt_utils_1.hashPassword)(new_password);
    user.password = hashedPassword;
    yield user.save();
    res.status(200).json({
        message: "password changed successfully",
        status: "Success",
        success: true,
    });
}));
// *forget password
exports.forgerPassword = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        throw new error_handler_middleware_1.CustomError("email is required!", 400);
    }
    const user = yield user_model_1.User.find({ email: email });
    if (!user) {
        throw new error_handler_middleware_1.CustomError("email is not valid!", 400);
    }
}));
