"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Staff = void 0;
const mongoose_1 = require("mongoose");
const staffSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    employee_id: {
        type: Number,
    },
    // class_id: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Class",
    //   },
    // ],
    department: {
        type: String,
        required: [true, "department is required!"],
    },
    salary: {
        type: Number,
        default: 0,
    },
    qualification: {
        type: String,
        required: [true, "qualification is required!"],
    },
    experienceYear: {
        type: Number,
        default: 0,
    },
    date_of_join: {
        type: Date,
        required: true,
    },
    staff_data: {
        type: Object,
    },
});
exports.Staff = (0, mongoose_1.model)("Staff", staffSchema);
