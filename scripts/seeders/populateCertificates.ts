import mongoose from "../../database/mongo";
import Course from "../../models/Course";
import Certificate from "../../models/Certificate";

// Array de certificados agrupados por curso
const certificadosPorCurso: { curso: string; certificados: any[] }[] = [
  {
    curso: "Node.js para Iniciantes",
    certificados: [
      {
        certificateId: "64d1a1f1c1a1a1a1a1a1a1a1",
        courseId: "id_nodejs",
        issueDate: new Date("2025-08-01T10:00:00Z"),
        certificateUrl: "https://certificados.com/nodejs/cert1",
        status: "issued",
        declaration:
          "Certificamos que o participante concluiu o curso Node.js para Iniciantes.",
      },
    ],
  },
  {
    curso: "JavaScript Moderno e Avançado",
    certificados: [
      {
        certificateId: "64d1a1f1c1a1a1a1a1a1a1a2",
        courseId: "id_js_moderno",
        issueDate: new Date("2025-08-02T10:00:00Z"),
        certificateUrl: "https://certificados.com/js/cert1",
        status: "issued",
        declaration:
          "Certificamos que o participante concluiu o curso JavaScript Moderno e Avançado.",
      },
    ],
  },
  {
    curso: "Desenvolvimento de APIs RESTful com Express",
    certificados: [
      {
        certificateId: "64d1a1f1c1a1a1a1a1a1a1a3",
        courseId: "id_apis_express",
        issueDate: new Date("2025-08-03T10:00:00Z"),
        certificateUrl: "https://certificados.com/express/cert1",
        status: "issued",
        declaration:
          "Certificamos que o participante concluiu o curso Desenvolvimento de APIs RESTful com Express.",
      },
    ],
  },
  {
    curso: "Fundamentos de Estatística para Iniciantes",
    certificados: [
      {
        certificateId: "64d1a1f1c1a1a1a1a1a1a1a4",
        courseId: "id_estatistica",
        issueDate: new Date("2025-08-04T10:00:00Z"),
        certificateUrl: "https://certificados.com/estatistica/cert1",
        status: "issued",
        declaration:
          "Certificamos que o participante concluiu o curso Fundamentos de Estatística para Iniciantes.",
      },
    ],
  },
  {
    curso: "Matemática Financeira Aplicada",
    certificados: [
      {
        certificateId: "64d1a1f1c1a1a1a1a1a1a1a5",
        courseId: "id_matematica_financeira",
        issueDate: new Date("2025-08-05T10:00:00Z"),
        certificateUrl: "https://certificados.com/matematica/cert1",
        status: "issued",
        declaration:
          "Certificamos que o participante concluiu o curso Matemática Financeira Aplicada.",
      },
    ],
  },
  {
    curso: "Python Prático para Data Science",
    certificados: [
      {
        certificateId: "64d1a1f1c1a1a1a1a1a1a1a6",
        courseId: "id_python_data_science",
        issueDate: new Date("2025-08-06T10:00:00Z"),
        certificateUrl: "https://certificados.com/python/cert1",
        status: "issued",
        declaration:
          "Certificamos que o participante concluiu o curso Python Prático para Data Science.",
      },
    ],
  },
  {
    curso: "Laboratório de Física Experimental",
    certificados: [
      {
        certificateId: "64d1a1f1c1a1a1a1a1a1a1a7",
        courseId: "id_fisica_experimental",
        issueDate: new Date("2025-08-07T10:00:00Z"),
        certificateUrl: "https://certificados.com/fisica/cert1",
        status: "issued",
        declaration:
          "Certificamos que o participante concluiu o curso Laboratório de Física Experimental.",
      },
    ],
  },
  {
    curso: "Cálculo Diferencial e Integral I",
    certificados: [
      {
        certificateId: "64d1a1f1c1a1a1a1a1a1a1a8",
        courseId: "id_calculo",
        issueDate: new Date("2025-08-08T10:00:00Z"),
        certificateUrl: "https://certificados.com/calculo/cert1",
        status: "issued",
        declaration:
          "Certificamos que o participante concluiu o curso Cálculo Diferencial e Integral I.",
      },
    ],
  },
  {
    curso: "Mecânica dos Materiais para Engenharia",
    certificados: [
      {
        certificateId: "64d1a1f1c1a1a1a1a1a1a1a9",
        courseId: "id_mecanica_materiais",
        issueDate: new Date("2025-08-09T10:00:00Z"),
        certificateUrl: "https://certificados.com/mecanica/cert1",
        status: "issued",
        declaration:
          "Certificamos que o participante concluiu o curso Mecânica dos Materiais para Engenharia.",
      },
    ],
  },
  {
    curso: "Química Orgânica Estrutural",
    certificados: [
      {
        certificateId: "64d1a1f1c1a1a1a1a1a1a1b1",
        courseId: "id_quimica_organica",
        issueDate: new Date("2025-08-10T10:00:00Z"),
        certificateUrl: "https://certificados.com/quimica/cert1",
        status: "issued",
        declaration:
          "Certificamos que o participante concluiu o curso Química Orgânica Estrutural.",
      },
    ],
  },
  {
    curso: "Biologia Celular e Molecular",
    certificados: [
      {
        certificateId: "64d1a1f1c1a1a1a1a1a1a1b2",
        courseId: "id_biologia_celular",
        issueDate: new Date("2025-08-11T10:00:00Z"),
        certificateUrl: "https://certificados.com/biologia/cert1",
        status: "issued",
        declaration:
          "Certificamos que o participante concluiu o curso Biologia Celular e Molecular.",
      },
    ],
  },
  {
    curso: "Ecologia Aplicada",
    certificados: [
      {
        certificateId: "64d1a1f1c1a1a1a1a1a1a1b3",
        courseId: "id_ecologia_aplicada",
        issueDate: new Date("2025-08-12T10:00:00Z"),
        certificateUrl: "https://certificados.com/ecologia/cert1",
        status: "issued",
        declaration:
          "Certificamos que o participante concluiu o curso Ecologia Aplicada.",
      },
    ],
  },
  {
    curso: "História do Brasil: Da Colônia à República",
    certificados: [
      {
        certificateId: "64d1a1f1c1a1a1a1a1a1a1b4",
        courseId: "id_historia_brasil",
        issueDate: new Date("2025-08-13T10:00:00Z"),
        certificateUrl: "https://certificados.com/historia/cert1",
        status: "issued",
        declaration:
          "Certificamos que o participante concluiu o curso História do Brasil: Da Colônia à República.",
      },
    ],
  },
  {
    curso: "Sociologia Contemporânea e Problemas Sociais",
    certificados: [
      {
        certificateId: "64d1a1f1c1a1a1a1a1a1a1b5",
        courseId: "id_sociologia_contemporanea",
        issueDate: new Date("2025-08-14T10:00:00Z"),
        certificateUrl: "https://certificados.com/sociologia/cert1",
        status: "issued",
        declaration:
          "Certificamos que o participante concluiu o curso Sociologia Contemporânea e Problemas Sociais.",
      },
    ],
  },
  {
    curso: "Introdução à Filosofia: Pensamento Ocidental",
    certificados: [
      {
        certificateId: "64d1a1f1c1a1a1a1a1a1a1b6",
        courseId: "id_filosofia_ocidental",
        issueDate: new Date("2025-08-15T10:00:00Z"),
        certificateUrl: "https://certificados.com/filosofia/cert1",
        status: "issued",
        declaration:
          "Certificamos que o participante concluiu o curso Introdução à Filosofia: Pensamento Ocidental.",
      },
    ],
  },
];
async function atribuirCertificadosAosCursos() {
  await mongoose.connection.dropCollection("certificates").catch(() => {});
  await mongoose.connection;
  for (const grupo of certificadosPorCurso) {
    // Busca o curso pelo título
    const curso = await Course.findOne({ title: grupo.curso });
    if (curso) {
      // Atualiza o campo courseId de cada certificado para o ObjectId real
      for (const cert of grupo.certificados) {
        cert.courseId = curso._id;
        await Certificate.create(cert);
      }
      // Extrai os IDs dos certificados
      const certificadosIds = grupo.certificados.map(
        (cert) => cert.certificateId
      );
      // Atualiza o campo certificates do curso
      await Course.updateOne(
        { _id: curso._id },
        { $set: { certificates: certificadosIds } }
      );
    }
  }
  console.log(
    "\x1b[32m✔ Certificados inseridos e atribuídos aos cursos!\x1b[0m"
  );
  await mongoose.connection.close();
  process.exit();
}

atribuirCertificadosAosCursos();
