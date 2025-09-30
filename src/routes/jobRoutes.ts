import { Router } from "express";
import { uploadJob } from "../controllers/jobController";

const router = Router();
router.post('/upload', uploadJob);

export default router;