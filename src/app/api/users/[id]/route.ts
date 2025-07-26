import handleError from "@/lib/handlers/error";
import dbConnect from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { ApiErrorResponse } from "../../../../../types/global";
import User from "@/database/user.model";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import { request } from "http";
import { UserSchema } from "@/lib/validations";

//GET api/users/[id]
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new NotFoundError("User ID is required for this request");
  }
  try {
    await dbConnect();
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError("User");
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

//DELETE api/users/[id]
export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new NotFoundError("User ID is required for this request");
  }
  try {
    await dbConnect();
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundError("User");
    }
    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}

//PUT api/users/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new NotFoundError("User ID is required for this request");
  }
  try {
    await dbConnect();
    const body = await request.json();

    const validateUserData = UserSchema.partial().safeParse(body);

    if (!validateUserData.success) {
      throw new ValidationError(validateUserData.error.flatten().fieldErrors);
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      validateUserData.data,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedUser) {
      throw new NotFoundError("User");
    }
    return NextResponse.json(
      {
        success: true,
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
