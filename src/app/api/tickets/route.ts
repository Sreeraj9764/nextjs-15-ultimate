import tickets from "@/app/database";
import logger from "@/lib/logger";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ success: true, tickets: [...tickets] });
}

export async function POST(request: Request) {
  var body = await request.json();
  tickets.push(body);
  return NextResponse.json({ success: true, body: tickets });
}
