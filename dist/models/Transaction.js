"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transactionStatuses = ["pending", "completed", "failed"];
const mongo_1 = __importDefault(require("../database/mongo"));
const transactionSchema = new mongo_1.default.Schema({
    userId: { type: mongo_1.default.Schema.Types.ObjectId, ref: "User" },
    courseId: { type: mongo_1.default.Schema.Types.ObjectId, ref: "Course" },
    amount: Number,
    currency: String,
    paymentMethod: String,
    status: {
        type: String,
        enum: transactionStatuses,
        default: "pending",
    },
    transactionDate: { type: Date, default: Date.now },
});
const Transaction = mongo_1.default.model("Transaction", transactionSchema);
exports.default = Transaction;
