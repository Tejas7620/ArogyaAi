const mongoose = require("mongoose");

const VaccinationLogSchema = new mongoose.Schema(
  {
    uid:      { type: String, required: true, index: true },
    category: { type: String, enum: ["Mother", "Child"], required: true },
    vaccines: [
      {
        name:          String,
        scheduledDate: String,
        status:        { type: String, enum: ["done", "due", "upcoming"], default: "upcoming" },
        takenDate:     String,
        notes:         String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("VaccinationLog", VaccinationLogSchema);
