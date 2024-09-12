"use server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "./ConnectToDB";
import Answer from "@/database/answer.models";
import Question from "@/database/question.models";

export default async function createAnswer({
  content,
  author,
  question,
  path,
}) {
  try {
    connectToDatabase();

    const newAnswer = await Answer.create({
      content,
      author,
      question,
    });
    await Question.findByIdAndUpdate(
      { _id: question },
      {
        $push: { answers: newAnswer._id },
      }
    );
    revalidatePath(path);
    return newAnswer;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers({ questionId }) {
  try {
    connectToDatabase();

    const answersList = await Answer.find({
      question: questionId,
    })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return answersList;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upVoteAnswer(params) {
  try {
    const { userId, answerId, hasUpVoted, hasDownVoted, path } = params;

    let updateQuery = [];
    if (hasUpVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
      };
    } else if (hasDownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });
    if (!answer) {
      throw new Error("Answer not found.");
    }
    // TODO: decrease autor reputation by 10+
    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function downVoteAnswer(params) {
  try {
    const { userId, answerId, hasUpVoted, hasDownVoted, path } = params;

    let updateQuery = [];
    if (hasUpVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else if (hasDownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });
    if (!answer) {
      throw new Error("Answer not found.");
    }
    // TODO: decrease autor reputation by 10+
    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
