"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lessonStatuses = ["active", "completed", "not_completed"];
const mongo_1 = __importDefault(require("../database/mongo"));
const lessonSchema = new mongo_1.default.Schema({
    title: String,
    duration: Number,
    resources: [
        {
            type: {
                type: String,
                enum: ["pdf", "slide", "link"],
            },
            name: String,
            url: String,
        },
    ],
    status: {
        type: String,
        enum: lessonStatuses,
        default: "active",
    },
    comments: [{ type: mongo_1.default.Schema.Types.ObjectId, ref: "Comment" }],
});
const Lesson = mongo_1.default.model("Lesson", lessonSchema);
exports.default = Lesson;
