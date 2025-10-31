import express from "express";
import { Application } from "../Models/Application.js";

const router = express.Router();

router.post("/", async (req, res)=>{
    try{
        const { userId, internshipId, jobId, coverLetter} = req.body;

        if(!userId || (!internshipId && !jobId)){
            return res.status(400).json({message: "Missing required fields"});
        }

        const existingApp = await Application.findOne({
            userId, 
            $or: [{internshipId}, {jobId}]
        });

        if(existingApp){
            return res.status(409).json({message: "Already applied"});
        }

        const app = await Application.create({
            userId,
            internshipId,
            jobId,
            coverLetter
        });

        res.status(200).json(app);
    }catch(error){
        res.status(400).json({success:false, message: error.message});
    }
});

router.get("/", async (req, res)=>{
    try{
        const apps = await Application.find()
        .populate("jobId")
        .populate("internshipId")
        .sort({createdAt: -1});
        res.json(apps);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});


router.get("/user/:userId", async (req, res)=>{
    try{
        const apps = await Application.find({userId: req.params.userId})
        .populate("jobId")
        .populate("internshipId");
        res.json(apps);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});


router.delete("/:id", async (req, res)=>{
    try{
        const app = await Application.findByIdAndDelete(req.params.id)
        if(!app) return res.json("Applications not found");
        res.json({message: "Application deleted."})
    }catch(error){
        res.json({message: error.message});
    }
});

export default router;