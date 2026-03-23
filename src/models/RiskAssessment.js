const mongoose = require("mongoose");

const RiskAssessmentSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, index: true },
    vitals: {
      age:         Number,
      systolicBP:  Number,
      diastolicBP: Number,
      bloodSugar:  Number,
      bodyTemp:    Number,
      heartRate:   Number,
    },
    riskLevel:  { type: String, enum: ["low risk", "mid risk", "high risk"] },
    confidence: Number,
    advice:     String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("RiskAssessment", RiskAssessmentSchema);
