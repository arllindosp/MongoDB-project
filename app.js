// Imports dos models
import UserModule from "./dist/models/User.js";
import TransactionModule from "./dist/models/Transaction.js";
import StudentModule from "./dist/models/Student.js";
import SessionModule from "./dist/models/Session.js";
import PlaylistModule from "./dist/models/Playlist.js";
import LessonModule from "./dist/models/Lesson.js";
import InstructorModule from "./dist/models/Instructor.js";
import CourseModule from "./dist/models/Course.js";
import CommentModule from "./dist/models/Comments.js";
import CertificateModule from "./dist/models/Certificate.js";
import CategoryModule from "./dist/models/Category.js";

const User = UserModule.default;
const Transaction = TransactionModule.default;
const Student = StudentModule.default;
const Playlist = PlaylistModule.default;
const Lesson = LessonModule.default;
const Instructor = InstructorModule.default;
const Course = CourseModule.default;
const Comment = CommentModule.default;
const Certificate = CertificateModule.default;
const Category = CategoryModule.default;

async function showWelcome() {
  const userCount = await User.countDocuments();
  const courseCount = await Course.countDocuments();
  const transactionCount = await Transaction.countDocuments();
  const studentCount = await Student.countDocuments();
  const instructorCount = await Instructor.countDocuments();
  console.log("========== Bem-vindo ao sistema MongoDB-project! ==========");
  console.log("Usuários cadastrados:........", userCount);
  console.log("Cursos disponíveis:..........", courseCount);
  console.log("Transações registradas:......", transactionCount);
  console.log("Alunos cadastrados:..........", studentCount);
  console.log("Instrutores cadastrados:.....", instructorCount);
  console.log("==============================================");
  console.log("Para executar queries e relatórios, insira seu código abaixo.");
  console.log("");
}

showWelcome();

// =====================
// Insira seus códigos abaixo para rodar queries, relatórios, etc.
// =====================
