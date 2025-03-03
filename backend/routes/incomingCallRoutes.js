import express from "express";
import {
  createIncomingCall,
  getAllIncomingCalls,
  getIncomingCallById,
  getIncomingCallsByNumber,
  deleteIncomingCall,
} from "../controllers/incomingCallController.js";

const router = express.Router();

router.post("/", createIncomingCall);
router.get("/", getAllIncomingCalls);
router.get("/:id", getIncomingCallById);
router.get("/number/:number", getIncomingCallsByNumber);
router.delete("/:id", deleteIncomingCall);

export default router;
