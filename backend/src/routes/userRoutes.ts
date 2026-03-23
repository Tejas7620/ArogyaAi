import express, { Request, Response } from "express";
import User from "../models/User";

const router = express.Router();

router.post("/sync", async (req: Request, res: Response) => {
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

router.get("/:firebaseUid", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
