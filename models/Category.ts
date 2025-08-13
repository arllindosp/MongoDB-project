import mongoose from "../database/mongo";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  subcategories: [
    {
      name: { type: String, required: true },
      description: String,
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema);
