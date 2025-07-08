import { models, model, Schema, Types, Document } from "mongoose";

interface ICollection {
  author: Types.ObjectId;
  question: Types.ObjectId;
}
export interface ICollectionDocument extends ICollection, Document {}

const CollectionSchema = new Schema<ICollection>(
  {
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
