import { models, model, Schema, Types } from "mongoose";

interface ITagQuestion {
  id: Types.ObjectId;
  question: Types.ObjectId;
  tag: Types.ObjectId;
}

const TagQuestionSchema = new Schema<ITagQuestion>(
  {
    id: { type: Schema.Types.ObjectId, required: true },
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
