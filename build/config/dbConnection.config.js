"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnection = (DB_URI) => {
    mongoose_1.default
        .connect(DB_URI)
        .then(() => {
        console.log("DB connected successfully...");
    })
        .catch((error) => {
        console.log("DB connection failed", error);
    });
};
exports.dbConnection = dbConnection;
