import { models, model, Schema, Types, Document } from "mongoose";

interface ITagQuestion {
  questionId: Types.ObjectId;
  tagId: Types.ObjectId;
}
export interface ITagQuestionDocument extends ITagQuestion, Document {}

const TagQuestionSchema = new Schema<ITagQuestion>(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
    tagId: { type: Schema.Types.ObjectId, required: true, ref: "Tag" },
  },
  {
    timestamps: true,
  }
);

const TagQuestion =
  models?.TagQuestion || model<ITagQuestion>("TagQuestion", TagQuestionSchema);

export default TagQuestion;
