"use server";

import { FilterQuery } from "mongoose";
import {
  ActionResponse,
  ErrorResponse,
  PaginatedSearchParams,
  Tag,
} from "../../../types/global";
import action from "../handlers/action";
import handleError from "../handlers/error";
import { PaginatedSearchSchema } from "../validations";
import TagModel from "@/database/tag.model";

export async function getTags(
  params: PaginatedSearchParams
): Promise<ActionResponse<{ tags: Tag[]; isNext: boolean }>> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchSchema,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter } = validationResult.params!;

  const skip = (page - 1) * pageSize;
  const limit = pageSize;

  const filterQuery: FilterQuery<Tag> = {};

  if (query) {
    filterQuery.$or = [{ name: { $regex: new RegExp(query, "i") } }];
  }

  let sortCriteria: {};

  switch (filter) {
    case "popular":
      sortCriteria = { questions: -1 };
      break;
    case "recent":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "name":
      sortCriteria = { name: 1 };
      break;

    default:
      sortCriteria = { questions: -1 };
      break;
  }

  try {
    const totalTags = await TagModel.countDocuments(filterQuery);
    const tags = await TagModel.find(filterQuery)
      .lean()
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);
    const isNext = totalTags > skip + tags.length;

    return {
      success: true,
      data: {
        tags: JSON.parse(JSON.stringify(tags)),
        isNext: isNext,
      },
      status: 200,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
