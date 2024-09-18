import Answer from "@/database/answer.models";
import { connectToDatabase } from "./ConnectToDB";
import User from "@/database/user.models";
import Question from "@/database/question.models";
import Tag from "@/database/tag.models";

export async function getUserInfo({ userId }) {
  try {
    connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    let totalQuestions = 0;
    let totalAnswerrs = 0;
    if (user) {
      totalQuestions = await Question.countDocuments({ author: user._id });
      totalAnswerrs = await Answer.countDocuments({ author: user._id });
    }
    return {
      user,
      totalQuestions,
      totalAnswerrs,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getProfileQuestions({ userId }) {
  try {
    await connectToDatabase();
    const questions = await Question.find({ author: userId })
      .sort({ views: -1, upvotes: -1 })
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });
    return questions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getProfileAnswers({ userId }) {
  try {
    await connectToDatabase();
    const answers = await Answer.find({ author: userId })
      .sort({ views: -1, upvotes: -1 })
      .populate({ path: "question", model: Question, select: "_id title" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });
    return answers;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
