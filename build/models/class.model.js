"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
const mongoose_1 = require("mongoose");
const classSchema = new mongoose_1.Schema({
    grade: {
        type: String,
        required: [true, "class is required !"],
    },
    section: {
        type: String,
    },
});
exports.Class = (0, mongoose_1.model)("Class", classSchema);
