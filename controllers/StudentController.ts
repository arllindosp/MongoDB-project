import Student from "../models/Student";

export async function createStudent(data: any) {
  return await Student.create(data);
}

export async function updateStudent(id: string, data: any) {
  return await Student.findByIdAndUpdate(id, data, { new: true });
}
