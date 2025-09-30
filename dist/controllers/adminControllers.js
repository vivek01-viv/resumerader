"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = exports.registerAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = require("../models/Admin");
const registerAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingAdmin = await Admin_1.Admin.findOne({ email });
        if (existingAdmin)
            return res.status(400).json({ message: "Admin already exists" });
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newAdmin = new Admin_1.Admin({ email, password: hashedPassword });
        await newAdmin.save();
        return res.status(201).json({ message: "Admin registered successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};
exports.registerAdmin = registerAdmin;
// Login Admin
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin_1.Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ message: "Login successful", token });
    }
    catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};
exports.loginAdmin = loginAdmin;
