import mongoose from "mongoose";

export const Step1Schema = new mongoose.Schema({
  fullName: String,
  socialName: String,
  sex: String,
  paternalSurname: String,
  motherSurname: String,
  type_current: String,
  gender: String,
  dateBirth: String,
  maritalStatus: String,
  nationality: String,
  run: String,
  phone: String,
  foreigner: Boolean,
  start_tagging_time: Date,
  end_tagging_time: Date,
});

export const Step2Schema = new mongoose.Schema({
  crs: String,
  penatype: String,
  crime: String,
  courtAppeals: String,
  courtRegion: String,
  court: String,
  ruc: String,
  rit: String,
  rol: String,
});

export const Step3Schema = new mongoose.Schema({
  areas: String,
  durationMeasurement: String,
  controlSchedule: String,
  effectivePeriod: String,
  requestsFeasibility: String,
  judgment: String,
  programmingInstallation: String,
  installationsDone: String,
  modificationResolution: String,
  technicalSupports: String,
  nonReports: String,
  daysControl: String,
  uninstallations: String,
});

export const Step4Schema = new mongoose.Schema({
  street: String,
  number: String,
  additionalInformation: String,
  commune: String,
  region: String,
  road: String,
  population: String,
  zipCode: String,
  geographicCoordinates: String,
  radio: String,
  complianceSchedule: String,
  characteristics: String,
});

export const Step5Schema = new mongoose.Schema({
  street: String,
  number: String,
  additionalInformation: String,
  commune: String,
  region: String,
  road: String,
  population: String,
  zipCode: String,
  geographicCoordinates: String,
  radio: String,
  characteristics: String,
  paternalSurname: String,
  motherSurname: String,
  names: String,
  rut: String,
  victimEmail: String,
  homeTelephone: String,
  workplaceTelephone: String,
});

const CarrierSchema = new mongoose.Schema(
  {
    personalData: Step1Schema,
    cause: Step2Schema,
    monitoring: Step3Schema,
    inclusionArea: Step4Schema,
    exclusionArea: Step5Schema,
  },
  { timestamps: true }
);

export const Carrier =
  mongoose.models.Carrier || mongoose.model("Carrier", CarrierSchema);
