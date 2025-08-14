import mongoose from "../../database/mongo";
import Category from "../../models/Category";

const categories = [
  {
    name: "TI/Programação",
    description: "Tecnologia da Informação e Programação",
    subcategories: [
      {
        name: "Data Science",
        description: "Ciência de Dados e Machine Learning",
      },
      {
        name: "Desenvolvimento de Software",
        description: "Engenharia e desenvolvimento de sistemas",
      },
      { name: "JavaScript", description: "Linguagem JavaScript e frameworks" },
      { name: "Node.js", description: "Desenvolvimento backend com Node.js" },
      { name: "APIs REST", description: "Desenvolvimento de APIs RESTful" },
    ],
  },
  {
    name: "Matemática e Estatística",
    description: "Matemática aplicada, estatística e finanças",
    subcategories: [
      {
        name: "Matemática Financeira",
        description: "Finanças e cálculos financeiros",
      },
      {
        name: "Estatística",
        description: "Fundamentos e aplicações estatísticas",
      },
      { name: "Cálculo", description: "Cálculo diferencial e integral" },
    ],
  },
  {
    name: "Ciências Exatas e Engenharia",
    description: "Física, química, engenharia e áreas correlatas",
    subcategories: [
      {
        name: "Física Experimental",
        description: "Laboratório e experimentos em física",
      },
      { name: "Engenharia", description: "Disciplinas de engenharia" },
      {
        name: "Mecânica dos Materiais",
        description: "Materiais e resistência",
      },
      { name: "Química Orgânica", description: "Química orgânica estrutural" },
    ],
  },
  {
    name: "Biologia e Ciências Naturais",
    description: "Biologia, ecologia e ciências naturais",
    subcategories: [
      { name: "Biologia Celular", description: "Biologia celular e molecular" },
      { name: "Ecologia", description: "Ecologia aplicada" },
      {
        name: "Ciências Naturais",
        description: "Disciplinas gerais de ciências naturais",
      },
    ],
  },
  {
    name: "Ciências Humanas",
    description: "História, sociologia, filosofia e áreas afins",
    subcategories: [
      {
        name: "História do Brasil",
        description: "História do Brasil: Da Colônia à República",
      },
      {
        name: "Sociologia",
        description: "Sociologia contemporânea e problemas sociais",
      },
      {
        name: "Filosofia",
        description: "Introdução à filosofia e pensamento ocidental",
      },
    ],
  },
];

import Course from "../../models/Course";

async function seedCategoriesAndAssign() {
  // Remove todas as categorias existentes
  await Category.deleteMany({});
  // Insere as categorias e subcategorias
  await Category.insertMany(categories);

  // Busca todas as categorias
  const allCategories = await Category.find({});
  // Cria arrays para busca flexível por nome de categoria e subcategoria
  const categoryEntries: { name: string; _id: any }[] = [];
  const subcategoryEntries: { name: string; parentId: any }[] = [];
  allCategories.forEach((cat: any) => {
    categoryEntries.push({ name: cat.name.toLowerCase(), _id: cat._id });
    if (cat.subcategories && Array.isArray(cat.subcategories)) {
      cat.subcategories.forEach((sub: any) => {
        subcategoryEntries.push({
          name: sub.name.toLowerCase(),
          parentId: cat._id,
        });
      });
    }
  });

  // Busca todos os cursos
  const courses = await Course.find({});
  for (const course of courses) {
    let foundCategoryId = null;
    let foundSubcategory = "";
    const titleLower = course.title.toLowerCase();
    // Primeiro tenta encontrar subcategoria
    for (const sub of subcategoryEntries) {
      if (titleLower.includes(sub.name)) {
        foundCategoryId = sub.parentId;
        foundSubcategory = sub.name;
        break;
      }
    }
    // Se não achou subcategoria, tenta categoria principal
    if (!foundCategoryId) {
      for (const entry of categoryEntries) {
        if (titleLower.includes(entry.name)) {
          foundCategoryId = entry._id;
          break;
        }
      }
    }
    course.category = foundCategoryId;
    course.subcategory = foundSubcategory;
    await course.save();
  }
  console.log(
    "\x1b[32m✔ Categorias e subcategorias atribuídas aos cursos com sucesso!\x1b[0m"
  );
}

// Executa tudo automaticamente ao rodar o script
seedCategoriesAndAssign()
  .catch((err) => console.error("Erro ao inserir/atribuir categorias:", err))
  .finally(() => mongoose.connection.close());
