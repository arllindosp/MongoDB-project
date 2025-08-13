import mongoose from "../database/mongo";

const roles = ["student", "instructor", "admin"];

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  plan: String,
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
  role: {
    type: String,
    enum: roles,
  },
  bio: String,
  socialLinks: String,
});

export default mongoose.model("User", userSchema);
