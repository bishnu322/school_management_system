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
exports.authenticate = void 0;
const error_handler_middleware_1 = require("./error-handler.middleware");
const jwt_token_utils_1 = require("../utils/jwt-token.utils");
const user_model_1 = require("../models/user.model");
const authenticate = (role) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const access_token = req.cookies.access_token;
            if (!access_token) {
                throw new error_handler_middleware_1.CustomError("Unauthorized user!", 401);
            }
            const decodedJwtData = yield (0, jwt_token_utils_1.verifyJwtToken)(access_token);
            if (Date.now() > decodedJwtData.exp * 1000) {
                throw new error_handler_middleware_1.CustomError("Session expire access token", 401);
            }
            const user = yield user_model_1.User.findById(decodedJwtData._id);
            if (!user) {
                throw new error_handler_middleware_1.CustomError("Unauthorized access token", 401);
            }
            if (role && !role.includes(decodedJwtData.role)) {
                throw new error_handler_middleware_1.CustomError("forbidden access denied !", 403);
            }
            req.user = {
                _id: decodedJwtData._id,
                first_name: decodedJwtData.first_name,
                last_name: decodedJwtData.last_name,
                email: decodedJwtData.email,
                role: decodedJwtData.role,
            };
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.authenticate = authenticate;
