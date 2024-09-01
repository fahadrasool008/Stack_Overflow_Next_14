"use server";
import { connectToDatabase } from "./ConnectToDB";

export const PostQuestion = async () => {
  await connectToDatabase();
};
