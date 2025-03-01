import express from "express";
import { register, login, logout, forgotPassword, resetPassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// router.post("/logout", logout); // 👈 Make sure this is here
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


export default router;
