import Answer from "@/database/answer.model";
import Question from "@/database/question.models";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "./ConnectToDB";

export default async function createAnswer({
  content,
  author,
  question,
  path,
}) {
  try {
    connectToDatabase();
    console.log(content);

    const newAnswer = await Answer.create({ content, author, question, path });
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
