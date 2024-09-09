import Question from "../../database/question.models";
import Tag from "../../database/tag.models";
import User from "../../database/user.models";
import { connectToDatabase } from "./ConnectToDB";

export async function getQuestionById(id) {
  try {
    connectToDatabase();
    const question = await Question.findById(id)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });
    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
