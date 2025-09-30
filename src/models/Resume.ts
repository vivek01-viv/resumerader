import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
name:String,
email:String,
phone:String,
client:String,
skills:[String],
rawText:String,
experience:String,
filePath:String,
}, {
    timestamps:true,
});
export const Resume = mongoose.model("Resume",resumeSchema);