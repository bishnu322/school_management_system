"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = void 0;
const generatePassword = () => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*?/";
    for (let i = 0; i <= 16; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        password += str.charAt(char);
    }
    return password;
};
exports.generatePassword = generatePassword;
