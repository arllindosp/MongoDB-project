"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = __importDefault(require("../database/mongo"));
// Modelo de vídeo para sistema de streaming
const languages = ["Português", "Inglês", "Espanhol", "Francês", "Alemão"];
const levels = ["beginner", "intermediate", "advanced"];
const courseSchema = new mongo_1.default.Schema({
    title: String,
    description: String,
    category: { type: mongo_1.default.Schema.Types.ObjectId, ref: "Category" },
    language: {
        type: String,
        enum: languages,
    },
    price: Number,
    thumbnail: String,
    level: {
        type: String,
        enum: levels,
    },
    certificates: [{ type: mongo_1.default.Schema.Types.ObjectId, ref: "Certificate" }],
    comments: [{ type: mongo_1.default.Schema.Types.ObjectId, ref: "Comment" }],
    instructorId: [
        {
            type: mongo_1.default.Schema.Types.ObjectId,
            ref: "Instructor",
        },
    ],
    playlistId: [{ type: mongo_1.default.Schema.Types.ObjectId, ref: "Playlist" }],
    ratingAverage: Number,
    published: Boolean,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    publishedAt: { type: Date, default: Date.now },
    url: String,
    releaseDate: { type: Date, default: Date.now },
});
module.exports = mongo_1.default.model("Course", courseSchema);
