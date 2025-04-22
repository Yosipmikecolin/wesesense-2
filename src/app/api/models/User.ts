import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    nit: String,
    perfil: String,
    status: String,
    email: String,
    phone: String,
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
