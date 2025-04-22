import mongoose from "mongoose";
import {
  Step1Schema,
  Step2Schema,
  Step3Schema,
  Step4Schema,
  Step5Schema,
} from "./Carrier";

const CarrierSchema = new mongoose.Schema({
  _id: String,
  personalData: Step1Schema,
  cause: Step2Schema,
  monitoring: Step3Schema,
  inclusionArea: Step4Schema,
  exclusionArea: Step5Schema,
});

const RequesterSchema = new mongoose.Schema({
  _id: String,
  fullName: String,
  lastName: String,
  middleName: String,
  email: String,
  ruc: String,
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
});

const RequestSchema = new mongoose.Schema(
  {
    answer: String,
    law: String,
    folio: String,
    issue_date: String,
    response_date: String,
    return_date: String,
    time_respond: String,
    status: String,
    requester: RequesterSchema,
    carrier: CarrierSchema,
    reason_revolution_requester: [
      {
        description_reason: String,
        reason_return: String,
      },
    ],
    reason_revolution_awardee: [
      {
        description_reason: String,
        reason_return: String,
      },
    ],
    awardee_response: {
      minimum_coverage: String,
      status: String,
      latitude: String,
      length: String,
      indication_aspects: String,
      value: String,
      photographic_evidence: [String],
    },
  },
  { timestamps: true }
);

export const Request =
  mongoose.models.Request || mongoose.model("Request", RequestSchema);
