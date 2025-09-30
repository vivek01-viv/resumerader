import  { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin";

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body; 
        if (!email || !password) {
          return res.status(400).json({ message: "Email and password are required" });
        }
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
          return res.status(400).json({ message: "Admin already exists" });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newAdmin = new Admin({ email, password: hashedPassword });
        await newAdmin.save();
        return res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

// Login Admin
export const loginAdmin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
         return res.status(401).json({ message: "Invalid credentials" });
}
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
return res.json({ message: "Login successful", token });
} catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error", error });
}
};
     