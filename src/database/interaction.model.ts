import { models, model, Schema, Types } from "mongoose";

interface IInteraction {
  id: Types.ObjectId;
  user: Types.ObjectId;
  action: "upvote" | "downvote" | "answer" | "comment";
  actionId: Types.ObjectId;
  actionType: "question" | "answer" | "comment";
}

const InteractionSchema = new Schema<IInteraction>(
  {
    id: { type: Schema.Types.ObjectId, refPath: "type", required: true },
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
