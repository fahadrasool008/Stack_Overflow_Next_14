import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const AnswerSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  content: { type: String, required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createAt: { type: Date, default: Date.now },
});

const Answer = models.Answer || model("Answer", AnswerSchema);
export default Answer;
