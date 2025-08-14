"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Student_1 = __importDefault(require("../../models/Student"));
// Query 3: Usar $size e $aggregate para encontrar estudantes com 2 ou mais cursos matriculados
async function query3() {
    // Usando aggregate para filtrar estudantes com 2 ou mais cursos
    const result = await Student_1.default.aggregate([
        {
            $match: {
                enrolledCourses: { $exists: true, $not: { $size: 0 } },
            },
        },
        {
            $project: {
                name: "$nome",
                enrolledCourses: 1,
            },
        },
        {
            $lookup: {
                from: "courses",
                localField: "enrolledCourses",
                foreignField: "_id",
                as: "courseDetails",
            },
        },
        {
            $addFields: {
                numCourses: { $size: "$courseDetails" },
                courseNames: {
                    $map: {
                        input: "$courseDetails",
                        as: "course",
                        in: "$$course.title",
                    },
                },
            },
        },
        {
            $match: {
                numCourses: { $gte: 2 },
            },
        },
    ]);
    console.log("========== Estudantes com 2 ou mais cursos matriculados ==========");
    result.forEach((student) => {
        console.log(`Nome: ${student.name}`);
        console.log("------------------------------");
        console.log(`Cursos matriculados: ${student.numCourses}`);
        console.log("Nomes dos cursos:");
        if (student.courseNames && student.courseNames.length > 0) {
            student.courseNames.forEach((courseName) => {
                console.log(`  • ${courseName}`);
            });
        }
        else {
            console.log("  (nenhum curso encontrado)");
        }
        console.log("------------------------------\n");
    });
}
query3();
