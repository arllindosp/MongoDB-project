import mongoose from "../../database/mongo";
import User from "../../models/User";

// Query 1: Buscar todos os usuários com plano premium
async function query1() {
  const premiumUsers = await User.find({ plan: "premium" });
  console.log("======= Usuários com plano premium =======");
  premiumUsers.forEach((user: any) => {
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
