import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "../../models/User";
import { users } from "@/utils";

export async function GET() {
  await connectDB();

  try {
    const inserted = await User.insertMany(users);
    return NextResponse.json({ message: "Usuarios migrados", data: inserted });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al migrar usuarios", details: error },
      { status: 500 }
    );
  }
}
