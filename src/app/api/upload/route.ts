import { NextResponse } from "next/server";
import {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({
  credentials: {
    accessKeyId: String(process.env.AWS_ACCESSKEYID),
    secretAccessKey: String(process.env.AWS_SECRETACCESSKEY),
  },
  region: String(process.env.AWS_REGION),
});
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Archivo no encontrado" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${uuidv4()}-${file.name}`;

    const uploadParams = {
      Bucket: String(process.env.AWS_S3_BUCKET_NAME),
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read" as ObjectCannedACL,
    };

    await s3.send(new PutObjectCommand(uploadParams));
    const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    return NextResponse.json({ url: imageUrl }, { status: 201 });
  } catch (error) {
    console.error("Error al subir:", error);
    return NextResponse.json(
      { error: "Error al subir la imagen" },
      { status: 500 }
    );
  }
}
