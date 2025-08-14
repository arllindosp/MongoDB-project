import { any } from "webidl-conversions";
// Configuracao e conexao com o banco de dados
const mongoose = require("mongoose");

// Para usar sua própria string de conexão do Compass, defina abaixo:
// Exemplo: const USER_MONGO_URI = "mongodb://usuario:senha@host:porta/database";
const USER_MONGO_URI = ""; // <--- Cole aqui sua string do Compass se quiser usar personalizada

const MONGO_URI =
  USER_MONGO_URI ||
  process.env.MONGO_URI ||
  "mongodb://localhost:27017/stream_sys"; //

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((er: any) => console.error("MongoDB connection error:"));

export default mongoose;
