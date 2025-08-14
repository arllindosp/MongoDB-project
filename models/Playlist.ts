import mongoose from "../database/mongo";
const statuses = [
  "active",
  "inactive",
  "suspended",
  "completed",
  "pending",
  "not_completed",
];

const playlistSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  isPublic: { type: Boolean, default: false },
  status: {
    type: String,
    enum: statuses,
    default: "active",
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Playlist = mongoose.model("Playlist", playlistSchema);
export default Playlist;
