"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = __importDefault(require("../database/mongo"));
const subSessionSchema = new mongo_1.default.Schema({
    title: { type: String, required: true },
    description: String,
    recommended: { type: Boolean, default: false },
    courseId: { type: mongo_1.default.Schema.Types.ObjectId, ref: "Course" },
}, { _id: false });
const sessionSchema = new mongo_1.default.Schema({
    title: { type: String, required: true },
    description: String,
    subSessions: [subSessionSchema],
    createdAt: { type: Date, default: Date.now },
});
module.exports = mongo_1.default.model("Session", sessionSchema);
