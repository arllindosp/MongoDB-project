"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = __importDefault(require("../database/mongo"));
const instructorSchema = new mongo_1.default.Schema({
    userId: {
        type: mongo_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    specialties: [String],
    rating: Number,
    totalStudents: Number,
    totalCourses: Number,
    courses: [
        {
            type: mongo_1.default.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
});
exports.default = mongo_1.default.model("Instructor", instructorSchema);
