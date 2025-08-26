"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = require("mongoose");
const global_type_1 = require("../types/global.type");
const roleSchema = new mongoose_1.Schema({
    role: {
        type: String,
        enum: global_type_1.IAllowedRole,
        default: global_type_1.IAllowedRole.STUDENT,
        required: true,
        unique: true,
    },
});
exports.Role = (0, mongoose_1.model)("Role", roleSchema);
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
