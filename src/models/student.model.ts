import { Schema, model } from "mongoose";

const studentSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  class_id: {
    type: String,
  },

  roll_number: {
    type: Number,
    required: [true, "Roll number is required !"],
  },
});

export const Student = model("Student", studentSchema);
