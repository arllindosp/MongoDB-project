import Lesson from "../../models/Lesson";
// Para executar: atribuirComentariosAulas();
import User from "../../models/User";
const Course = require("../../models/Course").default;
// Para executar: atribuirComentariosCursos();
import mongoose from "../../database/mongo";
const Comment = require("../../models/Comments").default;

// Nomes dos estudantes
const estudantes = [
  "João Silva",
  "Maria Oliveira",
  "Fernanda Lima",
  "Lucas Pereira",
  "Bruna Rocha",
  "Gabriel Mendes",
  "Camila Freitas",
  "Vinícius Teixeira",
  "Aline Monteiro",
  "Thiago Fernandes",
];

// Lista de comentários para cursos (20 comentários, apenas estudantes)
const comentariosCursos = [
  {
    userName: "João Silva",
    curso: "Node.js para Iniciantes",
    text: "Ótimo curso, aprendi muito!",
    createdAt: new Date(),
  },
  {
    userName: "Maria Oliveira",
    curso: "Matemática Financeira Aplicada",
    text: "Explicações claras e exemplos práticos.",
    createdAt: new Date(),
  },
  {
    userName: "Fernanda Lima",
    curso: "Laboratório de Física Experimental",
    text: "Gostei dos experimentos, bem didático.",
    createdAt: new Date(),
  },
  {
    userName: "Lucas Pereira",
    curso: "Biologia Celular e Molecular",
    text: "Conteúdo atualizado e relevante.",
    createdAt: new Date(),
  },
  {
    userName: "Bruna Rocha",
    curso: "História do Brasil: Da Colônia à República",
    text: "Excelente panorama histórico!",
    createdAt: new Date(),
  },
  {
    userName: "Gabriel Mendes",
    curso: "JavaScript Moderno e Avançado",
    text: "Didática excelente!",
    createdAt: new Date(),
  },
  {
    userName: "Camila Freitas",
    curso: "Python Prático para Data Science",
    text: "Muito útil para o dia a dia.",
    createdAt: new Date(),
  },
  {
    userName: "Vinícius Teixeira",
    curso: "Cálculo Diferencial e Integral I",
    text: "Explicações detalhadas.",
    createdAt: new Date(),
  },
  {
    userName: "Aline Monteiro",
    curso: "Química Orgânica Estrutural",
    text: "Material de apoio muito bom.",
    createdAt: new Date(),
  },
  {
    userName: "Thiago Fernandes",
    curso: "Ecologia Aplicada",
    text: "Aprendi sobre sustentabilidade.",
    createdAt: new Date(),
  },
  {
    userName: "João Silva",
    curso: "Mecânica dos Materiais para Engenharia",
    text: "Conteúdo avançado, gostei!",
    createdAt: new Date(),
  },
  {
    userName: "Maria Oliveira",
    curso: "Sociologia Contemporânea e Problemas Sociais",
    text: "Discussões relevantes.",
    createdAt: new Date(),
  },
  {
    userName: "Fernanda Lima",
    curso: "Desenvolvimento de APIs RESTful com Express",
    text: "Prático e direto ao ponto.",
    createdAt: new Date(),
  },
  {
    userName: "Lucas Pereira",
    curso: "Fundamentos de Estatística para Iniciantes",
    text: "Agora entendo estatística!",
    createdAt: new Date(),
  },
  {
    userName: "Bruna Rocha",
    curso: "Introdução à Filosofia: Pensamento Ocidental",
    text: "Reflexões profundas.",
    createdAt: new Date(),
  },
  {
    userName: "Gabriel Mendes",
    curso: "Node.js para Iniciantes",
    text: "Recomendo para iniciantes.",
    createdAt: new Date(),
  },
  {
    userName: "Camila Freitas",
    curso: "Matemática Financeira Aplicada",
    text: "Ótimos exemplos práticos.",
    createdAt: new Date(),
  },
  {
    userName: "Vinícius Teixeira",
    curso: "Laboratório de Física Experimental",
    text: "Experimentos bem explicados.",
    createdAt: new Date(),
  },
  {
    userName: "Aline Monteiro",
    curso: "Biologia Celular e Molecular",
    text: "Aula interativa.",
    createdAt: new Date(),
  },
  {
    userName: "Thiago Fernandes",
    curso: "História do Brasil: Da Colônia à República",
    text: "Muito interessante!",
    createdAt: new Date(),
  },
];

// Lista de comentários para aulas (20 comentários, apenas estudantes)
const comentariosAulas = [
  {
    userName: "João Silva",
    aula: "Introdução ao Node.js",
    text: "Aula introdutória muito boa.",
    createdAt: new Date(),
  },
  {
    userName: "Maria Oliveira",
    aula: "Juros Compostos",
    text: "Agora entendi como funciona!",
    createdAt: new Date(),
  },
  {
    userName: "Fernanda Lima",
    aula: "Experimento de Queda Livre",
    text: "Experimento simples e eficiente.",
    createdAt: new Date(),
  },
  {
    userName: "Lucas Pereira",
    aula: "Estrutura da Célula",
    text: "Aula bem detalhada.",
    createdAt: new Date(),
  },
  {
    userName: "Bruna Rocha",
    aula: "Brasil Colônia",
    text: "Explicação clara sobre o período colonial.",
    createdAt: new Date(),
  },
  {
    userName: "Gabriel Mendes",
    aula: "Funções em JavaScript",
    text: "Exemplos práticos ajudaram muito.",
    createdAt: new Date(),
  },
  {
    userName: "Camila Freitas",
    aula: "Manipulação de Dados em Python",
    text: "Muito útil para projetos.",
    createdAt: new Date(),
  },
  {
    userName: "Vinícius Teixeira",
    aula: "Limites e Derivadas",
    text: "Matemática ficou fácil!",
    createdAt: new Date(),
  },
  {
    userName: "Aline Monteiro",
    aula: "Estrutura Molecular",
    text: "Aula visual excelente.",
    createdAt: new Date(),
  },
  {
    userName: "Thiago Fernandes",
    aula: "Ciclos Ecológicos",
    text: "Aprendi sobre meio ambiente.",
    createdAt: new Date(),
  },
  {
    userName: "João Silva",
    aula: "Resistência dos Materiais",
    text: "Conteúdo avançado, gostei!",
    createdAt: new Date(),
  },
  {
    userName: "Maria Oliveira",
    aula: "Problemas Sociais Atuais",
    text: "Discussões relevantes.",
    createdAt: new Date(),
  },
  {
    userName: "Fernanda Lima",
    aula: "Rotas em Express",
    text: "Prático e direto ao ponto.",
    createdAt: new Date(),
  },
  {
    userName: "Lucas Pereira",
    aula: "Introdução à Estatística",
    text: "Agora entendo estatística!",
    createdAt: new Date(),
  },
  {
    userName: "Bruna Rocha",
    aula: "Pensamento Grego Antigo",
    text: "Reflexões profundas.",
    createdAt: new Date(),
  },
  {
    userName: "Gabriel Mendes",
    aula: "Node.js Básico",
    text: "Recomendo para iniciantes.",
    createdAt: new Date(),
  },
  {
    userName: "Camila Freitas",
    aula: "Matemática Financeira",
    text: "Ótimos exemplos práticos.",
    createdAt: new Date(),
  },
  {
    userName: "Vinícius Teixeira",
    aula: "Experimentos de Física",
    text: "Experimentos bem explicados.",
    createdAt: new Date(),
  },
  {
    userName: "Aline Monteiro",
    aula: "Biologia Celular",
    text: "Aula interativa.",
    createdAt: new Date(),
  },
  {
    userName: "Thiago Fernandes",
    aula: "Brasil República",
    text: "Muito interessante!",
    createdAt: new Date(),
  },
];

async function atribuirComentariosCursos() {
  await mongoose.connection;
  for (const comentario of comentariosCursos) {
    // Buscar userId pelo nome do estudante
    const usuario = await User.findOne({ name: comentario.userName });
    // Buscar courseId pelo título do curso
    const curso = await Course.findOne({ title: comentario.curso });
    if (usuario && curso) {
      // Insere o comentário na collection
      const novoComentario = await Comment.create({
        userId: usuario._id,
        text: comentario.text,
        createdAt: comentario.createdAt,
      });
      // Adiciona o id do comentário ao array comments do curso
      await Course.updateOne(
        { _id: curso._id },
        { $push: { comments: novoComentario._id } }
      );
    }
  }
  console.log("\x1b[32m✔ Comentários de cursos inseridos e atribuídos!\x1b[0m");
}

async function atribuirComentariosAulas() {
  await mongoose.connection;
  for (const comentario of comentariosAulas) {
    // Buscar userId pelo nome do estudante
    const usuario = await User.findOne({ name: comentario.userName });
    // Buscar lesson pelo título
    const aula = await Lesson.findOne({ title: comentario.aula });
    if (usuario && aula) {
      // Insere o comentário na collection
      const novoComentario = await Comment.create({
        userId: usuario._id,
        text: comentario.text,
        createdAt: comentario.createdAt,
      });
      // Adiciona o id do comentário ao array comments da lesson
      await Lesson.updateOne(
        { _id: aula._id },
        { $push: { comments: novoComentario._id } }
      );
    }
  }
  console.log("\x1b[32m✔ Comentários de aulas inseridos e atribuídos!\x1b[0m");
}
// Função principal para garantir fechamento correto da conexão
async function main() {
  await mongoose.connection.dropCollection("comments").catch(() => {});
  await atribuirComentariosCursos();
  await atribuirComentariosAulas();
  await mongoose.connection.close();
  process.exit();
}

main();
