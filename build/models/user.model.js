"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const global_type_1 = require("../types/global.type");
const userSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
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
        enum: global_type_1.IGender,
        default: global_type_1.IGender.MALE,
        required: [true, "gender is required !"],
    },
    profile_image: {
        path: {
            type: String,
        },
        public_id: {
            type: String,
        },
    },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("User", userSchema);
