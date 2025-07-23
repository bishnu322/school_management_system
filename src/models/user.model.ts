import { Schema, model } from "mongoose";
import { IGender } from "../types/global.type";

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
      ref: "Role",
    },
    email: {
      type: String,
      require: [true, "email is required"],
      trim: true,
      unique: [true, "Already have account"],
    },
    date_of_birth: {
      type: Date,
    },
    address: {
      type: String,
      required: [true, "address is required !"],
    },
    gender: {
      type: Object.values(IGender),
      default: IGender.MALE,
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
