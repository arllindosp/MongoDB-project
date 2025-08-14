"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
// Query 1: Buscar todos os usuários com plano premium
async function query1() {
    const premiumUsers = await User_1.default.find({ plan: "premium" });
    console.log("======= Usuários com plano premium =======");
    premiumUsers.forEach((user) => {
        console.log(`Nome: ${user.name}`);
        console.log("------------------------------");
        console.log(`Email: ${user.email}`);
        console.log(`Plano: ${user.plan}`);
        console.log(`Papel: ${user.role}`);
        console.log(`Criado em: ${user.createdAt}`);
        console.log("------------------------------\n");
    });
}
query1();
