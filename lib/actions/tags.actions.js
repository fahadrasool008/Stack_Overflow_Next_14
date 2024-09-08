import Question from "../../database/question.models";
import Tag from "../../database/tag.models";
import { connectToDatabase } from "./ConnectToDB";

export async function getAllTags() {
  try {
    connectToDatabase();
    const tags = await Tag.find({}).populate({
      path: "questions",
      model: Question,
    });
    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
