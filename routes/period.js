const express = require("express");
const router = express.Router();
const PeriodEntry = require("../src/models/PeriodEntry");
const verifyUser = require("../src/middleware/verifyUser");

// POST /api/period — Save new period entry
router.post("/", verifyUser, async (req, res) => {
  try {
    const entry = new PeriodEntry({ uid: req.uid, ...req.body });
    await entry.save();
    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/period — Get all entries for this user
router.get("/", verifyUser, async (req, res) => {
  try {
    const entries = await PeriodEntry
      .find({ uid: req.uid })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: entries });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
