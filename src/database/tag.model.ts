import { models, model, Schema, Types, Document } from "mongoose";

interface ITag {
  name: string;
  questions: number;
}
export interface ITagDocument extends ITag, Document {}

const TagSchema = new Schema<ITag>(
  {
    name: { type: String, required: true },
    questions: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Tag = models?.Tag || model<ITag>("Tag", TagSchema);

export default Tag;
