"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminControllers_1 = require("../controllers/adminControllers");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post('/register', adminControllers_1.registerAdmin);
router.post('/login', adminControllers_1.loginAdmin);
router.get('/protected', authMiddleware_1.verifyAdmin, (req, res) => {
    res.json({ message: "Admin dashboard access granted" });
});
exports.default = router;
