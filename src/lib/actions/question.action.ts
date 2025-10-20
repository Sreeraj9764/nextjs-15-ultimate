"use server";

import QuestionModel, {
  IQuestion,
  IQuestionDocument,
} from "@/database/question.model";
import { ActionResponse, ErrorResponse, Question } from "../../../types/global";
import action from "../handlers/action";
import handleError from "../handlers/error";
import { AskQuestionSchema, EditQuestionSchema } from "../validations";
import mongoose from "mongoose";
import Tag from "@/database/tag.model";
import TagQuestion from "@/database/tag-question.model";

export async function createQuestion(
  params: CreateQuestionParams
): Promise<ActionResponse<Question>> {
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
    const [question] = await QuestionModel.create(
      [{ title, content, author: userId }],
      { session }
    );

    if (!question) {
      throw new Error("Failed to create question");
    }

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
    await QuestionModel.findByIdAndUpdate(
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

export async function editQuestion(
  params: EditQuestionParams
): Promise<ActionResponse<IQuestionDocument>> {
  const validationResult = await action({
    params,
    schema: EditQuestionSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { title, content, tags, questionId } = validationResult.params!;

  const userId = validationResult.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const question =
      await QuestionModel.findById<IQuestionDocument>(questionId).populate(
        "tags"
      );

    if (!question) {
      throw new Error("Failed to update question");
    }

    if (question.author.toString() !== userId) {
      throw new Error("You are not authorized to edit this question");
    }
    if (question.title !== title || question.content !== content) {
      question.title = title;
      question.content = content;
      await question.save({ session });
    }

    const tagsToAdd = tags.filter(
      (tag) => !question.tags.map((t) => t.toString()).includes(tag)
    );
    const tagsToRemove = question.tags.filter(
      (tag) => !tags.includes(tag.toString())
    );

    const newTagDocs = [];
    if (tagsToAdd.length > 0) {
      for (const tag of tagsToAdd) {
        const existingTag = await Tag.findOneAndUpdate(
          { name: { $regex: new RegExp(`^${tag}$`, "i") } },
          { $setOnInsert: { name: tag }, $inc: { questions: 1 } },
          { upsert: true, new: true, session }
        );
        if (existingTag) {
          newTagDocs.push({
            questionId: question._id,
            tagId: existingTag._id,
          });
          question.tags.push(existingTag._id);
        }
      }
    }
    await TagQuestion.insertMany(newTagDocs, { session });

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
