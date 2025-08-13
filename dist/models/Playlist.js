"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = __importDefault(require("../database/mongo"));
const statuses = [
    "active",
    "inactive",
    "suspended",
    "completed",
    "pending",
    "not_completed",
];
const playlistSchema = new mongo_1.default.Schema({
    title: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
    userId: { type: mongo_1.default.Schema.Types.ObjectId, ref: "User" },
    lessons: [{ type: mongo_1.default.Schema.Types.ObjectId, ref: "Lesson" }],
    isPublic: { type: Boolean, default: false },
    status: {
        type: String,
        enum: statuses,
        default: "active",
    },
    comments: [{ type: mongo_1.default.Schema.Types.ObjectId, ref: "Comment" }],
});
module.exports = mongo_1.default.model("Playlist", playlistSchema);
