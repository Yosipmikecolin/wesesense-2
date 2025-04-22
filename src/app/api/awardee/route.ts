import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Awardee } from "../models/Awardee";

export async function GET() {
  await connectDB();
  const awardees = await Awardee.find();
  return NextResponse.json(awardees);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newAwardee = await Awardee.create(body);
  return NextResponse.json(newAwardee, { status: 201 });
}

export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();
  const data = {
    date: body.date,
    note: body.note,
    type: body.type,
    user: body.user,
  };

  const updatedAwardee = await Awardee.updateOne({ _id: body._id }, data);
  return NextResponse.json(updatedAwardee, { status: 201 });
}

export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "";
  const deletedAwardee = await Awardee.deleteOne({ _id: id });
  return NextResponse.json(deletedAwardee, { status: 201 });
}