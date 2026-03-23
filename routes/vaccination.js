const express = require("express");
const router = express.Router();
const VaccinationLog = require("../src/models/VaccinationLog");
const verifyUser = require("../src/middleware/verifyUser");

// POST /api/vaccination
router.post("/", verifyUser, async (req, res) => {
  try {
    const log = new VaccinationLog({ uid: req.uid, ...req.body });
    await log.save();
    res.status(201).json({ success: true, data: log });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/vaccination
router.get("/", verifyUser, async (req, res) => {
  try {
    const logs = await VaccinationLog
      .find({ uid: req.uid })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
