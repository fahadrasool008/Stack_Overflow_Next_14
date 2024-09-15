import User from "@/database/user.models";
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

export async function getTagQuestions({ tagId }) {
  try {
    connectToDatabase();
    const tag = await Tag.findById(tagId).populate({
      path: "questions",
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "author", model: User, select: "_id clerkId name picture " },
        { path: "tags", model: Tag, select: "_id name" },
      ],
    });
    return tag.questions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
