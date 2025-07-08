import { models, model, Schema, Types, Document } from "mongoose";

interface IQuestion {
  author: Types.ObjectId;
  title: string;
  content: string;
  tags: Types.ObjectId[];
  answers: number;
  views: number;
  upvotes: number;
  downvotes: number;
}
export interface IQuestionDocument extends IQuestion, Document {}

const QuestionSchema = new Schema<IQuestion>(
  {
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
