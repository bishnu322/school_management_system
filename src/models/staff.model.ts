import { Schema, model } from "mongoose";

const staffSchema = new Schema(
  {
    user_id: {
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
      default: 0,
    },
    qualification: {
      type: String,
      required: [true, "qualification is required!"],
    },
    experienceYear: {
      type: Number,
      default: 0,
    },
    date_of_join: {
      type: Date,
      required: true,
    },
    staff_data: {
      type: Object,
    },
  },
  { timestamps: true }
);

export const Staff = model("Staff", staffSchema);
