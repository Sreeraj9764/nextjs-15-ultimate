import handleError from "@/lib/handlers/error";
import { ApiErrorResponse } from "../../../../types/global";
import dbConnect from "@/lib/mongoose";
import User from "@/database/user.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const users = User.find();
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
