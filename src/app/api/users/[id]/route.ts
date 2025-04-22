import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "../../models/User";



export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const body = await req.json();
  const { id } = await params; // Await params to get the id
  const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
  if (!updatedUser) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  return NextResponse.json(updatedUser);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params; // Await params to get the id
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  return NextResponse.json({ message: "Usuario eliminado" });
}