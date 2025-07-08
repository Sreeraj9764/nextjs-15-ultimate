import { models, model, Schema, Types, Document } from "mongoose";

interface IVote {
  author: Types.ObjectId;
  actionId: Types.ObjectId;
  actionType: "answer" | "question";
  voteType: "upvote" | "downvote";
}

export interface IVoteDocument extends IVote, Document {}

const VoteSchema = new Schema<IVote>(
  {
    author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    actionId: { type: Schema.Types.ObjectId, refPath: "type", required: true },
    actionType: { type: String, enum: ["answer", "question"], required: true },
    voteType: { type: String, enum: ["upvote", "downvote"], required: true },
  },
  {
    timestamps: true,
  }
);

const Vote = models?.Vote || model<IVote>("Vote", VoteSchema);

export default Vote;
