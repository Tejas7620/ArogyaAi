const express = require("express");
const router = express.Router();
const RiskAssessment = require("../src/models/RiskAssessment");
const verifyUser = require("../src/middleware/verifyUser");

// POST /api/risk
router.post("/", verifyUser, async (req, res) => {
  try {
    const assessment = new RiskAssessment({ uid: req.uid, ...req.body });
    await assessment.save();
    res.status(201).json({ success: true, data: assessment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/risk
router.get("/", verifyUser, async (req, res) => {
  try {
    const assessments = await RiskAssessment
      .find({ uid: req.uid })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: assessments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
