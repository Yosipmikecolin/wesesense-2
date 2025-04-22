import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requests } from "@/utils";
import { Request } from "../../models/Request";

export async function GET() {
  await connectDB();

  try {
    const inserted = await Request.insertMany(requests);
    return NextResponse.json({
      message: "Solicitudes migrados",
      data: inserted,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al migrar solicitudes", details: error },
      { status: 500 }
    );
  }
}
