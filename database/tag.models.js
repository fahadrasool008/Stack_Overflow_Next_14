import { model, models, Schema } from "mongoose";

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const Tag = models.Tag || model("Tag", TagSchema);

export default Tag;
