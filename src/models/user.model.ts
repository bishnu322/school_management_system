import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      trim: true,
      required: [true, "first name is required!"],
    },
    last_name: {
      type: String,
      trim: true,
      required: [true, "last name is required!"],
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "role",
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
