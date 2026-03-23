import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "";

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

export default app;