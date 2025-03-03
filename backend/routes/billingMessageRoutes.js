import express from "express";
import {
  getAllBillingLogs,
  getBillingLogById,
  getBillingLogsByNumber,
  deleteBillingLog,
} from "../controllers/billingMessageController.js";

const router = express.Router();

router.get("/", getAllBillingLogs);
router.get("/:id", getBillingLogById);
router.get("/number/:number", getBillingLogsByNumber);
router.delete("/:id", deleteBillingLog);

export default router;