const mongoose = require("mongoose");

const PregnancyDataSchema = new mongoose.Schema(
  {
    uid:         { type: String, required: true, index: true },
    currentWeek: { type: Number, min: 1, max: 40, default: 1 },
    symptoms:    [{ symptom: String, severity: String, date: String }],
    milestones:  [{ week: Number, title: String, completed: Boolean }],
    dueDate:     { type: String, default: "" },
    notes:       { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PregnancyData", PregnancyDataSchema);
