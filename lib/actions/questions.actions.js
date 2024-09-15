"use server";
import Question from "../../database/question.models";
import Tag from "../../database/tag.models";
import User from "../../database/user.models";
import { connectToDatabase } from "./ConnectToDB";
import { revalidatePath } from "next/cache";

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

export async function upVoteQuestion(params) {
  try {
    const { userId, questionId, hasUpVoted, hasDownVoted, path } = params;

    let updateQuery = [];
    if (hasUpVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasDownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });
    if (!question) {
      throw new Error("Question not found.");
    }
    // TODO: increase autor reputation by 10+
    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function downVoteQuestion(params) {
  try {
    const { userId, questionId, hasUpVoted, hasDownVoted, path } = params;
    console.log("Q-id: ", questionId);
    console.log("U-id: ", userId);

    let updateQuery = [];
    if (hasUpVoted) {
      updateQuery = {
        $push: { downvotes: userId },
        $pull: { upvotes: userId },
      };
    } else if (hasDownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });
    if (!question) {
      throw new Error("Question not found.");
    }
    // TODO: decrease autor reputation by 10+
    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getSavedQuestions({ clerkId }) {
  try {
    connectToDatabase();
    const questions = await User.findOne({ clerkId }).populate({
      path: "saved",
      options: {
        sort: {
          createdAt: -1,
        },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });
    return questions.saved;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
