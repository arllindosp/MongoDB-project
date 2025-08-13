import Instructor from "../models/Instructor";

export async function createInstructor(data: any) {
  return await Instructor.create(data);
}

export async function updateInstructor(id: string, data: any) {
  return await Instructor.findByIdAndUpdate(id, data, { new: true });
}
