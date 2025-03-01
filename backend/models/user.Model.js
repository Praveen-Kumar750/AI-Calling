import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    otp: { type: String }, // Store OTP for password reset
    otpExpires: { type: Date } // Expiration time for OTP
}, { timestamps: true });

export default mongoose.model("User", userSchema);
