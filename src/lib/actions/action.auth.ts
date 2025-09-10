import { ActionResponse, ErrorResponse } from "../../../types/global";
import { SignUpSchema } from "../validations";
import { Action } from "../handlers/action";
import handleError from "../handlers/error";
import mongoose from "mongoose";
import User, { IUser, IUserDocument } from "@/database/user.model";
import bcrypt from "bcryptjs";
import Account from "@/database/account.model";
import { signIn } from "@/auth";

export async function signUpWithCredentials(
  params: AuthCredentials
): Promise<ActionResponse> {
  const validationResult = await Action({
    params,
    schema: SignUpSchema,
  });

  if (validationResult instanceof Error) {
    handleError(validationResult) as ErrorResponse;
  }

  const { name, email, password, username } = validationResult!.params;

  const session = await mongoose.startSession();
  session.startTransaction();

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
    )) as IUserDocument[];

    await Account.create(
      {
        userId: newUser._id,
        type: "credentials",
        provider: "credentials",
        providerAccountId: email,
        password: hachedPassword,
      },
      { session }
    );
    await signIn("credential", { email, password, redirect: false });

    await session.commitTransaction();
    return { success: true };
  } catch (error) {
    session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}
