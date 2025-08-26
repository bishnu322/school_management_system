"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.superAdmin = exports.onlyUser = exports.IAllowedRole = exports.IGender = void 0;
var IGender;
(function (IGender) {
    IGender["MALE"] = "MALE";
    IGender["FEMALE"] = "FEMALE";
    IGender["OTHER"] = "OTHER";
})(IGender || (exports.IGender = IGender = {}));
var IAllowedRole;
(function (IAllowedRole) {
    IAllowedRole["SUPER_ADMIN"] = "SUPER_ADMIN";
    IAllowedRole["ADMIN"] = "ADMIN";
    IAllowedRole["TEACHER"] = "TEACHER";
    IAllowedRole["ACCOUNTANT"] = "ACCOUNTANT";
    IAllowedRole["STUDENT"] = "STUDENT";
})(IAllowedRole || (exports.IAllowedRole = IAllowedRole = {}));
exports.onlyUser = [IAllowedRole.STUDENT];
exports.superAdmin = [IAllowedRole.SUPER_ADMIN];
exports.Admin = [IAllowedRole.ADMIN];
