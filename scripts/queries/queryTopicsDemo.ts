// MongoDB/Mongoose update, save, renameCollection, cond, addToSet, findOne examples
import mongoose from "../../database/mongo";
import Course from "../../models/Course";

async function runExamples() {
  // UPDATEONE/UPDATEMANY
  // Usar a coleção original antes de renomear
  await Course.updateOne(
    { title: "Node.js para Iniciantes" },
    { $set: { price: 150 } }
  );
  await Course.updateMany({ level: "beginner" }, { $set: { price: 99 } });

  //  SAVE (insert or update)
  const course = await Course.findOne({ title: "Novo Curso" });
  if (course) {
    course.price = 200;
    await course.save();
  } else {
    const newCourse = new Course({
      title: "Novo Curso",
      description: "Curso novo",
      price: 200,
      language: "Inglês",
    });
    await newCourse.save();
  }

  // RENAMECOLLECTION
  // Exclui 'coursesRenamed' se já existir, evitando erro de namespace
  const collections = await mongoose.connection.db
    .listCollections({ name: "coursesRenamed" })
    .toArray();
  if (collections.length > 0) {
    await mongoose.connection.db.dropCollection("coursesRenamed");
  }
  await mongoose.connection.db.renameCollection("courses", "coursesRenamed");

  // Usar a coleção renomeada após o comando
  const CourseRenamed = mongoose.connection.model(
    "CourseRenamed",
    Course.schema,
    "coursesRenamed"
  );
  // COND (aggregation $cond)
  const condResults = await CourseRenamed.aggregate([
    {
      $project: {
        title: 1,
        priceCategory: {
          $cond: [{ $gte: ["$price", 100] }, "Expensive", "Cheap"],
        },
      },
    },
  ]);
  console.log("$cond results:", condResults);

  //FINDONE
  const foundCourse = await CourseRenamed.findOne({
    title: "Node.js para Iniciantes",
  });
  console.log("findOne result:", foundCourse);

  // ADDTOSET
  await CourseRenamed.updateOne(
    { title: "Node.js para Iniciantes" },
    { $addToSet: { certificates: new mongoose.Types.ObjectId() } }
  );
}

runExamples().catch(console.error);
