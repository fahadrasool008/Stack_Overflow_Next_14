import Answer from "@/database/answer.model";
import Question from "@/database/question.models";
import { revalidatePath } from "next/cache";

const { connectToDatabase } = require("./ConnectToDB");

export async function PostAnswer(params) {
  try {
    connectToDatabase();
    const { content, author, question, path } = params;
    const newAnswer = await Answer.create({ content, author, question });
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });
    console.log(newAnswer);
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
