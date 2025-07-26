import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { ApiErrorResponse } from "../../../../../types/global";
import User from "@/database/user.model";
import { UserSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      throw new NotFoundError("Email is required for this request");
    }

    const validatedMail = UserSchema.partial().safeParse({ email });
    if (!validatedMail.success) {
      throw new ValidationError(validatedMail.error.flatten().fieldErrors);
    }
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
