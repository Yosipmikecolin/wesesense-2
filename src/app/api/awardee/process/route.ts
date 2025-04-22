import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { AwardeeProcess } from "../../models/Awardee";
import { getDate } from "@/functions";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const _METHOD = searchParams.get("method") || "";

  if (_METHOD === "get.approved") {
    const awardees = await AwardeeProcess.find({ status: { $eq: "Aceptado" } });
    return NextResponse.json(awardees);
  }
  if (_METHOD === "get.all") {
    const awardees = await AwardeeProcess.find({ status: { $ne: "Aceptado" } });
    return NextResponse.json(awardees);
  }
  if (_METHOD === "get.all.master") {
    const awardees = await AwardeeProcess.find();
    return NextResponse.json(awardees);
  }

  if (_METHOD === "get.instalacion") {
    const awardees = await AwardeeProcess.find({
      type_resolution: { $eq: "Instalación" },
      status: { $eq: "Aceptado" },
    });
    return NextResponse.json(awardees);
  }
  if (_METHOD === "get.prorroga") {
    const awardees = await AwardeeProcess.find({
      type_resolution: { $eq: "Prorroga / Extensión" },
      status: { $eq: "Aceptado" },
    });
    return NextResponse.json(awardees);
  }
  if (_METHOD === "get.cese_control") {
    const awardees = await AwardeeProcess.find({
      type_resolution: { $eq: "Cese de control" },
      status: { $eq: "Aceptado" },
    });
    return NextResponse.json(awardees);
  }
  if (_METHOD === "get.cambio_domicilio") {
    const awardees = await AwardeeProcess.find({
      type_resolution: { $eq: "Cambio de domicilio" },
      status: { $eq: "Aceptado" },
    });
    return NextResponse.json(awardees);
  }
  if (_METHOD === "get.informe") {
    const awardees = await AwardeeProcess.find({
      type_resolution: { $eq: "Solicita informe de control" },
      status: { $eq: "Aceptado" },
    });
    return NextResponse.json(awardees);
  }
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  body["date"] = new Date().toLocaleDateString();
  body["date_limit"] = getISODate(body.date_limit);
  const newAwardee = await AwardeeProcess.create(body);
  return NextResponse.json(newAwardee, { status: 201 });
}

function getISODate(date: string) {
  const fecha = new Date(date);
  return fecha.toLocaleDateString();
}

export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();
  const _METHOD = body.method;
  if (_METHOD === "update.process") {
    const updatedAwardee = await AwardeeProcess.updateOne(
      { _id: body._id },
      {
        status: body.status,
        denied_note: body.denied,
        approved_note: body.approved,
      }
    );
    return NextResponse.json(updatedAwardee, { status: 201 });
  }
  if (_METHOD === "update.resolution") {
    const updatedAwardee = await AwardeeProcess.updateOne(
      { _id: body._id },
      { resolution: body.resolution }
    );
    return NextResponse.json(updatedAwardee, { status: 201 });
  }
}

export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "";
  const deletedAwardee = await AwardeeProcess.deleteOne({ _id: id });
  return NextResponse.json(deletedAwardee, { status: 201 });
}
