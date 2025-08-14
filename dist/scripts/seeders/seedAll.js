"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = __importDefault(require("../../database/mongo"));
const scripts = [
    "populateCourses.js",
    "populateCategories.js", // Executa logo após courses
    "populateUsers.js",
    "populatePaylists.js",
    "populateLessons.js",
    "populateCertificates.js",
    "assignStudentsToCourses.js",
    "populateProgress.js",
    "populateComments.js",
    "assignCertificates.js",
    "populateTransactions.js",
    "populateCarts.js", // Popula carrinhos fictícios
];
async function dropAllCollections() {
    const collectionsToDrop = [
        "certificates",
        "comments",
        "courses",
        "coursesRenamed", // Adiciona a coleção renomeada para ser removida
        "categories",
        "instructors",
        "lessons",
        "playlists",
        "students",
        "transactions",
        "users",
        "carts", // Adiciona a coleção de carrinhos
    ];
    for (const col of collectionsToDrop) {
        if (mongo_1.default.connection.collections[col]) {
            await mongo_1.default.connection.collections[col].drop().catch(() => { });
        }
    }
}
async function main() {
    await mongo_1.default.connection; // já está conectado pelo mongo.ts
    console.log("Limpando todas as coleções...");
    await dropAllCollections();
    // ...existing code...
    const { spawn } = require("child_process");
    const runSeeder = (script) => {
        return new Promise((resolve, reject) => {
            const proc = spawn("node", [`dist/scripts/seeders/${script}`], {
                stdio: "inherit",
            });
            proc.on("close", (code) => {
                if (code === 0)
                    resolve();
                else
                    reject(new Error(`${script} exited with code ${code}`));
            });
        });
    };
    for (const script of scripts) {
        await runSeeder(script);
    }
    console.log("\x1b[32mBanco de dados semeado com sucesso! ✓\x1b[0m");
    await mongo_1.default.connection.close();
}
main();
