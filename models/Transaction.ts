const transactionStatuses = ["pending", "completed", "failed"];
import mongoose from "../database/mongo";
const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  amount: Number,
  currency: String,
  paymentMethod: String,
  status: {
    type: String,
    enum: transactionStatuses,
    default: "pending",
  },
  transactionDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);
