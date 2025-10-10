"use server";

import Question from "@/database/question.model";
import { ActionResponse, ErrorResponse } from "../../../types/global";
import action from "../handlers/action";
import handleError from "../handlers/error";
import { AskQuestionSchema } from "../validations";
import mongoose from "mongoose";
import Tag from "@/database/tag.model";
import TagQuestion, {
  ITagQuestionDocument,
} from "@/database/tag-question.model";

export async function createQuestion(
  params: createQuestionParams
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: AskQuestionSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { title, content, tags } = validationResult.params!;

  const userId = validationResult.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [question] = await Question.create(
      [{ author: userId, title, content }],
      { session }
    );

    const tagIds: mongoose.Types.ObjectId[] = [];
    const tagQuestionDocuments: Array<{
      questionId: mongoose.Types.ObjectId;
      tagId: mongoose.Types.ObjectId;
    }> = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $inc: { questions: 1 } },
        { upsert: true, new: true, session }
      );

      tagIds.push(existingTag._id);
      tagQuestionDocuments.push({
        questionId: question._id,
        tagId: existingTag._id,
      });
    }

    await TagQuestion.insertMany(tagQuestionDocuments, { session });
    await Question.findByIdAndUpdate(
      question._id,
      { $push: { tags: { $each: tagIds } } },
      { session }
    );

    await session.commitTransaction();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(question)),
      status: 201,
    };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}
