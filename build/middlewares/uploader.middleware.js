"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploader = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const error_handler_middleware_1 = require("./error-handler.middleware");
const fileUploader = () => {
    const fileSize = 5 * 1024 * 1024;
    const allowedExtensions = ["jpg", "png", "webp", "gif", "svg", "jpeg"];
    const storeData = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            const folder_name = "profile_image/";
            if (!fs_1.default.existsSync(folder_name)) {
                fs_1.default.mkdirSync(folder_name, { recursive: true });
            }
            cb(null, folder_name);
        },
        filename: (req, file, cb) => {
            const unique_name = Date.now() + "-" + file.originalname;
            cb(null, unique_name);
        },
    });
    const fileFilter = (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname).replace(".", "");
        if (allowedExtensions.includes(ext)) {
            cb(null, true);
        }
        else {
            const err = new error_handler_middleware_1.CustomError("file extension does not match", 400);
            cb(err);
        }
    };
    const upload = (0, multer_1.default)({
        storage: storeData,
        limits: { fileSize },
        fileFilter,
    });
    return upload;
};
exports.fileUploader = fileUploader;
