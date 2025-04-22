import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { AwardeeProcessMaster } from "../../models/Awardee";

export async function GET(req: Request) {
  await connectDB();
  const awardees = await AwardeeProcessMaster.find();
  return NextResponse.json(awardees);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  // body["date"] = new Date().toLocaleDateString();
  // body["date_limit"] = getISODate(body.date_limit);
  const newAwardee = await AwardeeProcessMaster.create(body);
  return NextResponse.json(newAwardee, { status: 201 });
}

function getISODate(date: string) {
  const fecha = new Date(date);
  return fecha.toLocaleDateString();
}
