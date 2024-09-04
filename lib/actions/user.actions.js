"use server";
import { revalidatePath } from "next/cache";
import Question from "../../database/question.models";
import Tag from "../../database/tag.models";
import User from "../../database/user.models";
import { connectToDatabase } from "./ConnectToDB";

export async function getUserById({ userId }) {
  try {
    connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestions() {
  try {
    await connectToDatabase();

    const questions = await Question.find({})
      .populate({ path: "author", model: User })
      .populate({ path: "tags", model: Tag });
    return questions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(params) {
  try {
    connectToDatabase();

    const user = await User.create(params);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params) {
  try {
    connectToDatabase();
    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params) {
  try {
    connectToDatabase();
    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });
    // if (!user) throw new Error("User not found");
    // TODO use ids to delete other associated data sych as comments tags and answers
    // const userQuestionsIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );

    await Question.deleteMany({ author: user._id });
    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
