import express from "express";
import { Job } from "../Models/Job.js";

const router = express.Router();


// ➕ Add Job
router.post("/", async (req, res) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 📄 Get All Jobs
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 🔍 Get Job By ID
router.get("/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 🗑️ Delete Job
router.delete("/:id", async (req, res) => {
    try {
        const result = await Job.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: "Job not found" });
        res.json({ message: "Job deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;