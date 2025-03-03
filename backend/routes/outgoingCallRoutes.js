import express from "express";
import {
  createOutgoingCall,
  getAllOutgoingCalls,
  getOutgoingCallById,
  getOutgoingCallsByNumber,
  deleteOutgoingCall,
} from "../controllers/outgoingCallController.js";

const router = express.Router();

router.post("/", createOutgoingCall);
router.get("/", getAllOutgoingCalls);
router.get("/:id", getOutgoingCallById);
router.get("/number/:number", getOutgoingCallsByNumber);
router.delete("/:id", deleteOutgoingCall);

export default router;
