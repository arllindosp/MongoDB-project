const lessonStatuses = ["active", "completed", "not_completed"];
import mongoose from "../database/mongo";
const lessonSchema = new mongoose.Schema({
  title: String,
  duration: Number,
  resources: [
    {
      type: {
        type: String,
        enum: ["pdf", "slide", "link"],
      },
      name: String,
      url: String,
    },
  ],
  status: {
    type: String,
    enum: lessonStatuses,
    default: "active",
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Lesson = mongoose.model("Lesson", lessonSchema);
export default Lesson;
