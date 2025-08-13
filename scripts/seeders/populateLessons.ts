import mongoose from "../../database/mongo";
const Lesson = require("../../models/Lesson");

const lessons = [
  // Node.js para Iniciantes - Módulo 1
  {
    title: "Node.js para Iniciantes - Módulo 1 - Introdução ao Node.js",
    duration: 30,
    resources: [
      {
        type: "pdf",
        name: "Guia Node.js",
        url: "https://nodejs.org/guide.pdf",
      },
      {
        type: "link",
        name: "Documentação Oficial",
        url: "https://nodejs.org/en/docs/",
      },
    ],
    status: "active",
    comments: [],
  },
  {
    title: "Node.js para Iniciantes - Módulo 1 - Instalação e Configuração",
    duration: 25,
    resources: [
      {
        type: "slide",
        name: "Slides Instalação",
        url: "https://slides.com/node-install",
      },
    ],
    status: "active",
    comments: [],
  },
  // JavaScript Moderno e Avançado - Unidade 1
  {
    title: "JavaScript Moderno e Avançado - Unidade 1 - ES6+ Features",
    duration: 40,
    resources: [
      { type: "pdf", name: "Guia ES6", url: "https://es6.io/guide.pdf" },
    ],
    status: "active",
    comments: [],
  },
  {
    title: "JavaScript Moderno e Avançado - Unidade 1 - Funções Avançadas",
    duration: 35,
    resources: [
      {
        type: "slide",
        name: "Funções JS",
        url: "https://slides.com/js-functions",
      },
    ],
    status: "active",
    comments: [],
  },
  // APIs RESTful com Express - Módulo 1
  {
    title: "APIs RESTful com Express - Módulo 1 - Criando uma API REST",
    duration: 45,
    resources: [
      {
        type: "pdf",
        name: "API REST",
        url: "https://expressjs.com/api-rest.pdf",
      },
    ],
    status: "active",
    comments: [],
  },
  {
    title: "APIs RESTful com Express - Módulo 1 - Middleware e Rotas",
    duration: 30,
    resources: [
      {
        type: "slide",
        name: "Middleware",
        url: "https://slides.com/express-middleware",
      },
    ],
    status: "active",
    comments: [],
  },
  // Estatística para Iniciantes - Módulo 1
  {
    title: "Estatística para Iniciantes - Módulo 1 - Conceitos Básicos",
    duration: 50,
    resources: [
      {
        type: "pdf",
        name: "Estatística Básica",
        url: "https://estatistica.com/basico.pdf",
      },
    ],
    status: "active",
    comments: [],
  },
  // Matemática Financeira Aplicada - Unidade 1
  {
    title:
      "Matemática Financeira Aplicada - Unidade 1 - Juros Simples e Compostos",
    duration: 40,
    resources: [
      { type: "pdf", name: "Juros", url: "https://matfin.com/juros.pdf" },
    ],
    status: "active",
    comments: [],
  },
  // Python para Data Science - Módulo 1
  {
    title: "Python para Data Science - Módulo 1 - Python Básico",
    duration: 60,
    resources: [
      { type: "link", name: "Python DS", url: "https://python.org/ds" },
    ],
    status: "active",
    comments: [],
  },
  // Física Experimental - Unidade 1
  {
    title: "Física Experimental - Unidade 1 - Experimentos de Física",
    duration: 55,
    resources: [
      {
        type: "pdf",
        name: "Experimentos",
        url: "https://fisica.com/experimentos.pdf",
      },
    ],
    status: "active",
    comments: [],
  },
  // Cálculo I - Módulo 1
  {
    title: "Cálculo I - Módulo 1 - Limites e Derivadas",
    duration: 45,
    resources: [
      {
        type: "slide",
        name: "Limites",
        url: "https://slides.com/calculo-limites",
      },
    ],
    status: "active",
    comments: [],
  },
  // Mecânica dos Materiais - Parte 1
  {
    title: "Mecânica dos Materiais - Parte 1 - Resistência dos Materiais",
    duration: 50,
    resources: [
      {
        type: "pdf",
        name: "Resistência",
        url: "https://engenharia.com/resistencia.pdf",
      },
    ],
    status: "active",
    comments: [],
  },
  // Química Orgânica Estrutural - Unidade 1
  {
    title: "Química Orgânica Estrutural - Unidade 1 - Estruturas Orgânicas",
    duration: 40,
    resources: [
      {
        type: "pdf",
        name: "Orgânica",
        url: "https://quimica.com/organica.pdf",
      },
    ],
    status: "active",
    comments: [],
  },
  // Biologia Celular e Molecular - Módulo 1
  {
    title: "Biologia Celular e Molecular - Módulo 1 - Células e Moléculas",
    duration: 35,
    resources: [
      {
        type: "slide",
        name: "Células",
        url: "https://slides.com/biologia-celular",
      },
    ],
    status: "active",
    comments: [],
  },
  // Ecologia Aplicada - Unidade 1
  {
    title: "Ecologia Aplicada - Unidade 1 - Ecossistemas",
    duration: 40,
    resources: [
      {
        type: "pdf",
        name: "Ecossistemas",
        url: "https://ecologia.com/ecossistemas.pdf",
      },
    ],
    status: "active",
    comments: [],
  },
  // História do Brasil - Módulo 1
  {
    title: "História do Brasil - Módulo 1 - Brasil Colônia",
    duration: 50,
    resources: [
      {
        type: "pdf",
        name: "Brasil Colônia",
        url: "https://historia.com/colonia.pdf",
      },
    ],
    status: "active",
    comments: [],
  },
  // Sociologia Contemporânea - Unidade 1
  {
    title: "Sociologia Contemporânea - Unidade 1 - Sociedade Contemporânea",
    duration: 45,
    resources: [
      {
        type: "slide",
        name: "Sociedade",
        url: "https://slides.com/sociologia-contemporanea",
      },
    ],
    status: "active",
    comments: [],
  },
  // Filosofia Ocidental - Módulo 1
  {
    title: "Filosofia Ocidental - Módulo 1 - Filosofia Antiga",
    duration: 40,
    resources: [
      {
        type: "pdf",
        name: "Filosofia Antiga",
        url: "https://filosofia.com/antiga.pdf",
      },
    ],
    status: "active",
    comments: [],
  },
];

async function populateLessons() {
  await mongoose.connection;
  for (const lesson of lessons) {
    await Lesson.create(lesson);
  }
  console.log("Aulas populadas!");
  await mongoose.connection.close();
  process.exit();
}

populateLessons();
