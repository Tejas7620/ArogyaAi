const express = require("express");
const router = express.Router();
const PregnancyData = require("../src/models/PregnancyData");
const verifyUser = require("../src/middleware/verifyUser");

// POST /api/pregnancy
router.post("/", verifyUser, async (req, res) => {
  try {
    const data = new PregnancyData({ uid: req.uid, ...req.body });
    await data.save();
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/pregnancy
router.get("/", verifyUser, async (req, res) => {
  try {
    const data = await PregnancyData
      .findOne({ uid: req.uid })
      .sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
