"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = __importDefault(require("../database/mongo"));
const certificateSchema = new mongo_1.default.Schema({
    certificateId: {
        type: mongo_1.default.Schema.Types.ObjectId,
        default: () => new mongo_1.default.Types.ObjectId(),
    },
    courseId: { type: mongo_1.default.Schema.Types.ObjectId, ref: "Course" },
    issueDate: { type: Date, default: Date.now },
    certificateUrl: String,
    status: {
        type: String,
        enum: ["issued", "revoked", "pending"],
        default: "issued",
    },
    declaration: {
        type: String,
        default: "",
    },
});
const Certificate = mongo_1.default.model("Certificate", certificateSchema);
exports.default = Certificate;
