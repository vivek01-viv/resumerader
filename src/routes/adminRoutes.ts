import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminControllers";
import { verifyAdmin} from "../middlewares/authMiddleware";

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

router.get('/protected', verifyAdmin, (req, res) => {
    res.json({ message: "Admin dashboard access granted" });
});
export default router;