import { models, model, Schema, Types } from "mongoose";

interface ITag {
  id: Types.ObjectId;
  name: string;
  questions: number;
}

const TagSchema = new Schema<ITag>(
  {
    id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    questions: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Tag = models?.Tag || model<ITag>("Tag", TagSchema);

export default Tag;
