"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = __importDefault(require("../../database/mongo"));
const Student_1 = __importDefault(require("../../models/Student"));
const Course_1 = __importDefault(require("../../models/Course"));
const Certificate_1 = __importDefault(require("../../models/Certificate"));
async function assignCertificates() {
    await mongo_1.default.connection;
    const students = await Student_1.default.find({});
    for (const student of students) {
        // Para cada curso em que o aluno está matriculado
        for (const courseId of student.enrolledCourses) {
            // Busca todas as aulas do curso
            const course = await Course_1.default.findById(courseId);
            if (!course)
                continue;
            // Busca todas as playlists do curso
            let lessonIds = [];
            if (course.playlistId && course.playlistId.length > 0) {
                for (const playlistId of course.playlistId) {
                    const playlist = await mongo_1.default.connection
                        .collection("playlists")
                        .findOne({ _id: playlistId });
                    if (playlist && playlist.lessons) {
                        lessonIds = lessonIds.concat(playlist.lessons.map((id) => id.toString()));
                    }
                }
            }
            // Filtra progresso do aluno para esse curso
            const progressForCourse = student.progress.filter((p) => p.courseId.toString() === courseId.toString());
            // Verifica se todas as aulas do curso estão completas
            const allLessonsCompleted = lessonIds.length > 0 &&
                lessonIds.every((lessonId) => progressForCourse.some((p) => p.lessonId.toString() === lessonId && p.completed));
            if (allLessonsCompleted) {
                // Busca certificado do curso
                const certificate = await Certificate_1.default.findOne({ courseId: courseId });
                if (certificate) {
                    // Adiciona certificado ao aluno se ainda não tiver
                    if (!student.certificates.includes(certificate._id)) {
                        student.certificates.push(certificate._id);
                        await student.save();
                    }
                }
            }
        }
    }
    console.log("Certificados atribuídos aos alunos que concluíram seus cursos!");
    await mongo_1.default.connection.close();
    process.exit();
}
assignCertificates();
