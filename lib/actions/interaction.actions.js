"use server";
import Question from "@/database/question.models";
import { connectToDatabase } from "./ConnectToDB";
import Interaction from "@/database/interaction.models";
import { revalidatePath } from "next/cache";

export async function ViewQuestion(params) {
  try {
    const { userId, questionId, path } = params;

    if (questionId === undefined) return console.log("Question id not valid");

    await connectToDatabase();

    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });
    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });
      if (existingInteraction) return console.log("user already interacted.");

      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
    revalidatePath(path, "page");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
