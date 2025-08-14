"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = __importDefault(require("../../database/mongo"));
const Student_1 = __importDefault(require("../../models/Student"));
const Transaction_1 = __importDefault(require("../../models/Transaction"));
const Course_1 = __importDefault(require("../../models/Course"));
const User_1 = __importDefault(require("../../models/User"));
async function populateTransactions() {
    // Consulta: cursos que João Silva comprou
    const joao = await User_1.default.findOne({ name: "João Silva" });
    if (joao) {
        const joaoStudent = await Student_1.default.findOne({ userId: joao._id });
        if (joaoStudent) {
            const cursosJoao = await Course_1.default.find({
                _id: { $in: joaoStudent.enrolledCourses },
            });
            console.log("Cursos que João Silva comprou:");
            cursosJoao.forEach((curso) => {
                console.log("-", curso.title);
            });
        }
        else {
            console.log("João Silva não é estudante ou não possui cursos comprados.");
        }
    }
    else {
        console.log("Usuário João Silva não encontrado.");
    }
    try {
        await mongo_1.default.connection.dropCollection("transactions").catch(() => { });
        const students = await Student_1.default.find({}).populate("userId enrolledCourses");
        const transactions = [];
        for (const student of students) {
            for (const courseId of student.enrolledCourses) {
                const course = await Course_1.default.findById(courseId);
                if (!course)
                    continue;
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
        await Transaction_1.default.insertMany(transactions);
        console.log("\x1b[32m✔ Transações inseridas com sucesso!\x1b[0m");
    }
    catch (err) {
        console.error("Erro ao inserir transações:", err);
    }
    finally {
        await mongo_1.default.connection.close();
        process.exit();
    }
}
populateTransactions();
