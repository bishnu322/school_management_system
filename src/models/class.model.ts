import { Schema, model } from "mongoose";

const classSchema = new Schema({
  grade: {
    type: String,
    required: [true, "class is required !"],
  },
  section: {
    type: String,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  classTeacher: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
  },
});

export const Class = model("Class", classSchema);
