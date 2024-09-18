"use server";
import mongoose from "mongoose";
let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGO_URL) {
    return;
  }
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "devflow",
    });
    isConnected = true;
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }
};
