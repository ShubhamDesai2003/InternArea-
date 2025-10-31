import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./db.js";

import internshipRoutes from "./Routes/internshipRoutes.js";
import jobRoutes from "./Routes/jobRoutes.js";
import applicationRoutes from "./Routes/applicationRoutes.js";
import uploadRoutes from "./Routes/uploadRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// ✅ Serve static uploads
app.use("/uploads", express.static("uploads"));

// ✅ Routes
app.use("/api/internship", internshipRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/upload", uploadRoutes);

// ✅ Base test
app.get("/", (req, res) => {
  res.send("InternArea Backend is running 🚀");
});

// ✅ DB Connect + Server Start
connectDB();
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
