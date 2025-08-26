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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileImageUploader = void 0;
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
const error_handler_middleware_1 = require("../middlewares/error-handler.middleware");
const profileImageUploader = (path_1, ...args_1) => __awaiter(void 0, [path_1, ...args_1], void 0, function* (path, dir = "/") {
    try {
        const { public_id, secure_url } = yield cloudinary_config_1.default.uploader.upload(path, {
            unique_filename: true,
            folder: "SchoolManagementSystem" + "-" + dir,
        });
        return {
            public_id,
            path: secure_url,
        };
    }
    catch (error) {
        console.log(error);
        throw new error_handler_middleware_1.CustomError("error on file uploading on cloudinary", 400);
    }
});
exports.profileImageUploader = profileImageUploader;
