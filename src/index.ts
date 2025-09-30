import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import resumeRoutes from "./routes/resumeRoutes";
import adminRoutes from "./routes/adminRoutes";
import jobRoutes from "./routes/jobRoutes";

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resumerader')
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error("MongoDB connection error:", error));

app.use('/api/resumes', resumeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/jobs', jobRoutes);

app.get('/', (req:Request, res:Response) => {
    res.send('Resume Reader API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    app.use((req, res) => { res.status(404).json({ message: "Route not found" });
});
});