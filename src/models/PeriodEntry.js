const mongoose = require("mongoose");

const PeriodEntrySchema = new mongoose.Schema(
  {
    uid:          { type: String, required: true, index: true },
    startDate:    { type: String, required: true },
    cycleLength:  { type: Number, default: 28 },
    periodLength: { type: Number, default: 5 },
    symptoms: {
      mood:   { type: String, default: "" },
      flow:   { type: String, default: "" },
      cramps: { type: String, default: "" },
      notes:  { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PeriodEntry", PeriodEntrySchema);
