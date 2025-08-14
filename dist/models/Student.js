"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = __importDefault(require("../database/mongo"));
const studentSchema = new mongo_1.default.Schema({
    nome: { type: String, required: false },
    userId: { type: mongo_1.default.Schema.Types.ObjectId, ref: "User" },
    cartId: { type: mongo_1.default.Schema.Types.ObjectId, ref: "Cart" },
    enrolledCourses: [{ type: mongo_1.default.Schema.Types.ObjectId, ref: "Course" }],
    certificates: [{ type: mongo_1.default.Schema.Types.ObjectId, ref: "Certificate" }],
    progress: [
        {
            courseId: { type: mongo_1.default.Schema.Types.ObjectId, ref: "Course" },
            lessonId: { type: mongo_1.default.Schema.Types.ObjectId, ref: "Lesson" },
            completed: { type: Boolean, default: false },
            percentage: { type: Number, default: 0 },
            timeWatched: { type: Number, default: 0 }, // tempo assistido em minutos
            lastAccess: Date,
        },
    ],
});
exports.default = mongo_1.default.model("Student", studentSchema);
