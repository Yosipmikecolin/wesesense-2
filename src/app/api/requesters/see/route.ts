import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requesters } from "@/utils";
import { Requester } from "../../models/Requester";

export async function GET() {
  await connectDB();

  try {
    const inserted = await Requester.insertMany(requesters);
    return NextResponse.json({
      message: "Requirentes migrados",
      data: inserted,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al migrar requirentes", details: error },
      { status: 500 }
    );
  }
}
