"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = __importDefault(require("../database/mongo"));
const cartSchema = new mongo_1.default.Schema({
    userId: { type: mongo_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            courseId: {
                type: mongo_1.default.Schema.Types.ObjectId,
                ref: "Course",
                required: true,
            },
            addedAt: { type: Date, default: Date.now },
        },
    ],
    updatedAt: { type: Date, default: Date.now },
});
const Cart = mongo_1.default.model("Cart", cartSchema);
exports.default = Cart;
