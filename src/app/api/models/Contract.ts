import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema(
  {
    contractual_obligation: String,
    file_name: String,
    file_url: String,
    notes: String,
    relation: String,
    status: String,
  },
  { timestamps: true }
);

export const Contract =
  mongoose.models.Contract || mongoose.model("Contract", ContractSchema);

/** --------------------------------------------------------------------- */

const DevicesSchema = new mongoose.Schema(
  {
    region: String,
    smart_tack: Number,
    charger_obc: Number,
    adapter_obd: Number,
    beacon: Number,
    victim_device: Number,
    victim_charger: Number,
    notes: String,
  },
  { timestamps: true }
);

export const Devices =
  mongoose.models.Devices || mongoose.model("Devices", DevicesSchema);
