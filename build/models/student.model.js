"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const studentSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    class_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Class",
    },
    roll_number: {
        type: Number,
        required: [true, "Roll number is required !"],
    },
});
exports.Student = (0, mongoose_1.model)("Student", studentSchema);
