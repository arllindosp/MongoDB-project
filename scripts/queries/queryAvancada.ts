import mongoose from "../../database/mongo";
import Student from "../../models/Student";
import Course from "../../models/Course";
import Category from "../../models/Category";

// Query avançada: Explora conceitos não comerciais e operadores menos usados
async function queryAvancada() {
  // Buscar ObjectIds das categorias de exatas
  const categoriasExatasDocs = await Category.find({
    name: { $in: ["Ciências Exatas e Engenharia", "Matemática e Estatística"] },
  });
  const categoriasExatasIds = categoriasExatasDocs.map((cat: any) => cat._id);

  // Encontrar estudantes matriculados em cursos de exatas (usando $lookup e $match)
  const estudantesExatas = await Student.aggregate([
    {
      $lookup: {
        from: "courses",
        localField: "enrolledCourses",
        foreignField: "_id",
        as: "courseDetails",
      },
    },
    {
      $addFields: {
        exatasCourses: {
          $filter: {
            input: "$courseDetails",
            as: "curso",
            cond: {
              $in: ["$$curso.category", categoriasExatasIds],
            },
          },
        },
      },
    },
    {
      $match: {
        "exatasCourses.0": { $exists: true },
      },
    },
    {
      $project: {
        name: "$nome",
        exatasCourseNames: {
          $map: {
            input: "$exatasCourses",
            as: "curso",
            in: "$$curso.title",
          },
        },
      },
    },
  ]);

  // Encontrar estudantes que possuem progresso registrado (campo progress existe e não vazio)
  const estudantesComProgresso = await Student.countDocuments({
    progress: { $exists: true, $not: { $size: 0 } },
  });

  // Maior número de cursos matriculados por um estudante
  const maxCursos = await Student.aggregate([
    { $project: { numCursos: { $size: "$enrolledCourses" } } },
    { $group: { _id: null, maxCursos: { $max: "$numCursos" } } },
  ]);

  // Total de estudantes matriculados
  const totalEstudantesMatriculados = await Student.countDocuments({
    enrolledCourses: { $exists: true, $not: { $size: 0 } },
  });

  // Buscar total de alunos com certificados
  const alunosComCertificados = await Student.countDocuments({
    certificates: { $exists: true, $not: { $size: 0 } },
  });

  // Contar total de cursos por categoria usando agregação
  const cursosPorArea = await Course.aggregate([
    { $group: { _id: "$category", total: { $sum: 1 } } },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    {
      $project: {
        total: 1,
        categoryName: { $arrayElemAt: ["$categoryDetails.name", 0] },
      },
    },
    { $sort: { total: -1 } },
  ]);

  // Exemplo de uso do operador $function: marcar cursos avançados
  const cursosAvancados = await Course.aggregate([
    {
      $project: {
        title: 1,
        isAvancado: {
          $function: {
            body: function (nome: any) {
              return nome.includes("Avançado");
            },
            args: ["$title"],
            lang: "js",
          },
        },
      },
    },
  ]);

  // Query demonstrando $all, $set e $text
  // 1. Buscar cursos que tenham todos os tópicos especificados
  // (supondo que existe um campo 'topics' do tipo array em Course)
  const cursosComTopicos = await Course.find({
    topics: { $all: ["JavaScript", "Node.js"] },
  });
  console.log("Cursos que possuem os tópicos JavaScript e Node.js:");
  cursosComTopicos.forEach((curso: any) => {
    console.log(`  ${curso.title}`);
  });

  // Garantir que existe índice de texto no campo 'description' antes da busca $text

  // 4. Explicação do pretty()
  console.log(
    "No shell do MongoDB, o comando .pretty() apenas formata a saída para facilitar a leitura. Exemplo: db.courses.find().pretty(). No Node.js/Mongoose, não é necessário, pois o resultado já é um objeto JavaScript."
  );

  console.log("========== Query Avançada ==========");
  console.log(`Estudantes com progresso registrado: ${estudantesComProgresso}`);
  console.log(
    `Maior número de cursos por estudante: ${maxCursos[0]?.maxCursos ?? "N/A"}`
  );
  console.log(
    `Total de estudantes matriculados: ${totalEstudantesMatriculados}`
  );
  console.log(`Total de alunos com certificados: ${alunosComCertificados}`);
  console.log("Cursos por área:");
  cursosPorArea.forEach((area: any) => {
    console.log(`  ${area.categoryName ?? area._id}: ${area.total}`);
  });
  console.log("---------------------------------------------\n");
  // Printar alunos em exatas no final
  console.log(
    `Estudantes matriculados em cursos de exatas: ${estudantesExatas.length}`
  );
  estudantesExatas.forEach((student: any) => {
    console.log(`Nome: ${student.name}`);
    console.log("Cursos de exatas:");
    if (student.exatasCourseNames && student.exatasCourseNames.length > 0) {
      student.exatasCourseNames.forEach((courseName: string) => {
        console.log(`  • ${courseName}`);
      });
      console.log("---------------------------------------------\n");
    } else {
      console.log("  (nenhum curso de exatas)");
    }
  });
  console.log("------------------------------");
  console.log("Cursos marcados como avançados :");
  cursosAvancados.forEach((curso: any) => {
    console.log(`  ${curso.title}: ${curso.isAvancado ? "Sim" : "Não"}`);
  });
  console.log("---------------------------------------------\n");
}

queryAvancada();
