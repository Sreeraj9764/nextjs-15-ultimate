import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import { SignInSchemaWithOauthSchema } from "@/lib/validations";
import { ApiErrorResponse } from "../../../../../types/global";
import dbConnect from "@/lib/mongoose";
import mongoose from "mongoose";
import slugify from "slugify";
import User from "@/database/user.model";
import Account from "@/database/account.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { provider, providerAccountId, user } = await request.json();
  await dbConnect();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const validatedData = SignInSchemaWithOauthSchema.safeParse({
      provider,
      providerAccountId,
      user,
    });

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }
    const { name, email, username, image } = user;

    const slugifyUsername = slugify(username, {
      lower: true,
      strict: true,
      trim: true,
    });

    let existingUser = await mongoose
      .model("User")
      .findOne({ email })
      .session(session);
    if (!existingUser) {
      existingUser = await User.create(
        {
          name,
          email,
          username: slugifyUsername,
          image,
        },
        { session }
      );
    } else {
      const updatedData: { name?: string; image?: string } = {};
      if (existingUser.name !== name) {
        updatedData.name = name;
      }
      if (existingUser.image !== image) {
        updatedData.image = image;
      }
      if (Object.keys(updatedData).length > 0) {
        existingUser = await User.findByIdAndUpdate(
          {
            _id: existingUser._id,
          },
          {
            $set: updatedData,
          }
        ).session(session);
      }
    }

    const existingAccount = await Account.findOne({
      provider,
      providerAccountId,
      userId: existingUser._id,
    }).session(session);
    if (!existingAccount) {
      await Account.create(
        [
          {
            userId: existingUser._id,
            name,
            image,
            provider,
            providerAccountId,
          },
        ],
        { session }
      );
    }
    await session.commitTransaction();
    return NextResponse.json({
      success: true,
      message: "Sign in successful",
    });
  } catch (error) {
    await session.abortTransaction();
    return handleError(error, "api") as ApiErrorResponse;
  } finally {
    session.endSession();
  }
}
