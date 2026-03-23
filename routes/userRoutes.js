const express = require("express");
const router  = express.Router();
const User    = require("../models/User");

// POST /api/users/sync — Sync Firebase user to MongoDB
router.post("/sync", async (req, res) => {
  try {
    const { firebaseUid, email, displayName, photoURL, provider } = req.body;

    let user = await User.findOne({ firebaseUid });

    if (user) {
      user.email = email;
      user.displayName = displayName || "";
      user.photoURL = photoURL || "";
      await user.save();
    } else {
      user = await User.create({
        firebaseUid,
        email,
        displayName: displayName || "",
        photoURL: photoURL || "",
        provider: provider || "email",
      });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Sync error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/users/:firebaseUid
router.get("/:firebaseUid", async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
