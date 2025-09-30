import  Express  from "express";
import { upload }  from "../middlewares/upolad";
import fs from "fs";
import { Resume } from '../models/Resume';
import pdfParse from 'pdf-parse';
const router = Express.Router();
router.post ('/upload', upload.single('resume'), async (req, res) => {
    try {
        const file =(req as any).file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const dataBuffer=fs.readFileSync(file.path);
        const pdfData=await pdfParse(dataBuffer);
        const text = pdfData.text;

        const name = text.match(/Name:\s*(.*)/)?.[1] || 'Not Found';
        const email = text.match(/Email:\s*([\w.-]+@[\w.-]+\.\w+)/)?.[1] || 'Not Found';
        const phone = text.match(/Phone:\s*(\+?\d{10,15})/)?.[1] || 'Not Found';
        const skillsMatch = text.match(/Skills:[:\-]?\s*(.*)/i)?.[1]?.split(',').map(skill => skill.trim()) || [];

        const newResume = new Resume({
            name,
            email,
            phone,
            skills: skillsMatch,
            filePath: file.path,
        });
        await newResume.save();
        res.status(200).json({ message: 'Resume uploaded and data extracted successfully', data: newResume });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: 'Error processing resume', error });
    }
});
export default router;
