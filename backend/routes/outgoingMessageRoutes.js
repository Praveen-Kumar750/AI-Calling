import express from "express";
import {
  createOutgoingMessage,
  getAllOutgoingMessages,
  getOutgoingMessageById,
  getOutgoingMessagesByNumber,
  deleteOutgoingMessage,
} from "../controllers/outgoingMessageController.js";

const router = express.Router();

router.post("/", createOutgoingMessage);
router.get("/", getAllOutgoingMessages);
router.get("/:id", getOutgoingMessageById);
router.get("/number/:number", getOutgoingMessagesByNumber);
router.delete("/:id", deleteOutgoingMessage);

export default router;
