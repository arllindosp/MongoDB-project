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

const Category = mongoose.model("Category", categorySchema);
export default Category;
