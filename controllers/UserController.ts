import User from "../models/User";

export async function createUser(data: any) {
  return await User.create(data);
}

export async function updateUser(id: string, data: any) {
  return await User.findByIdAndUpdate(id, data, { new: true });
}
