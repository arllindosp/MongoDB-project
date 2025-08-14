import mongoose from "../../database/mongo";
import Course from "../../models/Course";

// Query 2: Buscar todos os cursos publicados com rating acima de 4.5
async function query2() {
  const topCourses = await Course.find({
    published: true,
    ratingAverage: { $gt: 4.5 },
  });
  console.log("Cursos publicados com rating > 4.5:", topCourses);
}

query2();
