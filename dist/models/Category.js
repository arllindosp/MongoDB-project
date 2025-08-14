"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = __importDefault(require("../database/mongo"));
const categorySchema = new mongo_1.default.Schema({
    name: { type: String, required: true },
    description: String,
    subcategories: [
        {
            name: { type: String, required: true },
            description: String,
        },
    ],
});
const Category = mongo_1.default.model("Category", categorySchema);
exports.default = Category;
