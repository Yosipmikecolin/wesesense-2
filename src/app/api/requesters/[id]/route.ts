import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Requester } from "../../models/Requester";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params; // Await params to get the id
  const user = await Requester.findById(id);
  if (!user) return NextResponse.json({ error: "Requirentes no encontrado" }, { status: 404 });
  return NextResponse.json(user);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const body = await req.json();
  const { id } = await params; // Await params to get the id
  const updatedUser = await Requester.findByIdAndUpdate(id, body, { new: true });
  if (!updatedUser) return NextResponse.json({ error: "Requirentes no encontrado" }, { status: 404 });
  return NextResponse.json(updatedUser);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params; // Await params to get the id
  const deletedUser = await Requester.findByIdAndDelete(id);
  if (!deletedUser) return NextResponse.json({ error: "Requirentes no encontrado" }, { status: 404 });
  return NextResponse.json({ message: "Requirentes eliminado" });
}
