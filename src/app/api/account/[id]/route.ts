import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";

import { NextRequest, NextResponse } from "next/server";
import { ApiErrorResponse } from "../../../../../types/global";
import Account from "@/database/account.model";

//GET api/account/[id]
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new NotFoundError("Account ID is required for this request");
  }
  try {
    await dbConnect();
    const account = await Account.findById(id);
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

//DELETE api/account/[id]
export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new NotFoundError("Account ID is required for this request");
  }
  try {
    await dbConnect();
    const account = await Account.findByIdAndDelete(id);
    if (!account) {
      throw new NotFoundError("Account");
    }
    return NextResponse.json(
      {
        success: true,
        message: "Account deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}

//PUT api/account/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new NotFoundError("Account ID is required for this request");
  }
  try {
    await dbConnect();
    const body = await request.json();

    const validateAccountData = AccountSchema.partial().safeParse(body);

    if (!validateAccountData.success) {
      throw new ValidationError(
        validateAccountData.error.flatten().fieldErrors
      );
    }
    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      validateAccountData.data,
      {
        new: true,
      }
    );
    if (!updatedAccount) {
      throw new NotFoundError("User");
    }
    return NextResponse.json(
      {
        success: true,
        data: updatedAccount,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
