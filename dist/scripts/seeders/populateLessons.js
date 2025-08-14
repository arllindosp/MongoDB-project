"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = __importDefault(require("../../database/mongo"));
const Lesson_1 = __importDefault(require("../../models/Lesson"));
const lessons = [
    {
        playlistName: "Node.js para Iniciantes - Módulo 1",
        lesson: {
            title: "Introdução ao Node.js",
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
    },
    {
        playlistName: "Node.js para Iniciantes - Módulo 1",
        lesson: {
            title: "Instalação e Configuração",
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
    },
    {
        playlistName: "JavaScript Moderno e Avançado - Unidade 1",
        lesson: {
            title: "ES6+ Features",
            duration: 40,
            resources: [
                { type: "pdf", name: "Guia ES6", url: "https://es6.io/guide.pdf" },
            ],
            status: "active",
            comments: [],
        },
    },
    {
        playlistName: "JavaScript Moderno e Avançado - Unidade 1",
        lesson: {
            title: "Funções Avançadas",
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
    },
    {
        playlistName: "APIs RESTful com Express - Módulo 1",
        lesson: {
            title: "Criando uma API REST",
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
    },
    {
        playlistName: "APIs RESTful com Express - Módulo 1",
        lesson: {
            title: "Middleware e Rotas",
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
    },
    {
        playlistName: "Estatística para Iniciantes - Módulo 1",
        lesson: {
            title: "Conceitos Básicos",
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
    },
    {
        playlistName: "Matemática Financeira Aplicada - Unidade 1",
        lesson: {
            title: "Juros Simples e Compostos",
            duration: 40,
            resources: [
                { type: "pdf", name: "Juros", url: "https://matfin.com/juros.pdf" },
            ],
            status: "active",
            comments: [],
        },
    },
    {
        playlistName: "Python para Data Science - Módulo 1",
        lesson: {
            title: "Python Básico",
            duration: 60,
            resources: [
                { type: "link", name: "Python DS", url: "https://python.org/ds" },
            ],
            status: "active",
            comments: [],
        },
    },
    {
        playlistName: "Física Experimental - Unidade 1",
        lesson: {
            title: "Experimentos de Física",
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
    },
    {
        playlistName: "Cálculo I - Módulo 1",
        lesson: {
            title: "Limites e Derivadas",
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
    },
    {
        playlistName: "Mecânica dos Materiais - Parte 1",
        lesson: {
            title: "Resistência dos Materiais",
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
    },
    {
        playlistName: "Química Orgânica Estrutural - Unidade 1",
        lesson: {
            title: "Estruturas Orgânicas",
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
    },
    {
        playlistName: "Biologia Celular e Molecular - Módulo 1",
        lesson: {
            title: "Células e Moléculas",
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
    },
    {
        playlistName: "Ecologia Aplicada - Unidade 1",
        lesson: {
            title: "Ecossistemas",
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
    },
    {
        playlistName: "História do Brasil - Módulo 1",
        lesson: {
            title: "Brasil Colônia",
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
    },
    {
        playlistName: "Sociologia Contemporânea - Unidade 1",
        lesson: {
            title: "Sociedade Contemporânea",
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
    },
    {
        playlistName: "Filosofia Ocidental - Módulo 1",
        lesson: {
            title: "Filosofia Antiga",
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
    },
];
async function populateLessons() {
    await mongo_1.default.connection.dropCollection("lessons").catch(() => { });
    for (const item of lessons) {
        await Lesson_1.default.create(item.lesson);
    }
    console.log("Aulas populadas!");
}
async function associateLessonsToPlaylists() {
    // Limpa o campo lessons de todas as playlists
    await mongo_1.default.connection
        .collection("playlists")
        .updateMany({}, { $set: { lessons: [] } });
    // Busca todas as lessons
    const lessonsDocs = await mongo_1.default.connection
        .collection("lessons")
        .find({})
        .toArray();
    // Para cada lesson, encontra o item original para pegar o playlistName
    for (const lesson of lessonsDocs) {
        const item = lessons.find((l) => l.lesson.title === lesson.title);
        if (!item)
            continue;
        const playlist = await mongo_1.default.connection
            .collection("playlists")
            .findOne({ title: item.playlistName });
        if (playlist) {
            await mongo_1.default.connection
                .collection("playlists")
                .updateOne({ _id: playlist._id }, { $addToSet: { lessons: lesson._id } });
        }
    }
    console.log("Aulas associadas às playlists!");
}
async function main() {
    await mongo_1.default.connection;
    await populateLessons();
    await associateLessonsToPlaylists();
    await mongo_1.default.connection.close();
    process.exit();
}
main();
