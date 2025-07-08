import { models, model, Schema, Types } from "mongoose";

interface ICollection {
  id: Types.ObjectId;
  author: Types.ObjectId;
  question: Types.ObjectId;
}

const CollectionSchema = new Schema<ICollection>(
  {
    id: { type: Schema.Types.ObjectId, refPath: "type", required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    question: { type: Schema.Types.ObjectId, required: true, ref: "Question" },
  },
  {
    timestamps: true,
  }
);

const Collection =
  models?.Collection || model<ICollection>("Collection", CollectionSchema);

export default Collection;
