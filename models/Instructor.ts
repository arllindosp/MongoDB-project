import mongoose from "../database/mongo";

const instructorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  specialties: [String],
  rating: Number,
  totalStudents: Number,
  totalCourses: Number,
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

export default mongoose.model("Instructor", instructorSchema);
