"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 500;
        this.status =
            this.statusCode >= 400 && this.statusCode < 500 ? "failed" : "error";
        this.success = false;
        Error.captureStackTrace(this, CustomError);
    }
}
exports.CustomError = CustomError;
const errorHandler = (error, req, res, next) => {
    const message = (error === null || error === void 0 ? void 0 : error.message) || "Internal server error";
    const statusCode = (error === null || error === void 0 ? void 0 : error.statusCode) || 500;
    const status = (error === null || error === void 0 ? void 0 : error.status) || "error";
    const success = (error === null || error === void 0 ? void 0 : error.statusCode) || "failed";
    res.status(statusCode).json({
        message,
        statusCode,
        status,
        success,
        data: null,
    });
};
exports.errorHandler = errorHandler;
