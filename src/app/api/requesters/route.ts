import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Requester } from "../models/Requester";

export async function GET() {
  await connectDB();
  const requester = await Requester.find();
  return NextResponse.json(requester);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newUser = await Requester.create(body);
  return NextResponse.json(newUser, { status: 201 });
}
