import { Schema, model } from "mongoose";

const ALLOWED_ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "TEACHER",
  "ACCOUNTANT",
  "STUDENT",
];

const roleSchema = new Schema({
  role: {
    type: String,
    enum: ALLOWED_ROLES,
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
