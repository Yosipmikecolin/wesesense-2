import mongoose from "mongoose";

const user = process.env.NEXT_PUBLIC_USER;
const password = process.env.NEXT_PUBLIC_PASSWORD;
const MONGODB_URI = `mongodb+srv://${user}:${password}@cluster0.cdtmz.mongodb.net/wesense?retryWrites=true&w=majority&appName=Cluster0`;

declare global {
  var mongoose: {
    conn: typeof import("mongoose") | null;
    promise: Promise<typeof import("mongoose")> | null;
  };
}

if (!MONGODB_URI) {
  throw new Error("❌ No se ha definido la variable MONGODB_URI");
}

// Agregamos el tipo global solo si estamos en desarrollo
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "wesense",
      })
      .then((mongoose) => {
        console.log("📦 Conectado a MongoDB (wesense)");
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
