import { Schema, model } from "mongoose";

// type TRole = "Super Admin" | "Admin" | "Teacher" | "Student" | "Accountant" | "Librarian"  | "In charge";

enum ERole {
  SUPER_ADMIN = "Super Admin",
  ADMIN = "Admin",
  TEACHER = "Teacher",
  ACCOUNTANT = "Accountant",
}

const roleSchema = new Schema({
  role: {
    type: Object.values(ERole),
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
