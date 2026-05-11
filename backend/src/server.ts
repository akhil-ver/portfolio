import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "portfolio-backend",
    timestamp: new Date().toISOString(),
    database: "removed",
  });
});

app.get("/api/profile", (_req, res) => {
  res.json({
    ok: true,
    name: "Akhil Verma",
    role: "Software Development Engineer Portfolio",
    status: "active",
  });
});

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
