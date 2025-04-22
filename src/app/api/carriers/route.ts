import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Carrier } from "../models/Carrier";

export async function GET() {
  await connectDB();
  const users = await Carrier.find();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newUser = await Carrier.create(body);
  return NextResponse.json(newUser, { status: 201 });
}
