"use server";
import { revalidatePath } from "next/cache";
import Question from "../../database/question.models";
import Tag from "../../database/tag.models";
import { connectToDatabase } from "./ConnectToDB";

export const PostQuestion = async ({
  title,
  explanation,
  tags,
  author,
  path,
}) => {
  try {
    await connectToDatabase();
    const question = await Question.create({
      title,
      explanation,
      author,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, "i") },
        },
        {
          $setOnInsert: { name: tag },
          $push: { questions: question._id },
        },
        {
          upsert: true,
          new: true,
        }
      );
      tagDocuments.push(existingTag._id);
    }
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });
  } catch (e) {}
};
