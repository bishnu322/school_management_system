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
    password: {
      type: String,
      required: [true, "password is required"],
      min: 5,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    email: {
      type: String,
      require: [true, "email is required"],
      trim: true,
      unique: [true, "Already have account"],
    },

    phone_number: {
      type: Number,
      required: true,
    },

    date_of_birth: {
      type: Date,
    },

    address: {
      type: String,
      required: [true, "address is required !"],
    },

    gender: {
      type: String,
      enum: IGender,
      default: IGender.MALE,
      required: [true, "gender is required !"],
    },

    attendance: {
      type: Schema.Types.ObjectId,
      ref: "Attendance",
    },

    profile_image: {
      path: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
