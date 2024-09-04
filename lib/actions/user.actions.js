"use server";
import Question from "../../database/question.models";
import Tag from "../../database/tag.models";
import User from "../../database/user.models";
import { connectToDatabase } from "./ConnectToDB";

export async function getUserById({ userId }) {
  try {
    connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestions() {
  try {
    await connectToDatabase();

    const questions = await Question.find({})
      .populate({ path: "author", model: User })
      .populate({ path: "tags", model: Tag });
    return questions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
