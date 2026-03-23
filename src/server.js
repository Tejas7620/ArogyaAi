const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("../config/db");
connectDB();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

// ✅ Correct paths
app.use("/api/period", require("../routes/period"));
app.use("/api/nutrition", require("../routes/nutrition"));
app.use("/api/pregnancy", require("../routes/pregnancy"));
app.use("/api/vaccination", require("../routes/vaccination"));
app.use("/api/risk", require("../routes/risk"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "ArogyaAI backend is live 🌸" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});