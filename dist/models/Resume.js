"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resume = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const resumeSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    phone: String,
    skills: [String],
    expierence: String,
    filePath: String,
}, {
    timestamps: true,
});
exports.Resume = mongoose_1.default.model("Resume", resumeSchema);
