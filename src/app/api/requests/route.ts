import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Request } from "../models/Request";

export async function GET() {
  await connectDB();
  const users = await Request.find();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newUser = await Request.create(body);
  return NextResponse.json(newUser, { status: 201 });
}
