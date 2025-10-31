import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./db.js";

import internshipRoutes from "./routes/internshipRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// ==============================================
// ✅ Secure & Flexible CORS Setup
// ==============================================
const allowedOrigins = [
  "http://localhost:3000",
  "https://intern-area.vercel.app",
  "https://intern-area-mg054o7np-shubhamtheboss-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS policy does not allow access from ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());

// ✅ Serve static uploads
app.use("/uploads", express.static("uploads"));

// ✅ Routes
app.use("/api/internship", internshipRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/application", applicationRoutes);

// ✅ Base test
app.get("/", (req, res) => {
  res.send("InternArea Backend is running 🚀");
});

// ✅ DB Connect + Server Start
connectDB();
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
