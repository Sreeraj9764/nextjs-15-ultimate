import { models, model, Schema, Types, Document } from "mongoose";

interface IInteraction {
  user: Types.ObjectId;
  action: "upvote" | "downvote" | "answer" | "comment";
  actionId: Types.ObjectId;
  actionType: "question" | "answer" | "comment";
}

export interface IInteractionDocument extends IInteraction, Document {}

const InteractionSchema = new Schema<IInteraction>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: {
      type: String,
      enum: ["upvote", "downvote", "answer", "comment"],
      required: true,
    },
    actionId: {
      type: Schema.Types.ObjectId,
      refPath: "type",
      required: true,
    },
    actionType: {
      type: String,
      enum: ["question", "answer", "comment"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Interaction =
  models?.Interaction || model<IInteraction>("Interaction", InteractionSchema);

export default Interaction;
