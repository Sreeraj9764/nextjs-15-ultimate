import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { ApiErrorResponse } from "../../../../../types/global";
import { AccountSchema } from "@/lib/validations";
import Account from "@/database/account.model";

export async function POST(request: NextRequest) {
  try {
    const { providerAccountId } = await request.json();
    if (!providerAccountId) {
      throw new NotFoundError("Provider");
    }

    const validatedProvider = AccountSchema.partial().safeParse({
      providerAccountId,
    });
    if (!validatedProvider.success) {
      throw new ValidationError(providerAccountId.error.flatten().fieldErrors);
    }

    await dbConnect();
    const account = await Account.findOne({ providerAccountId });
    if (!account) {
      throw new NotFoundError("Account");
    }
    return NextResponse.json(
      {
        success: true,
        data: account,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
