import { models, model, Schema, Types, Document } from "mongoose";

interface ITagQuestion {
  question: Types.ObjectId;
  tag: Types.ObjectId;
}
export interface ITagQuestionDocument extends ITagQuestion, Document {}

const TagQuestionSchema = new Schema<ITagQuestion>(
  {
    question: { type: Schema.Types.ObjectId, required: true, ref: "Question" },
    tag: { type: Schema.Types.ObjectId, required: true, ref: "Tag" },
  },
  {
    timestamps: true,
  }
);

const TagQuestion =
  models?.TagQuestion || model<ITagQuestion>("TagQuestion", TagQuestionSchema);

export default TagQuestion;
