"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attendance = void 0;
const mongoose_1 = require("mongoose");
var StudentStatus;
(function (StudentStatus) {
    StudentStatus["ABSENT"] = "ABSENT";
    StudentStatus["PRESENT"] = "PRESENT";
    StudentStatus["SICK_LEAVE"] = "SICK_LEAVE";
    StudentStatus["URGENT_LEAVE"] = "URGENT_LEAVE";
    // LATE = "LATE",
    // HALF_TIME = "HALF_TIME",
    StudentStatus["PUBLIC_HOLIDAY"] = "PUBLIC_HOLIDAY";
})(StudentStatus || (StudentStatus = {}));
const attendanceSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        enum: StudentStatus,
        required: true,
    },
    date: Date,
    remark: {
        type: String,
    },
});
exports.Attendance = (0, mongoose_1.model)("Attendance", attendanceSchema);
