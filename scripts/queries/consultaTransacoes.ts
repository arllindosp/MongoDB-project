// ---------------------------------------------------
// RELATÓRIO DE CURSOS COMERCIAIS
// ---------------------------------------------------
import Transaction from "../../models/Transaction";
import Course from "../../models/Course";
import User from "../../models/User";

// Consulta: Aluno que mais gastou e gasto médio na plataforma
async function consultaTransacoes() {
  const result = await Transaction.aggregate([
    { $match: { status: "completed" } },
    {
      $group: {
        _id: "$userId",
        totalGasto: { $sum: "$amount" },
        transacoes: { $push: "$amount" },
      },
    },
    { $sort: { totalGasto: -1 } },
    { $limit: 1 },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    { $unwind: "$userDetails" },
  ]);

  const media = await Transaction.aggregate([
    { $match: { status: "completed" } },
    {
      $group: {
        _id: null,
        mediaGasto: { $avg: "$amount" },
      },
    },
  ]);

  return { result, media };
}

async function consultaCursosComerciais() {
  // Curso com maior receita
  const maiorReceita = await Transaction.aggregate([
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
  const topVendidos = await Transaction.aggregate([
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

  // Apenas retorna os dados, sem printar

  return { maiorReceita, topVendidos };
}

// Função para relatório único
async function relatorioUnico() {
  console.log("\n========== RELATÓRIO GERAL DA PLATAFORMA ==========");

  console.log("\n--- RELATÓRIO COMERCIAL ---");
  // Transações
  const { result, media } = await consultaTransacoes();
  if (result.length > 0) {
    const aluno = result[0];
    console.log("Aluno que mais gastou:");
    console.log(`  Nome ............: ${aluno.userDetails.name}`);
    console.log(`  Total gasto .....: R$ ${aluno.totalGasto.toFixed(2)}`);
    console.log("---------------------------------------------");
  } else {
    console.log("Nenhum aluno encontrado.");
    console.log("---------------------------------------------");
  }
  if (media.length > 0) {
    console.log("Gasto médio na plataforma:");
    console.log(`  Valor médio .....: R$ ${media[0].mediaGasto.toFixed(2)}`);
    console.log("---------------------------------------------\n");
  }
  // Cursos
  const { maiorReceita, topVendidos } = await consultaCursosComerciais();
  if (maiorReceita.length > 0) {
    const curso = maiorReceita[0];
    console.log("Curso com maior receita:");
    console.log(`  Título ..........: ${curso.courseDetails.title}`);
    console.log(`  Receita total ...: R$ ${curso.receitaTotal.toFixed(2)}`);
    console.log(`  Vendas ..........: ${curso.vendas}`);
    console.log("---------------------------------------------");
  } else {
    console.log("Nenhum curso encontrado.");
    console.log("---------------------------------------------");
  }
  console.log("Top 5 cursos mais vendidos:");
  topVendidos.forEach((curso: any, idx: number) => {
    console.log(`  ${idx + 1}. ${curso.courseDetails.title}`);
    console.log(`     Vendas .......: ${curso.vendas}`);
    console.log(`     Receita total: R$ ${curso.receitaTotal.toFixed(2)}`);
    console.log("---------------------------------------------");
  });

  // Avaliações extras (parte do relatório)
  console.log("---------------------------------------------");
  // COUNT: total de transações concluídas
  const totalTransacoes = await Transaction.countDocuments({
    status: "completed",
  });

  // EXISTS (ajustado): contar transações que possuem campo 'currency' igual a 'BRL'
  const transacoesBRL = await Transaction.countDocuments({ currency: "BRL" });

  // MAX: valor máximo de uma transação concluída
  const maxTransacao = await Transaction.aggregate([
    { $match: { status: "completed" } },
    { $group: { _id: null, maxValor: { $max: "$amount" } } },
  ]);

  console.log(`| Total de transações concluídas:   ${totalTransacoes}`);
  console.log("---------------------------------------------");
  console.log(`| Transações com moeda BRL:         ${transacoesBRL}`);
  console.log("---------------------------------------------");
  console.log(
    `| Valor máximo de transação:        R$ ${
      maxTransacao[0]?.maxValor?.toFixed(2) ?? "N/A"
    }`
  );
  console.log("---------------------------------------------\n");
  // Consulta com $where: cursos com preço maior que o dobro do ratingAverage
  const cursosWhere = await Course.find({
    $where: function () {
      return this.price > this.ratingAverage * 2;
    },
  });
  console.log("\n--- CURSOS COM PREÇO > 2x RATING AVERAGE ---");
  if (cursosWhere.length > 0) {
    cursosWhere.forEach((curso: any, idx: number) => {
      console.log(
        `  ${idx + 1}. ${curso.title} | Preço: R$ ${curso.price} | Rating: ${
          curso.ratingAverage
        }`
      );
    });
  } else {
    console.log("Nenhum curso encontrado com preço > 2x ratingAverage.");
  }
  console.log("---------------------------------------------");
}

relatorioUnico();
