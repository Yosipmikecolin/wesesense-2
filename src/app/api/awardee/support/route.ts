import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { AwardeeSupport } from "../../models/Awardee";

export async function GET() {
  await connectDB();
  const awardees = await AwardeeSupport.find();
  return NextResponse.json(awardees);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newAwardee = await AwardeeSupport.create(body);
  return NextResponse.json(newAwardee, { status: 201 });
}

export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();
  const data = {
    ticketId: body.ticketId,
    openingDate: body.openingDate,
    issueType: body.issueType,
    issueDescription: body.issueDescription,
    actionsTaken: body.actionsTaken,
    ticketStatus: body.ticketStatus,
  };

  const updatedAwardee = await AwardeeSupport.updateOne(
    { _id: body._id },
    { finished: "Si", status: "Cerrado" }
  );
  return NextResponse.json(updatedAwardee, { status: 201 });
}

export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "";
  const deletedAwardee = await AwardeeSupport.deleteOne({ _id: id });
  return NextResponse.json(deletedAwardee, { status: 201 });
}
