import { models, model, Schema, Types } from "mongoose";

interface IQuestion {
  id: Types.ObjectId;
  author: Types.ObjectId;
  title: string;
  content: string;
  tags: Types.ObjectId[];
  answers: number;
  views: number;
  upvotes: number;
  downvotes: number;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    id: { type: Schema.Types.ObjectId, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [Schema.Types.ObjectId], required: true, ref: "Tag" },
    answers: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Question =
  models?.Question || model<IQuestion>("Question", QuestionSchema);

export default Question;
