import mongoose from "mongoose";

const RequesterSchema = new mongoose.Schema(
  {
    fullName: String,
    lastName: String,
    middleName: String,
    email: String,
    run: String,
    phone: String,
    userType: String,
    institution: String,
    identificationNumber: String,
    region: String,
    address: String,
    accessAreas: String,
    identityVerification: String,
    securityQuestion: String,
    registrationDate: String,
    observations: String,
  },
  { timestamps: true }
);

export const Requester =
  mongoose.models.Requester || mongoose.model("Requester", RequesterSchema);
