const mongoose = require("mongoose");

const NutritionLogSchema = new mongoose.Schema(
  {
    uid:       { type: String, required: true, index: true },
    trimester: { type: String, enum: ["1st Trimester", "2nd Trimester", "3rd Trimester"], required: true },
    date:      { type: String, required: true },
    meals: [
      {
        mealTime: String,
        items:    [String],
        calories: Number,
      },
    ],
    waterIntake: { type: Number, default: 0 },
    notes:       { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NutritionLog", NutritionLogSchema);
