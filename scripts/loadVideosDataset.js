// Script para popular coleção de vídeos

db = db.getSiblingDB("streaming");
db.videos.drop();
db.videos.insertMany([
  { title: "Filme A", description: "Ação", category: "Ação", url: "urlA", releaseDate: new Date("2022-01-01") },
  { title: "Filme B", description: "Comédia", category: "Comédia", url: "urlB", releaseDate: new Date("2022-02-01") }
]);
