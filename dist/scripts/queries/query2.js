"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Course_1 = __importDefault(require("../../models/Course"));
// Query 2: Buscar todos os cursos publicados com rating acima de 4.5
async function query2() {
    const topCourses = await Course_1.default.find({
        published: true,
        ratingAverage: { $gt: 4.5 },
    });
    console.log("Cursos publicados com rating > 4.5:", topCourses);
}
query2();
