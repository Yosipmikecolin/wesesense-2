import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Devices } from "../../models/Contract";

export async function GET() {
  await connectDB();
  const contracts = await Devices.find();
  return NextResponse.json(contracts);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const new_contract = await Devices.create(body);
  return NextResponse.json(new_contract, { status: 201 });
}

export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();
  const data = {
    region: body.region,
    smart_tack: body.smart_tack,
    charger_obc: body.charger_obc,
    adapter_obd: body.adapter_obd,
    beacon: body.beacon,
    victim_device: body.victim_device,
    victim_charger: body.victim_charger,
    notes: body.notes,
  };

  const updatedAwardee = await Devices.updateOne({ _id: body._id }, data);
  return NextResponse.json(updatedAwardee, { status: 201 });
}

export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "";
  const deletedAwardee = await Devices.deleteOne({ _id: id });
  return NextResponse.json(deletedAwardee, { status: 201 });
}
