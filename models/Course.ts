import mongoose from "../database/mongo";
// Modelo de vídeo para sistema de streaming
const languages = ["Português", "Inglês", "Espanhol", "Francês", "Alemão"];
const levels = ["beginner", "intermediate", "advanced"];

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  language: {
    type: String,
    enum: languages,
  },
  price: Number,
  thumbnail: String,
  level: {
    type: String,
    enum: levels,
  },
  certificates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Certificate" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  instructorId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
    },
  ],
  playlistId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
  ratingAverage: Number,
  published: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  publishedAt: { type: Date, default: Date.now },
  url: String,
  releaseDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", courseSchema);
