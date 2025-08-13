"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = __importDefault(require("../../database/mongo"));
const User = require("../../models/User");
const Student = require("../../models/Student");
const Instructor = require("../../models/Instructor");
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
        const createdUsers = await User.insertMany(users);
        // CRIAÇÃO DE ESTUDANTES
        const studentUsers = createdUsers.filter((u) => u.role === "student");
        await Promise.all(studentUsers.map((user) => Student.create({
            userId: user._id,
            cartId: null,
            enrolledCourses: [],
            certificates: [],
            progress: [],
        })));
        // CRIAÇÃO DE INSTRUTORES
        const instructorUsers = createdUsers.filter((u) => u.role === "instructor");
        await Promise.all(instructorUsers.map((user) => Instructor.create({
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
        console.log("Usuários, estudantes e instrutores inseridos com sucesso!");
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
    const instrutores = await Instructor.find({}).populate("userId");
    // Lista de dados reais por nome
    const instrutoresExtrasPorNome = {
        "Carlos Souza": {
            specialties: ["Programação", "JavaScript", "Node.js"],
            rating: 4.8,
            totalStudents: 1200,
            totalCourses: 8,
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
            totalStudents: 800,
            totalCourses: 5,
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
            totalStudents: 950,
            totalCourses: 6,
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
            totalStudents: 700,
            totalCourses: 4,
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
            totalStudents: 600,
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
    for (const instrutor of instrutores) {
        const nome = instrutor.userId?.name;
        const extras = instrutoresExtrasPorNome[nome];
        if (extras) {
            await Instructor.findByIdAndUpdate(instrutor._id, extras, { new: true });
        }
    }
    console.log("Dados dos instrutores atualizados pelo nome!");
}
