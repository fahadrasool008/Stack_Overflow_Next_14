"use server";
import mongoose from "mongoose";
let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGO_URL) {
    return console.log("Miising Mongo Url");
  }
  if (isConnected) {
    return console.log("Already connected");
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "devflow",
    });
    isConnected = true;
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
};
