import mongoose from "../../database/mongo";
import Student from "../../models/Student";
import Transaction from "../../models/Transaction";
import Course from "../../models/Course";
import User from "../../models/User";
async function populateTransactions() {
  // Consulta: cursos que João Silva comprou

  const joao = await User.findOne({ name: "João Silva" });
  if (joao) {
    const joaoStudent = await Student.findOne({ userId: joao._id });
    if (joaoStudent) {
      const cursosJoao = await Course.find({
        _id: { $in: joaoStudent.enrolledCourses },
      });
      console.log("Cursos que João Silva comprou:");
      cursosJoao.forEach((curso: any) => {
        console.log("-", curso.title);
      });
    } else {
      console.log("João Silva não é estudante ou não possui cursos comprados.");
    }
  } else {
    console.log("Usuário João Silva não encontrado.");
  }
  try {
    await mongoose.connection.dropCollection("transactions").catch(() => {});
    const students = await Student.find({}).populate("userId enrolledCourses");
    const transactions = [];

    for (const student of students) {
      for (const courseId of student.enrolledCourses) {
        const course = await Course.findById(courseId);
        if (!course) continue;
        transactions.push({
          userId: student.userId, // correto para Transaction
          courseId: course._id,
          amount: typeof course.price === "number" ? course.price : 100,
          currency: "BRL",
          paymentMethod: "credit_card",
          status: "completed",
          transactionDate: new Date(),
        });
      }
    }

    await Transaction.insertMany(transactions);
    console.log("\x1b[32m✔ Transações inseridas com sucesso!\x1b[0m");
  } catch (err) {
    console.error("Erro ao inserir transações:", err);
  } finally {
    await mongoose.connection.close();
    process.exit();
  }
}

populateTransactions();
