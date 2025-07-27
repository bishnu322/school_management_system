import { Schema, model } from "mongoose";

const staffSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  employee_id: {
    type: Number,
  },

  class_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
  ],

  department: {
    type: String,
    required: [true, "department is required!"],
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
});

export const Staff = model("Staff", staffSchema);
