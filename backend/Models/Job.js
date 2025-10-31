import mongoose from "mongoose";


const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Job title is required"],
        },
        company: {
            type: String,
            required: [true, "Company name is required"],
        },
        location: {
            type: String,
            required: [true, "Location is required"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            enum: ["IT", "Marketing", "Design", "Finance"],
        },
        experience: {
            type: String,
            required: [true, "Experience field is required"],
        },
        ctc: {
            type: String,
            required: [true, "CTC is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        createdBy: {
            type: String,
            default: "admin",
        },
    },
    { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);