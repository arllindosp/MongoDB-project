"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = __importDefault(require("../../database/mongo"));
const Playlist_1 = __importDefault(require("../../models/Playlist"));
const Instructor_1 = __importDefault(require("../../models/Instructor"));
const playlists = [
    {
        title: "Node.js para Iniciantes - Módulo 1",
        description: "Curso introdutório de Node.js para quem está começando no backend.",
        instructorName: "Carlos Souza",
        courseName: "Node.js para Iniciantes",
        lessons: [],
        isPublic: true,
        status: "active",
        comments: [],
    },
    {
        title: "JavaScript Moderno e Avançado - Unidade 1",
        description: "Aprofunde-se em JavaScript moderno, ES6+ e técnicas avançadas.",
        instructorName: "Carlos Souza",
        courseName: "JavaScript Moderno e Avançado",
        lessons: [],
        isPublic: true,
        status: "active",
        comments: [],
    },
    {
        title: "APIs RESTful com Express - Módulo 1",
        description: "Aprenda a criar APIs RESTful profissionais usando Express.",
        instructorName: "Carlos Souza",
        courseName: "Desenvolvimento de APIs RESTful com Express",
        lessons: [],
        isPublic: true,
        status: "active",
        comments: [],
    },
    {
        title: "Estatística para Iniciantes - Módulo 1",
        description: "Estatística básica para quem está começando.",
        instructorName: "Juliana Martins",
        courseName: "Fundamentos de Estatística para Iniciantes",
        lessons: [],
        isPublic: true,
        status: "active",
        comments: [],
    },
    {
        title: "Matemática Financeira Aplicada - Unidade 1",
        description: "Matemática financeira para aplicações práticas.",
        instructorName: "Juliana Martins",
        courseName: "Matemática Financeira Aplicada",
        lessons: [],
        isPublic: true,
        status: "active",
        comments: [],
    },
    {
        title: "Python para Data Science - Módulo 1",
        description: "Python aplicado à ciência de dados.",
        instructorName: "Juliana Martins",
        courseName: "Python Prático para Data Science",
        lessons: [],
        isPublic: true,
        status: "active",
        comments: [],
    },
    {
        title: "Física Experimental - Unidade 1",
        description: "Experimentos práticos de física.",
        instructorName: "Patrícia Duarte",
        courseName: "Laboratório de Física Experimental",
        lessons: [],
        isPublic: true,
        status: "active",
        comments: [],
    },
    {
        title: "Cálculo I - Módulo 1",
        description: "Primeiro curso de cálculo para universitários.",
        instructorName: "Patrícia Duarte",
        courseName: "Cálculo Diferencial e Integral I",
        lessons: [],
        isPublic: true,
        status: "active",
        comments: [],
    },
    {
        title: "Mecânica dos Materiais - Parte 1",
        description: "Mecânica aplicada para engenheiros.",
        instructorName: "Patrícia Duarte",
        courseName: "Mecânica dos Materiais para Engenharia",
        lessons: [],
        isPublic: true,
        status: "active",
        comments: [],
    },
    {
        title: "Química Orgânica Estrutural - Unidade 1",
        description: "Química orgânica com foco em estrutura molecular.",
        instructorName: "Larissa Ribeiro",
        courseName: "Química Orgânica Estrutural",
        lessons: [],
        isPublic: true,
        status: "active",
        comments: [],
    },
    {
        title: "Biologia Celular e Molecular - Módulo 1",
        description: "Estudo das células e moléculas biológicas.",
        instructorName: "Larissa Ribeiro",
        courseName: "Biologia Celular e Molecular",
        lessons: [],
        isPublic: true,
        status: "active",
        comments: [],
    },
    {
        title: "Ecologia Aplicada - Unidade 1",
        description: "Ecologia voltada para aplicações práticas.",
        instructorName: "Larissa Ribeiro",
        courseName: "Ecologia Aplicada",
        lessons: [],
        isPublic: true,
        status: "active",
        comments: [],
    },
    {
        title: "História do Brasil - Módulo 1",
        description: "Panorama histórico do Brasil.",
        instructorName: "Isabela Nunes",
        courseName: "História do Brasil: Da Colônia à República",
        lessons: [],
        isPublic: true,
        status: "active",
        comments: [],
    },
    {
        title: "Sociologia Contemporânea - Unidade 1",
        description: "Sociologia aplicada aos problemas atuais.",
        instructorName: "Isabela Nunes",
        courseName: "Sociologia Contemporânea e Problemas Sociais",
        lessons: [],
        isPublic: true,
        status: "active",
        comments: [],
    },
    {
        title: "Filosofia Ocidental - Módulo 1",
        description: "Filosofia ocidental desde a antiguidade.",
        instructorName: "Isabela Nunes",
        courseName: "Introdução à Filosofia: Pensamento Ocidental",
        lessons: [],
        isPublic: true,
        status: "active",
        comments: [],
    },
];
async function populatePlaylists() {
    await mongo_1.default.connection.dropCollection("playlists").catch(() => { });
    await mongo_1.default.connection;
    for (const playlist of playlists) {
        // Busca o usuário pelo nome do instrutor
        const user = await mongo_1.default.connection
            .collection("users")
            .findOne({ name: playlist.instructorName });
        if (!user) {
            console.log(`Usuário não encontrado: ${playlist.instructorName}`);
        }
        // Busca o instrutor pelo userId
        const instructor = user
            ? await Instructor_1.default.findOne({ userId: user._id })
            : null;
        if (!instructor && user) {
            console.log(`Instrutor não encontrado para usuário: ${playlist.instructorName}`);
        }
        // Busca o curso pelo nome
        const course = await mongo_1.default.connection
            .collection("courses")
            .findOne({ title: playlist.courseName });
        if (!course) {
            console.log(`Curso não encontrado: ${playlist.courseName}`);
        }
        if (instructor && course) {
            const createdPlaylist = await Playlist_1.default.create({
                title: playlist.title,
                description: playlist.description,
                userId: instructor.userId,
                courseId: course._id,
                lessons: playlist.lessons,
                isPublic: playlist.isPublic,
                status: playlist.status,
                comments: playlist.comments,
            });
            // Atualiza o curso para incluir o id da playlist
            await mongo_1.default.connection
                .collection("courses")
                .updateOne({ _id: course._id }, { $addToSet: { playlistId: createdPlaylist._id } });
        }
    }
    console.log("Playlists populadas e associadas aos cursos!");
    await mongo_1.default.connection.close();
    process.exit();
}
populatePlaylists();
