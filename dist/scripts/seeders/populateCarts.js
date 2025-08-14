"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = __importDefault(require("../../database/mongo"));
const Student_1 = __importDefault(require("../../models/Student"));
const Course_1 = __importDefault(require("../../models/Course"));
const Cart_1 = __importDefault(require("../../models/Cart"));
// Função utilitária para buscar cursos não matriculados
async function getUnenrolledCourses(student) {
    const enrolled = student.enrolledCourses || [];
    const allCourses = await Course_1.default.find({});
    return allCourses.filter((course) => !enrolled.includes(course._id));
}
async function populateCarts() {
    await mongo_1.default.connection;
    // Limpa os carrinhos existentes
    await mongo_1.default.connection.dropCollection("carts").catch(() => { });
    // Busca todos os estudantes
    const students = await Student_1.default.find({});
    for (const student of students) {
        // Busca cursos que o estudante NÃO está matriculado
        const unenrolledCourses = await getUnenrolledCourses(student);
        // Seleciona até 3 cursos aleatórios para o carrinho
        const cartCourses = unenrolledCourses
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
        const items = cartCourses.map((course) => ({
            courseId: course._id,
            addedAt: new Date(),
        }));
        // Cria o carrinho
        const cart = await Cart_1.default.create({
            userId: student.userId,
            items,
            updatedAt: new Date(),
        });
        // Atualiza o campo cartId do estudante
        await Student_1.default.updateOne({ _id: student._id }, { $set: { cartId: cart._id } });
    }
    console.log("\x1b[32m✔ Carrinhos fictícios populados para estudantes!\x1b[0m");
    await mongo_1.default.connection.close();
    process.exit();
}
populateCarts();
