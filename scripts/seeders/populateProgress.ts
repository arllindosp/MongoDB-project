import mongoose from "../../database/mongo";
import Student from "../../models/Student";
import User from "../../models/User";
import Course from "../../models/Course";
import Lesson from "../../models/Lesson";

// Array de progresso por aluno
const progressPorAluno: { [nome: string]: any[] } = {
  "João Silva": [
    // João assistiu todas as aulas de Node.js para Iniciantes
    {
      courseTitle: "Node.js para Iniciantes",
      lessons: [
        { title: "Introdução ao Node.js", completed: true, percentage: 100 },
        {
          title: "Instalação e Configuração",
          completed: true,
          percentage: 100,
        },
      ],
    },
    // João está também em JavaScript Moderno e Avançado, com progresso parcial
    {
      courseTitle: "JavaScript Moderno e Avançado",
      lessons: [
        { title: "ES6+ Features", completed: true, percentage: 100 },
        { title: "Funções Avançadas", completed: false, percentage: 60 },
      ],
    },
  ],
  "Maria Oliveira": [
    // Maria assistiu todas as aulas de Python Prático para Data Science
    {
      courseTitle: "Python Prático para Data Science",
      lessons: [{ title: "Python Básico", completed: true, percentage: 100 }],
    },
  ],
  "Fernanda Lima": [
    // Fernanda assistiu todas as aulas de Fundamentos de Estatística para Iniciantes
    {
      courseTitle: "Fundamentos de Estatística para Iniciantes",
      lessons: [
        { title: "Conceitos Básicos", completed: true, percentage: 100 },
      ],
    },
  ],
  "Lucas Pereira": [
    // Lucas assistiu todas as aulas de Laboratório de Física Experimental
    {
      courseTitle: "Laboratório de Física Experimental",
      lessons: [
        { title: "Experimentos de Física", completed: true, percentage: 100 },
      ],
    },
  ],
  "Bruna Rocha": [
    // Bruna assistiu todas as aulas de Cálculo Diferencial e Integral I
    {
      courseTitle: "Cálculo Diferencial e Integral I",
      lessons: [
        { title: "Limites e Derivadas", completed: true, percentage: 100 },
      ],
    },
  ],
  "Gabriel Mendes": [
    // Gabriel está em um curso
    {
      courseTitle: "Biologia Celular e Molecular",
      lessons: [
        { title: "Células e Moléculas", completed: false, percentage: 0 },
      ],
    },
  ],
  "Camila Freitas": [
    // Camila está em dois cursos
    {
      courseTitle: "Mecânica dos Materiais para Engenharia",
      lessons: [
        {
          title: "Resistência dos Materiais",
          completed: true,
          percentage: 100,
        },
      ],
    },
    {
      courseTitle: "História do Brasil: Da Colônia à República",
      lessons: [{ title: "Brasil Colônia", completed: false, percentage: 50 }],
    },
  ],
  "Vinícius Teixeira": [
    // Vinícius está em um curso
    {
      courseTitle: "Sociologia Contemporânea e Problemas Sociais",
      lessons: [
        { title: "Sociedade Contemporânea", completed: false, percentage: 0 },
      ],
    },
  ],
  "Aline Monteiro": [
    // Aline está em um curso
    {
      courseTitle: "Introdução à Filosofia: Pensamento Ocidental",
      lessons: [
        { title: "Filosofia Antiga", completed: true, percentage: 100 },
      ],
    },
  ],
  "Thiago Fernandes": [], // Thiago não está em nenhum curso
};

async function populateProgress() {
  await mongoose.connection;
  for (const nomeAluno in progressPorAluno) {
    const user = await User.findOne({ name: nomeAluno });
    if (!user) continue;
    const student = await Student.findOne({ userId: user._id });
    if (!student) continue;
    const progresso = progressPorAluno[nomeAluno];
    // Recupera os cursos já matriculados
    let enrolledCourses: any[] = Array.isArray(student.enrolledCourses)
      ? [...student.enrolledCourses]
      : [];
    let progressArray: any[] = [];
    for (const curso of progresso) {
      const courseDoc = await Course.findOne({ title: curso.courseTitle });
      if (!courseDoc) continue;
      // Adiciona o curso do progresso apenas se não estiver já matriculado
      if (
        !enrolledCourses.some(
          (id) => id.toString() === courseDoc._id.toString()
        )
      ) {
        enrolledCourses.push(courseDoc._id);
      }
      for (const aula of curso.lessons) {
        const lessonDoc = await Lesson.findOne({ title: aula.title });
        if (!lessonDoc) continue;
        let timeWatched = 0;
        if (
          typeof aula.percentage === "number" &&
          typeof lessonDoc.duration === "number"
        ) {
          timeWatched = Math.round(
            (aula.percentage / 100) * lessonDoc.duration
          );
        }
        progressArray.push({
          courseId: courseDoc._id,
          lessonId: lessonDoc._id,
          completed: aula.completed,
          percentage: aula.percentage,
          timeWatched,
          lastAccess: new Date(),
        });
      }
    }
    await Student.updateOne(
      { _id: student._id },
      {
        $set: {
          enrolledCourses,
          progress: progressArray,
        },
      }
    );
  }
  console.log("\x1b[32m✔ Progresso dos alunos populado!\x1b[0m");
  await mongoose.connection.close();
  process.exit();
}

populateProgress();
