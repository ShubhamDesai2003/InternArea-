import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Internship title is required"],
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
        duration: {
            type: String,
            required: [true, "Duration is required"],
        },
        stipend: {
            type: String,
            required: [true, "Stipend is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        createdBy: {
            type: String, // Admin UID (optional for future)
            default: "admin",
        },
    },
    { timestamps: true }
);



export const Internship = mongoose.model("Internship", internshipSchema);