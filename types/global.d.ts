import { NextResponse } from "next/server";

interface Question {
  _id: string;
  title: string;
  description: string;
  tags: Tag[];
  author: Author;
  upvotes: int;
  answers: int;
  views: int;
  createdAt: Date;
}

interface Tag {
  _id: string;
  name: string;
}

interface Author {
  _id: string;
  name: string;
  image: string;
}

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & {
  success: true;
  error: null;
};

type ErrorResponse = ActionResponse<undefined> & {
  success: false;
};

type ApiErrorResponse = NextResponse<ErrorResponse>;
type ApiResponse<T> = NextResponse<SuccessResponse<T>> | ErrorResponse;

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}
