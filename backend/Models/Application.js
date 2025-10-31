import mongoose from "mongoose";



const applicationSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: [true, "User ID is required"],
        },
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
        },
        internshipId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Internship",
        },
        coverLetter: {
            type: String,
        },
        status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected"],
            default: "Pending",
        },
    },
    { timestamps: true }
);


export const Application = mongoose.model("Application", applicationSchema);