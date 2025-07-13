import tickets from "@/app/database";
import { NextResponse } from "next/server";
import { type } from "os";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let ticket = tickets.find((ticket) => ticket.id.toString() === id);
  return NextResponse.json({ success: true, ticket });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { name, status, type } = await request.json();
  let ticket = tickets.find((ticket) => ticket.id.toString() === id);
  if (!ticket) {
    return NextResponse.json(new Error("Ticket not found"), { status: 404 });
  }
  if (name) ticket.name = name;
  if (status) ticket.status = status;
  if (type) ticket.type = type;
  const index = tickets.findIndex((ticket) => ticket.id.toString() === id);
  tickets[index] = ticket;
  return NextResponse.json({ success: true, ticket });
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let ticket = tickets.find((ticket) => ticket.id.toString() === id);
  if (!ticket) {
    return NextResponse.json(new Error("Ticket not found"), { status: 404 });
  }
  const index = tickets.findIndex((ticket) => ticket.id.toString() === id);
  if (index !== -1)
    NextResponse.json(new Error("Ticket not found"), { status: 404 });
  tickets.slice(index, 1);
  return NextResponse.json({ success: true, ticket });
}
