import { Request, Response } from "express";
import  Job from "../models/job";
export const uploadJob = async (req: Request, res: Response) => {
    try {
        const { title, company, location, description, skillsRequired} = req.body;

        const job = new Job({
            title,
            company,
            location,
            description,
            skillsRequired,
        });

        await job.save();

        res.status(201).json({ message: "Job uploaded successfully", job });
    } catch (error) {
        console.error("Error uploading:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};