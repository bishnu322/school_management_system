import { Schema, model } from "mongoose";

const studentSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  roll_number: {
    type: Number,
    required: [true, "Roll number is required !"],
  },
});
