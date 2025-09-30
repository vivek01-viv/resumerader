"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upolad_1 = require("../middlewares/upolad");
const fs_1 = __importDefault(require("fs"));
const Resume_1 = require("../models/Resume");
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const router = express_1.default.Router();
router.post('/upload', upolad_1.upload.single('resume'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const dataBuffer = fs_1.default.readFileSync(file.path);
        const pdfData = await (0, pdf_parse_1.default)(dataBuffer);
        const text = pdfData.text;
        const name = text.match(/Name:\s*(.*)/)?.[1] || 'Not Found';
        const email = text.match(/Email:\s*([\w.-]+@[\w.-]+\.\w+)/)?.[1] || 'Not Found';
        const phone = text.match(/Phone:\s*(\+?\d{10,15})/)?.[1] || 'Not Found';
        const skillsMatch = text.match(/Skills:[:\-]?\s*(.*)/i)?.[1]?.split(',').map(skill => skill.trim()) || [];
        const newResume = new Resume_1.Resume({
            name,
            email,
            phone,
            skills: skillsMatch,
            filePath: file.path,
        });
        await newResume.save();
        res.status(200).json({ message: 'Resume uploaded and data extracted successfully', data: newResume });
    }
    catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: 'Error processing resume', error });
    }
});
exports.default = router;
