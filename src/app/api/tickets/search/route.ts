import tickets from "@/app/database";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  if (!query) {
    return new Response(JSON.stringify(tickets), { status: 200 });
  }
  const filteredTickets = tickets.filter((ticket) =>
    ticket.name.toLowerCase().includes(query.toLowerCase())
  );
  return new Response(JSON.stringify(filteredTickets), { status: 200 });
}
