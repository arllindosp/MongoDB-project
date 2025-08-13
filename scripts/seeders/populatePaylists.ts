import mongoose from "../../database/mongo";
const Playlist = require("../../models/Playlist");
import Instructor from "../../models/Instructor";

const playlists = [
  {
    title: "Node.js para Iniciantes - Módulo 1",
    description:
      "Curso introdutório de Node.js para quem está começando no backend.",
    instructorName: "Carlos Souza",
    lessons: [],
    isPublic: true,
    status: "active",
    comments: [],
  },
  {
    title: "JavaScript Moderno e Avançado - Unidade 1",
    description:
      "Aprofunde-se em JavaScript moderno, ES6+ e técnicas avançadas.",
    instructorName: "Carlos Souza",
    lessons: [],
    isPublic: true,
    status: "active",
    comments: [],
  },
  {
    title: "APIs RESTful com Express - Módulo 1",
    description: "Aprenda a criar APIs RESTful profissionais usando Express.",
    instructorName: "Carlos Souza",
    lessons: [],
    isPublic: true,
    status: "active",
    comments: [],
  },
  {
    title: "Estatística para Iniciantes - Módulo 1",
    description: "Estatística básica para quem está começando.",
    instructorName: "Juliana Martins",
    lessons: [],
    isPublic: true,
    status: "active",
    comments: [],
  },
  {
    title: "Matemática Financeira Aplicada - Unidade 1",
    description: "Matemática financeira para aplicações práticas.",
    instructorName: "Juliana Martins",
    lessons: [],
    isPublic: true,
    status: "active",
    comments: [],
  },
  {
    title: "Python para Data Science - Módulo 1",
    description: "Python aplicado à ciência de dados.",
    instructorName: "Juliana Martins",
    lessons: [],
    isPublic: true,
    status: "active",
    comments: [],
  },
  {
    title: "Física Experimental - Unidade 1",
    description: "Experimentos práticos de física.",
    instructorName: "Patrícia Duarte",
    lessons: [],
    isPublic: true,
    status: "active",
    comments: [],
  },
  {
    title: "Cálculo I - Módulo 1",
    description: "Primeiro curso de cálculo para universitários.",
    instructorName: "Patrícia Duarte",
    lessons: [],
    isPublic: true,
    status: "active",
    comments: [],
  },
  {
    title: "Mecânica dos Materiais - Parte 1",
    description: "Mecânica aplicada para engenheiros.",
    instructorName: "Patrícia Duarte",
    lessons: [],
    isPublic: true,
    status: "active",
    comments: [],
  },
  {
    title: "Química Orgânica Estrutural - Unidade 1",
    description: "Química orgânica com foco em estrutura molecular.",
    instructorName: "Larissa Ribeiro",
    lessons: [],
    isPublic: true,
    status: "active",
    comments: [],
  },
  {
    title: "Biologia Celular e Molecular - Módulo 1",
    description: "Estudo das células e moléculas biológicas.",
    instructorName: "Larissa Ribeiro",
    lessons: [],
    isPublic: true,
    status: "active",
    comments: [],
  },
  {
    title: "Ecologia Aplicada - Unidade 1",
    description: "Ecologia voltada para aplicações práticas.",
    instructorName: "Larissa Ribeiro",
    lessons: [],
    isPublic: true,
    status: "active",
    comments: [],
  },
  {
    title: "História do Brasil - Módulo 1",
    description: "Panorama histórico do Brasil.",
    instructorName: "Isabela Nunes",
    lessons: [],
    isPublic: true,
    status: "active",
    comments: [],
  },
  {
    title: "Sociologia Contemporânea - Unidade 1",
    description: "Sociologia aplicada aos problemas atuais.",
    instructorName: "Isabela Nunes",
    lessons: [],
    isPublic: true,
    status: "active",
    comments: [],
  },
  {
    title: "Filosofia Ocidental - Módulo 1",
    description: "Filosofia ocidental desde a antiguidade.",
    instructorName: "Isabela Nunes",
    lessons: [],
    isPublic: true,
    status: "active",
    comments: [],
  },
];

async function populatePlaylists() {
  await mongoose.connection;
  for (const playlist of playlists) {
    // Busca o instrutor pelo nome
    const instructor = await Instructor.findOne({
      "userId.name": playlist.instructorName,
    }).populate("userId");
    if (instructor) {
      await Playlist.create({
        title: playlist.title,
        description: playlist.description,
        userId: instructor.userId._id,
        lessons: playlist.lessons,
        isPublic: playlist.isPublic,
        status: playlist.status,
        comments: playlist.comments,
      });
    }
  }
  console.log("Playlists populadas!");
  await mongoose.connection.close();
  process.exit();
}

populatePlaylists();
