"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = __importDefault(require("../database/mongo"));
const roles = ["student", "instructor", "admin"];
const userSchema = new mongo_1.default.Schema({
    name: String,
    email: String,
    password: String,
    plan: String,
    createdAt: { type: Date, default: Date.now },
    lastLogin: Date,
    role: {
        type: String,
        enum: roles,
    },
    bio: String,
    socialLinks: String,
});
exports.default = mongo_1.default.model("User", userSchema);
