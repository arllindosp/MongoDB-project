import mongoose from "../../database/mongo";
import Student from "../../models/Student";
import User from "../../models/User";
import Course from "../../models/Course";
import Certificate from "../../models/Certificate";

async function assignCertificates() {
  await mongoose.connection;
  const students = await Student.find({});
  for (const student of students) {
    // Para cada curso em que o aluno está matriculado
    for (const courseId of student.enrolledCourses) {
      // Busca todas as aulas do curso
      const course = await Course.findById(courseId);
      if (!course) continue;
      // Busca todas as playlists do curso
      let lessonIds: string[] = [];
      if (course.playlistId && course.playlistId.length > 0) {
        for (const playlistId of course.playlistId) {
          const playlist = await mongoose.connection
            .collection("playlists")
            .findOne({ _id: playlistId });
          if (playlist && playlist.lessons) {
            lessonIds = lessonIds.concat(
              (playlist.lessons as any[]).map((id: any) => id.toString())
            );
          }
        }
      }
      // Filtra progresso do aluno para esse curso
      const progressForCourse = student.progress.filter(
        (p: any) => p.courseId.toString() === courseId.toString()
      );
      // Verifica se todas as aulas do curso estão completas
      const allLessonsCompleted =
        lessonIds.length > 0 &&
        lessonIds.every((lessonId: string) =>
          progressForCourse.some(
            (p: any) => p.lessonId.toString() === lessonId && p.completed
          )
        );
      if (allLessonsCompleted) {
        // Busca certificado do curso
        const certificate = await Certificate.findOne({ courseId: courseId });
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
  await mongoose.connection.close();
  process.exit();
}

assignCertificates();
