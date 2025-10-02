"use server";

import { ActionResponse, ErrorResponse } from "../../../types/global";
import { SignInSchema, SignUpSchema } from "../validations";
import handleError from "../handlers/error";
import mongoose from "mongoose";
import User, { IUserDocument } from "@/database/user.model";
import bcrypt from "bcryptjs";
import Account from "@/database/account.model";
import { signIn } from "@/auth";
import action from "../handlers/action";

export async function signUpWithCredentials(
  params: AuthCredentials
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: SignUpSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { username, name, email, password } = validationResult.params!;

  const session = await mongoose.startSession();
  session.startTransaction();
  let committed = false;
  try {
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    const existingUserName = await User.findOne({ username }).session(session);
    if (existingUserName) {
      throw new Error("User with this username already exists");
    }

    const hachedPassword = await bcrypt.hash(password, 12);
    const [newUser] = (await User.create(
      [
        {
          name,
          email,
          username,
        },
      ],
      { session }
    )) as [IUserDocument];

    await Account.create(
      [
        {
          userId: newUser._id,
          name,
          provider: "credentials",
          providerAccountId: email,
          password: hachedPassword,
        },
      ],
      { session }
    );
    await session.commitTransaction();
    committed = true;
    // Auto sign in after sign up
    await signIn("credentials", { email, password, redirect: false });
    return { success: true };
  } catch (error) {
    if (!committed) {
      await session.abortTransaction();
    }
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}

export async function signInWithCredentials(
  params: Pick<AuthCredentials, "email" | "password">
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: SignInSchema,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    const { email, password } = validationResult.params!;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new Error("User with this email does not exist");
    }

    const existingAccount = await Account.findOne({
      provider: "credentials",
      providerAccountId: email,
    });

    if (!existingAccount) {
      throw new Error("No credentials account found for this email");
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingAccount.password!
    );

    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    // Sign in the user

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
