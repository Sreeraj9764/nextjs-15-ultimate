import { models, model, Schema, Types } from "mongoose";

interface IVote {
  author: Types.ObjectId;
  id: Types.ObjectId;
  type: "answer" | "question";
  voteType: "upvote" | "downvote";
}

const VoteSchema = new Schema<IVote>(
  {
    author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    id: { type: Schema.Types.ObjectId, refPath: "type", required: true },
    type: { type: String, enum: ["answer", "question"], required: true },
    voteType: { type: String, enum: ["upvote", "downvote"], required: true },
  },
  {
    timestamps: true,
  }
);

const Vote = models?.Vote || model<IVote>("Vote", VoteSchema);

export default Vote;
