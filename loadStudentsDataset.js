db = db.getSiblingDB("students");
db.studentsDetails.drop();
db.studentsDetails.insertMany([
  { "name": "João" , "age": 20, "favoriteSinger": "Sushi", "grade": 7.5, "university": "UFPE" },
  { "name": "Maria", "age": 22, "favoriteFood": "Sushi", "grade": 8.2, "university": "UFPE" },
  { "name": "Pedro", "age": 19, "favoriteFood": "Pizza", "grade": 6.8, "university": "UFPE" },
  { "name": "Ana"  , "age": 21, "favoriteFood": "Pizza", "grade": 9.1, "university": "UFBA" },
  { "name": "Lucas" , "age": 20, "favoriteFood": "Sushi", "grade": 7.0, "university": "UFPE" },
  { "name": "Mariana", "age": 23, "favoriteFood": "Sushi", "grade": 8.7, "university": "UFPE" },
  { "name": "Fernando", "age": 21, "favoriteFood": "Pizza", "grade": 9.4, "university": "UFPE" },
  { "name": "Beatriz"  , "age": 20, "favoriteFood": "Pizza", "grade": 8.1, "university": "UFBA" },
  { "name": "Gabriel" , "age": 22, "favoriteFood": "Pizza", "grade": 7.8, "university": "UFPE" },
  { "name": "Larissa", "age": 19, "favoriteFood": "Pizza", "grade": 8.5, "university": "UFPE" }
]);