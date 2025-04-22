import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Contract } from "../models/Contract";

export async function GET() {
  await connectDB();
  const contracts = await Contract.find();
  return NextResponse.json(contracts);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const new_contract = await Contract.create(body);
  return NextResponse.json(new_contract, { status: 201 });
}

export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();
  const data = {
    contractual_obligation: body.contractual_obligation,
    notes: body.notes,
    file_url: body.file_url,
    file_name: body.file_name,
    relation: body.relation,
    status: body.status,
  };

  const updatedAwardee = await Contract.updateOne({ _id: body._id }, data);
  return NextResponse.json(updatedAwardee, { status: 201 });
}

export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "";
  const deletedAwardee = await Contract.deleteOne({ _id: id });
  return NextResponse.json(deletedAwardee, { status: 201 });
}
