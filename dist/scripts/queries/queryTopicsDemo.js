"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// MongoDB/Mongoose update, save, renameCollection, cond, addToSet, findOne examples
const mongo_1 = __importDefault(require("../../database/mongo"));
const Course_1 = __importDefault(require("../../models/Course"));
async function runExamples() {
    // UPDATEONE/UPDATEMANY
    // Usar a coleção original antes de renomear
    await Course_1.default.updateOne({ title: "Node.js para Iniciantes" }, { $set: { price: 150 } });
    await Course_1.default.updateMany({ level: "beginner" }, { $set: { price: 99 } });
    //  SAVE (insert or update)
    const course = await Course_1.default.findOne({ title: "Novo Curso" });
    if (course) {
        course.price = 200;
        await course.save();
    }
    else {
        const newCourse = new Course_1.default({
            title: "Novo Curso",
            description: "Curso novo",
            price: 200,
            language: "Inglês",
        });
        await newCourse.save();
    }
    // RENAMECOLLECTION
    // Exclui 'coursesRenamed' se já existir, evitando erro de namespace
    const collections = await mongo_1.default.connection.db
        .listCollections({ name: "coursesRenamed" })
        .toArray();
    if (collections.length > 0) {
        await mongo_1.default.connection.db.dropCollection("coursesRenamed");
    }
    await mongo_1.default.connection.db.renameCollection("courses", "coursesRenamed");
    // Usar a coleção renomeada após o comando
    const CourseRenamed = mongo_1.default.connection.model("CourseRenamed", Course_1.default.schema, "coursesRenamed");
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
    await CourseRenamed.updateOne({ title: "Node.js para Iniciantes" }, { $addToSet: { certificates: new mongo_1.default.Types.ObjectId() } });
}
runExamples().catch(console.error);
