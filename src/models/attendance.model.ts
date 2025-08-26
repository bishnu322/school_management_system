import { model, Schema } from "mongoose";

enum StudentStatus {
  ABSENT = "ABSENT",
  PRESENT = "PRESENT",
  SICK_LEAVE = "SICK_LEAVE",
  URGENT_LEAVE = "URGENT_LEAVE",
  // LATE = "LATE",
  // HALF_TIME = "HALF_TIME",
  PUBLIC_HOLIDAY = "PUBLIC_HOLIDAY",
}

const attendanceSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
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

export const Attendance = model("Attendance", attendanceSchema);
