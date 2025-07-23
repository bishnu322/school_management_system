import { Schema, model } from "mongoose";

const staffSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    employee_id: {
      type: Number,
    },
    department: {
      type: String,
      required: [true, "department is required!"],
    },
    phone_number: {
      type: Number,
      unique: [true, "Already have account"],
    },
    salary: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Staff = model("Staff", staffSchema);
