import mongoose from "../../database/mongo";
import User from "../../models/User";
import Student from "../../models/Student";
import Course from "../../models/Course";
import Cart from "../../models/Cart";

// Função utilitária para buscar cursos não matriculados
async function getUnenrolledCourses(student: any) {
  const enrolled = student.enrolledCourses || [];
  const allCourses = await Course.find({});
  return allCourses.filter((course: any) => !enrolled.includes(course._id));
}

async function populateCarts() {
  await mongoose.connection;
  // Limpa os carrinhos existentes
  await mongoose.connection.dropCollection("carts").catch(() => {});

  // Busca todos os estudantes
  const students = await Student.find({});

  for (const student of students) {
    // Busca cursos que o estudante NÃO está matriculado
    const unenrolledCourses = await getUnenrolledCourses(student);
    // Seleciona até 3 cursos aleatórios para o carrinho
    const cartCourses = unenrolledCourses
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const items = cartCourses.map((course: any) => ({
      courseId: course._id,
      addedAt: new Date(),
    }));
    // Cria o carrinho
    const cart = await Cart.create({
      userId: student.userId,
      items,
      updatedAt: new Date(),
    });
    // Atualiza o campo cartId do estudante
    await Student.updateOne(
      { _id: student._id },
      { $set: { cartId: cart._id } }
    );
  }
  console.log(
    "\x1b[32m✔ Carrinhos fictícios populados para estudantes!\x1b[0m"
  );
  await mongoose.connection.close();
  process.exit();
}

populateCarts();
