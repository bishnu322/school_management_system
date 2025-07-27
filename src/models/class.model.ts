import { Schema, model } from "mongoose";

const classSchema = new Schema({
  grade: {
    type: String,
    required: [true, "class is required !"],
  },

  section: {
    type: String,
  },

  academicYear: {
    type: Date,
    required: true,
  },
});

export const Class = model("Class", classSchema);
