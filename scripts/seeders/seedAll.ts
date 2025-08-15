import { execSync } from "child_process";
import mongoose from "../../database/mongo";
import Instructor from "../../models/Instructor";
import User from "../../models/User";

const scripts = [
  "populateCourses.js",
  "populateCategories.js", 
  "populateUsers.js",
  "populatePaylists.js",
  "populateLessons.js",
  "populateCertificates.js",
  "assignStudentsToCourses.js",
  "populateProgress.js",
  "populateComments.js",
  "assignCertificates.js",
  "populateTransactions.js",
  "populateCarts.js", 
];

async function dropAllCollections() {
  const collectionsToDrop = [
    "certificates",
    "comments",
    "courses",
    "coursesRenamed", 
    "categories",
    "instructors",
    "lessons",
    "playlists",
    "students",
    "transactions",
    "users",
    "carts", 
  ];
  for (const col of collectionsToDrop) {
    if (mongoose.connection.collections[col]) {
      await mongoose.connection.collections[col].drop().catch(() => {});
    }
  }
}

async function main() {
  await mongoose.connection; 
  console.log("Limpando todas as coleções...");
  await dropAllCollections();



  const { spawn } = require("child_process");
  const runSeeder = (script: string) => {
    return new Promise<void>((resolve, reject) => {
      const proc = spawn("node", [`dist/scripts/seeders/${script}`], {
        stdio: "inherit",
      });
      proc.on("close", (code: number) => {
        if (code === 0) resolve();
        else reject(new Error(`${script} exited with code ${code}`));
      });
    });
  };

  for (const script of scripts) {
    await runSeeder(script);
  }

  console.log("\x1b[32mBanco de dados semeado com sucesso! ✓\x1b[0m");
  await mongoose.connection.close();
}

main();
