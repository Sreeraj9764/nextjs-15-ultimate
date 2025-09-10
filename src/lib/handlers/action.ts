"use server";

import { ZodError, ZodSchema } from "zod";
import { UnauthorizedError, ValidationError } from "../http-errors";
import { Session } from "next-auth";
import { auth } from "@/auth";
import dbConnect from "../mongoose";

type ActionOptions<T> = {
  params?: T;
  schema?: ZodSchema<T>;
  authorize?: boolean;
};

export async function Action<T>({
  params,
  schema,
  authorize,
}: ActionOptions<T>) {
  if (schema && params) {
    schema.parse(params);
    try {
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>
        );
      }
      throw new Error("Schema validation error occurred");
    }

    let session: Session | null = null;

    if (authorize) {
      session = await auth();
      if (!session) {
        throw new UnauthorizedError("User is not authenticated");
      }
    }
    await dbConnect();
    return { params, session };
  }
}
