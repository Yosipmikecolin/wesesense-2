import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Request as RequestModel } from "../../models/Request";



export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const body = await req.json();
  const { id } = await params; 
  const updatedUser = await RequestModel.findByIdAndUpdate(id, body, { new: true });
  if (!updatedUser) return NextResponse.json({ error: "Solicitud no encontrada" }, { status: 404 });
  return NextResponse.json(updatedUser);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params; 
  const deletedUser = await RequestModel.findByIdAndDelete(id);
  if (!deletedUser) return NextResponse.json({ error: "Solicitud no encontradao" }, { status: 404 });
  return NextResponse.json({ message: "Solicitud eliminada" });
}
