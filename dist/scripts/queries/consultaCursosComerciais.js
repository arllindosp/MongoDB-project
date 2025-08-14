"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Transaction_1 = __importDefault(require("../../models/Transaction"));
// Consulta: Curso com maior receita e Top 5 mais vendidos
async function consultaCursosComerciais() {
    // Curso com maior receita
    const maiorReceita = await Transaction_1.default.aggregate([
        { $match: { status: "completed" } },
        {
            $group: {
                _id: "$courseId",
                receitaTotal: { $sum: "$amount" },
                vendas: { $sum: 1 },
            },
        },
        { $sort: { receitaTotal: -1 } },
        { $limit: 1 },
        {
            $lookup: {
                from: "courses",
                localField: "_id",
                foreignField: "_id",
                as: "courseDetails",
            },
        },
        { $unwind: "$courseDetails" },
    ]);
    // Top 5 cursos mais vendidos
    const topVendidos = await Transaction_1.default.aggregate([
        { $match: { status: "completed" } },
        {
            $group: {
                _id: "$courseId",
                vendas: { $sum: 1 },
                receitaTotal: { $sum: "$amount" },
            },
        },
        { $sort: { vendas: -1 } },
        { $limit: 5 },
        {
            $lookup: {
                from: "courses",
                localField: "_id",
                foreignField: "_id",
                as: "courseDetails",
            },
        },
        { $unwind: "$courseDetails" },
    ]);
    console.log("\n========== RELATÓRIO DE CURSOS COMERCIAIS ==========");
    console.log("---------------------------------------------");
    if (maiorReceita.length > 0) {
        const curso = maiorReceita[0];
        console.log("Curso com maior receita:");
        console.log(`  Título ..........: ${curso.courseDetails.title}`);
        console.log(`  Receita total ...: R$ ${curso.receitaTotal.toFixed(2)}`);
        console.log(`  Vendas ..........: ${curso.vendas}`);
        console.log("---------------------------------------------");
    }
    else {
        console.log("Nenhum curso encontrado.");
        console.log("---------------------------------------------");
    }
    console.log("Top 5 cursos mais vendidos:");
    topVendidos.forEach((curso, idx) => {
        console.log(`  ${idx + 1}. ${curso.courseDetails.title}`);
        console.log(`     Vendas .......: ${curso.vendas}`);
        console.log(`     Receita total: R$ ${curso.receitaTotal.toFixed(2)}`);
        console.log("---------------------------------------------");
    });
}
consultaCursosComerciais();
