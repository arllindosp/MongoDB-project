"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = __importDefault(require("../../database/mongo"));
const User_1 = __importDefault(require("../../models/User"));
const Student_1 = __importDefault(require("../../models/Student"));
const Instructor_1 = __importDefault(require("../../models/Instructor"));
const users = [
    // Estudantes
    {
        name: "João Silva",
        email: "joao.silva@email.com",
        password: "123",
        role: "student",
        plan: "basic",
    },
    {
        name: "Maria Oliveira",
        email: "maria.oliveira@email.com",
        password: "456",
        role: "student",
        plan: "premium",
    },
    {
        name: "Fernanda Lima",
        email: "fernanda.lima@email.com",
        password: "321",
        role: "student",
        plan: "basic",
    },
    {
        name: "Lucas Pereira",
        email: "lucas.pereira@email.com",
        password: "654",
        role: "student",
        plan: "premium",
    },
    {
        name: "Bruna Rocha",
        email: "bruna.rocha@email.com",
        password: "111",
        role: "student",
        plan: "basic",
    },
    {
        name: "Gabriel Mendes",
        email: "gabriel.mendes@email.com",
        password: "222",
        role: "student",
        plan: "premium",
    },
    {
        name: "Camila Freitas",
        email: "camila.freitas@email.com",
        password: "555",
        role: "student",
        plan: "basic",
    },
    {
        name: "Vinícius Teixeira",
        email: "vinicius.teixeira@email.com",
        password: "666",
        role: "student",
        plan: "premium",
    },
    {
        name: "Aline Monteiro",
        email: "aline.monteiro@email.com",
        password: "999",
        role: "student",
        plan: "basic",
    },
    {
        name: "Thiago Fernandes",
        email: "thiago.fernandes@email.com",
        password: "000",
        role: "student",
        plan: "premium",
    },
    // Instrutores
    {
        name: "Carlos Souza",
        email: "carlos.souza@email.com",
        password: "789",
        role: "instructor",
        plan: "basic",
    },
    {
        name: "Juliana Martins",
        email: "juliana.martins@email.com",
        password: "987",
        role: "instructor",
        plan: "basic",
    },
    {
        name: "Patrícia Duarte",
        email: "patricia.duarte@email.com",
        password: "333",
        role: "instructor",
        plan: "basic",
    },
    {
        name: "Larissa Ribeiro",
        email: "larissa.ribeiro@email.com",
        password: "777",
        role: "instructor",
        plan: "basic",
    },
    {
        name: "Isabela Nunes",
        email: "isabela.nunes@email.com",
        password: "abc123",
        role: "instructor",
        plan: "basic",
    },
    // Admins
    {
        name: "Ana Costa",
        email: "ana.costa@email.com",
        password: "abc",
        role: "admin",
        plan: "admin",
    },
    {
        name: "Rafael Alves",
        email: "rafael.alves@email.com",
        password: "def",
        role: "admin",
        plan: "admin",
    },
    {
        name: "Eduardo Barros",
        email: "eduardo.barros@email.com",
        password: "444",
        role: "admin",
        plan: "admin",
    },
    {
        name: "Felipe Cardoso",
        email: "felipe.cardoso@email.com",
        password: "888",
        role: "admin",
        plan: "admin",
    },
    {
        name: "Rodrigo Batista",
        email: "rodrigo.batista@email.com",
        password: "def456",
        role: "admin",
        plan: "admin",
    },
];
async function populate() {
    try {
        // Dropa apenas as coleções antes de inserir
        await mongo_1.default.connection.dropCollection("users").catch(() => { });
        await mongo_1.default.connection.dropCollection("students").catch(() => { });
        await mongo_1.default.connection.dropCollection("instructors").catch(() => { });
        // Inserir todos os usuários
        const createdUsers = await User_1.default.insertMany(users);
        // CRIAÇÃO DE ESTUDANTES
        const studentUsers = createdUsers.filter((u) => u.role === "student");
        await Promise.all(studentUsers.map((user) => Student_1.default.create({
            nome: user.name,
            userId: user._id,
            cartId: null,
            enrolledCourses: [],
            certificates: [],
            progress: [],
        })));
        // CRIAÇÃO DE INSTRUTORES
        const instructorUsers = createdUsers.filter((u) => u.role === "instructor");
        await Promise.all(instructorUsers.map((user) => Instructor_1.default.create({
            userId: user._id,
            specialties: [],
            rating: 0,
            totalStudents: 0,
            totalCourses: 0,
            courses: [],
        })));
        // Atualiza dados reais dos instrutores após inserção
        await atualizarDadosInstrutoresPorNome();
        // ================= ADMINS =================
        // Os admins já estão criados na coleção User, não precisam de documento extra
        // Teste de cores no terminal
        // Mensagem principal
        console.log("\x1b[32m✔ Usuários, estudantes e instrutores inseridos com sucesso!\x1b[0m");
    }
    catch (err) {
        console.error("Erro ao inserir:", err);
    }
    finally {
        await mongo_1.default.connection.close();
        process.exit();
    }
}
populate();
// Função para atualizar dados reais dos instrutores no banco
async function atualizarDadosInstrutoresPorNome() {
    // Consulta todos os instrutores existentes
    const instrutores = await Instructor_1.default.find({}).populate("userId");
    // Lista de dados reais por nome (sem tipo TS)
    const instrutoresExtrasPorNome = {
        "Carlos Souza": {
            specialties: ["Programação", "JavaScript", "Node.js"],
            rating: 4.8,
            totalStudents: 0,
            totalCourses: 3,
            courses: [
                "Node.js para Iniciantes",
                "JavaScript Moderno e Avançado",
                "Desenvolvimento de APIs RESTful com Express",
            ],
            bio: "Carlos Souza é desenvolvedor fullstack com mais de 10 anos de experiência e atua como instrutor em cursos de programação web.",
            socialLinks: "https://linkedin.com/in/carlossouza",
        },
        "Juliana Martins": {
            specialties: ["Matemática", "Estatística", "Python"],
            rating: 4.5,
            totalStudents: 0,
            totalCourses: 3,
            courses: [
                "Fundamentos de Estatística para Iniciantes",
                "Matemática Financeira Aplicada",
                "Python Prático para Data Science",
            ],
            bio: "Juliana Martins é mestre em estatística e apaixonada por ensinar matemática aplicada e programação para análise de dados.",
            socialLinks: "https://linkedin.com/in/julianamartins",
        },
        "Patrícia Duarte": {
            specialties: ["Física", "Engenharia", "Cálculo"],
            rating: 4.7,
            totalStudents: 0,
            totalCourses: 3,
            courses: [
                "Laboratório de Física Experimental",
                "Cálculo Diferencial e Integral I",
                "Mecânica dos Materiais para Engenharia",
            ],
            bio: "Patrícia Duarte é engenheira e professora universitária, especialista em física aplicada e cálculo.",
            socialLinks: "https://linkedin.com/in/patriciad",
        },
        "Larissa Ribeiro": {
            specialties: ["Química", "Biologia", "Ciências Naturais"],
            rating: 4.6,
            totalStudents: 0,
            totalCourses: 3,
            courses: [
                "Química Orgânica Estrutural",
                "Biologia Celular e Molecular",
                "Ecologia Aplicada",
            ],
            bio: "Larissa Ribeiro é pesquisadora e educadora, com foco em ciências naturais e sustentabilidade.",
            socialLinks: "https://linkedin.com/in/larissaribeiro",
        },
        "Isabela Nunes": {
            specialties: ["História", "Sociologia", "Filosofia"],
            rating: 4.4,
            totalStudents: 0,
            totalCourses: 3,
            courses: [
                "História do Brasil: Da Colônia à República",
                "Sociologia Contemporânea e Problemas Sociais",
                "Introdução à Filosofia: Pensamento Ocidental",
            ],
            bio: "Isabela Nunes é historiadora dedicada ao ensino crítico e interdisciplinar das ciências humanas.",
            socialLinks: "https://linkedin.com/in/isabelanunes",
        },
    };
    // Itera e atualiza cada instrutor pelo nome do usuário
    // Busca os cursos pelo nome e atribui os ObjectIds
    const Course = require("../../models/Course").default;
    for (const instrutor of instrutores) {
        const nome = instrutor.userId
            ?.name;
        const extras = instrutoresExtrasPorNome[nome];
        if (extras) {
            // Busca os cursos pelo nome
            const cursosDocs = await Course.find({ title: { $in: extras.courses } });
            const cursosIds = cursosDocs.map((curso) => curso._id);
            // Atualiza o instrutor com os ObjectIds dos cursos
            await Instructor_1.default.findByIdAndUpdate(instrutor._id, {
                ...extras,
                courses: cursosIds,
            }, { new: true });
            // Atualiza o campo instructorId de cada curso para o id do instrutor
            for (const cursoDoc of cursosDocs) {
                await Course.updateOne({ _id: cursoDoc._id }, { $set: { instructorId: [instrutor._id] } });
            }
        }
    }
}
