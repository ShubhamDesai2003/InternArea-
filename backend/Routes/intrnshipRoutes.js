import express from "express";
import { Internship } from "../Models/Internship.js"

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const internship = await Internship.create(req.body);
        res.status(200).json(internship);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const internships = await Internship.find().sort({ createdAt: -1 });
        res.json(internships);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});


router.get("/:id", async (req, res) => {
    try {
        const internship = await Internship.findById(req.params.id);
        if (!internship) return res.json({ message: "Internship not found.." });
        res.json(internship);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const result = await Internship.findByIdAndDelete(req.params.id);
        if (!result) return res.json({ message: "Internship not found" });
        res.json({ message: "Internship deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;