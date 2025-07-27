import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { ForbiddenError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";
import { NextResponse, NextRequest } from "next/server";
import { ApiErrorResponse } from "../../../../types/global";

export async function GET() {
  try {
    await dbConnect();
    const accounts = await Account.find();
    return NextResponse.json(
      {
        success: true,
        data: accounts,
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
    const validatedAccount = AccountSchema.safeParse(body);
    if (!validatedAccount.success) {
      throw new ValidationError(validatedAccount.error.flatten().fieldErrors);
    }

    const existingAccount = await Account.findOne({
      provider: validatedAccount.data.provider,
      providerAccountId: validatedAccount.data.providerAccountId,
    });
    if (existingAccount) {
      throw new ForbiddenError("Account already exists for the provider");
    }

    const newAccount = await Account.create(validatedAccount.data);

    return NextResponse.json(
      {
        success: true,
        data: newAccount,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
