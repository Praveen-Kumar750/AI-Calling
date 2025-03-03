import express from "express";
import {
  createIncomingMessage,
  getAllIncomingMessages,
  getIncomingMessageById,
  getIncomingMessagesByNumber,
  deleteIncomingMessage,
} from "../controllers/incomingMessageController.js";

const router = express.Router();

router.post("/", createIncomingMessage);
router.get("/", getAllIncomingMessages);
router.get("/:id", getIncomingMessageById);
router.get("/number/:number", getIncomingMessagesByNumber);
router.delete("/:id", deleteIncomingMessage);

export default router;




