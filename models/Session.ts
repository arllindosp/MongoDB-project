import mongoose from "../database/mongo";
const subSessionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    recommended: { type: Boolean, default: false },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  },
  { _id: false }
);

const sessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  subSessions: [subSessionSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Session", sessionSchema);
