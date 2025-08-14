"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = __importDefault(require("../../database/mongo"));
const Student_1 = __importDefault(require("../../models/Student"));
const Course_1 = __importDefault(require("../../models/Course"));
const User_1 = __importDefault(require("../../models/User"));
// Array de matrícula dos alunos nos cursos
const matriculasPorAluno = {
    "João Silva": [
        "Node.js para Iniciantes",
        "JavaScript Moderno e Avançado",
        "Python Prático para Data Science",
        "Laboratório de Física Experimental",
    ],
    "Maria Oliveira": [
        "Python Prático para Data Science",
        "Laboratório de Física Experimental",
        "Node.js para Iniciantes",
    ],
    "Fernanda Lima": [
        "Fundamentos de Estatística para Iniciantes",
        "Laboratório de Física Experimental",
        "Node.js para Iniciantes",
    ],
    "Lucas Pereira": [
        "Laboratório de Física Experimental",
        "Node.js para Iniciantes",
    ],
    "Bruna Rocha": [
        "Cálculo Diferencial e Integral I",
        "Node.js para Iniciantes",
    ],
    "Gabriel Mendes": ["Biologia Celular e Molecular", "Node.js para Iniciantes"],
    "Camila Freitas": [
        "Mecânica dos Materiais para Engenharia",
        "História do Brasil: Da Colônia à República",
        "Node.js para Iniciantes",
        "Laboratório de Física Experimental",
    ],
    "Vinícius Teixeira": [
        "Sociologia Contemporânea e Problemas Sociais",
        "Node.js para Iniciantes",
    ],
    "Aline Monteiro": [
        "Introdução à Filosofia: Pensamento Ocidental",
        "Node.js para Iniciantes",
        "Laboratório de Física Experimental",
    ],
    "Thiago Fernandes": [
        "Node.js para Iniciantes",
        "Laboratório de Física Experimental",
        "Python Prático para Data Science",
    ],
};
// Este script atribui alunos aos cursos em que estão matriculados
async function assignStudentsToCourses() {
    try {
        // Para cada aluno no array de matrícula
        for (const nomeAluno in matriculasPorAluno) {
            const user = await User_1.default.findOne({ name: nomeAluno });
            if (!user)
                continue;
            const student = await Student_1.default.findOne({ userId: user._id });
            if (!student)
                continue;
            const cursosTitles = matriculasPorAluno[nomeAluno];
            const cursosDocs = await Course_1.default.find({ title: { $in: cursosTitles } });
            const cursosIds = cursosDocs.map((curso) => curso._id);
            // Atualiza o campo enrolledCourses do estudante
            student.enrolledCourses = cursosIds;
            await student.save();
            // Atualiza cada curso para incluir o estudante na lista de alunos matriculados
            for (const curso of cursosDocs) {
                if (!curso.enrolledStudents)
                    curso.enrolledStudents = [];
                if (!curso.enrolledStudents.includes(student._id)) {
                    curso.enrolledStudents.push(student._id);
                    await curso.save();
                }
            }
        }
        console.log("\x1b[32m✔ Alunos atribuídos aos cursos com sucesso!\x1b[0m");
    }
    catch (err) {
        console.error("Erro ao atribuir alunos aos cursos:", err);
    }
    finally {
        await mongo_1.default.connection.close();
        process.exit();
    }
}
assignStudentsToCourses();
