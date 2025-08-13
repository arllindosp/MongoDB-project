import mongoose from "../database/mongo";

const certificateSchema = new mongoose.Schema({
  certificateId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  issueDate: { type: Date, default: Date.now },
  certificateUrl: String,
  status: {
    type: String,
    enum: ["issued", "revoked", "pending"],
    default: "issued",
  },
});

module.exports = mongoose.model("Certificate", certificateSchema);
