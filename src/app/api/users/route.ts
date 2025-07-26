import handleError from "@/lib/handlers/error";
import { ApiErrorResponse } from "../../../../types/global";
import dbConnect from "@/lib/mongoose";
import User from "@/database/user.model";
import { NextRequest, NextResponse } from "next/server";
import logger from "@/lib/logger";
import { UserSchema } from "@/lib/validations";
import { ValidationError } from "@/lib/http-errors";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find();
    return NextResponse.json(
      {
        success: true,
        data: users,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const validatedUser = UserSchema.safeParse(body);
    if (!validatedUser.success) {
      throw new ValidationError(validatedUser.error.flatten().fieldErrors);
    }
    const { username, email } = validatedUser.data;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      throw new Error("Email already exists");
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      throw new Error("Username already exists");
    }

    const newUser = await User.create(validatedUser.data);
    return NextResponse.json(
      {
        success: true,
        data: newUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
