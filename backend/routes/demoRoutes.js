import express from "express";
import { scheduleDemo, getDemos, getDemoById } from "../controllers/demoController.js";

const router = express.Router();

router.post("/", scheduleDemo);
router.get("/", getDemos);
router.get("/:id", getDemoById);

export default router;
