import mongoose from "../../database/mongo";
const Category = require("..//../models/Category");

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
