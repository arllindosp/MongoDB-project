import mongoose from "../database/mongo";

const studentSchema = new mongoose.Schema({
  nome: { type: String, required: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  certificates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Certificate" }],
  progress: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
      completed: { type: Boolean, default: false },
      percentage: { type: Number, default: 0 },
      timeWatched: { type: Number, default: 0 }, // tempo assistido em minutos
      lastAccess: Date,
    },
  ],
});

export default mongoose.model("Student", studentSchema);
