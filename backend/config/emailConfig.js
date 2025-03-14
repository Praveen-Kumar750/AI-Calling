import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

export const sendOTP = async (email, otp) => {
    const subject = "Your OTP Code";
    const text = `Your OTP is: ${otp}. It is valid for 10 minutes.`;
    return sendEmail(email, subject, text);
};
