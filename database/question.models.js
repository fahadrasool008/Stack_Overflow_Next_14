import { model, models, Schema } from "mongoose";

const QuestionSchema = new Schema({
  title: { type: String, required: true },
  explanation: { type: String, required: true },
  views: { type: Number, default: 0 },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  createdAt: { type: Date, default: Date.now },
});

const Question = models.Question || model("Question", QuestionSchema);

export default Question;
