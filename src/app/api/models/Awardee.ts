import mongoose from "mongoose";

const AwardeeProcessSchema = new mongoose.Schema(
  {
    date: String,
    type_law: String,
    rit: String,
    ruc: String,
    run: String,
    // document: String,
    date_limit: String,
    type_resolution: String,
    status: { type: String, default: "Sin estado" },
    denied_note: String,
    approved_note: String,
    resolution: {},
  },
  { timestamps: true }
);

export const AwardeeProcess =
  mongoose.models.AwardeeProcess ||
  mongoose.model("AwardeeProcess", AwardeeProcessSchema);

/** ---------------------------------------------------- */

const AwardeeSupportSchema = new mongoose.Schema(
  {
    adress: String,
    type_support: String,
    priority: String,
    status: { type: String, default: "Pendiente por agendar" },
    result: String,
    // window: String,
    start_date: String,
    finish_date: String,
    user_assigned: String,
    finished: { type: String, default: "No" },
    support: {},
  },
  { timestamps: true }
);

export const AwardeeSupport =
  mongoose.models.AwardeeSupport ||
  mongoose.model("AwardeeSupport", AwardeeSupportSchema);
/** ------------------------------------------------------------------ */
const AwardeeSchema = new mongoose.Schema(
  {
    type: String,
    date: Date,
    note: String,
    user: String,
  },
  { timestamps: true }
);

export const Awardee =
  mongoose.models.Awardee || mongoose.model("Awardee", AwardeeSchema);

/** ---------------------------------------------------------------- */

const AwardeeProcessMasterSchema = new mongoose.Schema(
  {
    date: String,
    type_law: String,
    rit: String,
    ruc: String,
    run: String,
    // document: String,
    date_limit: String,
    type_resolution: String,
    status: { type: String, default: "Sin estado" },
    denied_note: String,
    approved_note: String,
    resolution: {},
  },
  { timestamps: true }
);

export const AwardeeProcessMaster =
  mongoose.models.AwardeeProcessMaster ||
  mongoose.model("AwardeeProcessMaster", AwardeeProcessMasterSchema);
