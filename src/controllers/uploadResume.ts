import fs from "fs";
import PdfParse from "pdf-parse";
import { Resume } from "../models/Resume";
import { Request, Response } from "express";

export const uploadResume = async (req: Request, res: Response) => {
    try {
        const dataBuffer = fs.readFileSync((req as any).file.path);
        const pdfData = await PdfParse(dataBuffer);
        const text = pdfData.text;

        //extracting basic info using regex
        const name = text.match(/Name[:\-]?\s*(.+)/i)?.[1]|| 'Not Found';
        const phone = text.match(/(\+?\d{1,3}[- ]?)?\d{10}/)?.[0] || 'Not Found';
        const email = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] || 'Not Found';
        const client = text.match(/Client[:\-]?\s*(.+)/i)?.[1]?.split('\n')[0].trim() || 'Not Found';
        const experience = text.match(/Experience[:\-]?\s*(.+)/i)?.[1]?.split('\n')[0].trim() || 'Not Found';
        const Skills = text.match(/Skills[:\-]?\s*(.+)/i)?.[1]?.split(',').map((skill) => skill.trim()) || [];

        //check for duplicate resumes

        const duplicate = await Resume.findOne({ 
            $or: [{ email }, { phone }, { name }, { client }, { experience }]
        });
        if (duplicate) {
            return res.status(409).json({ message: "Duplicate resume detected" });
        }
        //save new resume
        const newResume = new Resume({
            name,
            email,
            phone,
            client,
            experience,
            skills: Skills,
            rawText: text,
        });
        await newResume.save();
        res.status(201).json({ message: "Resume uploaded successfully", data: newResume });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: "Error processing resume", error });
    }
};