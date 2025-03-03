import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.Model.js";
import { sendOTP } from "../config/emailConfig.js";

import { sendEmail } from "../config/emailConfig.js";
import OTPGenerator from "otp-generator";

// **Register**
export const register = async (req, res) => {
    const { email, password, phone } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, phone });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
};

// **Login**
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Login error" });
    }
};

// **Forgot Password - Send OTP**
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP
    const otp = OTPGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
    user.otp = otp; // Save OTP in database
    user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 mins
    await user.save();

    // Send OTP Email
    await sendEmail(email, "Password Reset OTP", `Your OTP is: ${otp}`);

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// **Verify OTP & Reset Password**
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: "Error resetting password" });
    }
};



export const logout = (req, res) => {
    try {
        res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'None' });
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Logout failed', error: error.message });
    }
};