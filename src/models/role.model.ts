import { Schema, model } from "mongoose";
import { IAllowedRole } from "../types/global.type";

const roleSchema = new Schema({
  role: {
    type: String,
    enum: IAllowedRole,
    default: IAllowedRole.STUDENT,
    required: true,
    unique: true,
  },
});
export const Role = model("Role", roleSchema);

// const roles = [
//   {
//     _id: "bishnu",
//     role: "Super Admin",
//   },
//   {
//     _id: "shiva",
//     role: "Admin",
//   },
//   {
//     _id: "jack",
//     role: "Teacher",
//   },
//   {
//     _id: "mary",
//     role: "Student",
//   },
//   {
//     _id: "john",
//     role: "Accountant",
//   },
// ];

// const permissions = {
//   USER: [
//     "changePassword",
//     "deleteUser",
//     "createUser",
//     "editUser",
//     "deactivateUser",
//     "roleChanging",
//   ],
//   LIBRARY: [
//     // {
//     //   permission: "books",
//     //   method: "GET",
//     // },
//     // {
//     //   permission: "books",
//     //   method: "POST",
//     // },
//   ],
//   RESULT: [],
// };
