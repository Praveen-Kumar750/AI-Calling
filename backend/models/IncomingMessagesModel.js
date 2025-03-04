import mongoose from "mongoose";
import { logBillingDetails } from "./BillingMessagesModel.js";

const MessageHistorySchema = new mongoose.Schema(
  {
    contactNo: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    timeDuration: {
      type: String,
      required: true,
    },
    conversationRaw: {
      type: String,
      required: true,
    },
    conversationSummary: {
      type: String,
      required: true,
    },
    conversationKeyPoints: {
      type: String,
      required: true,
    },
    conversationType: {
      type: String,
      required: true,
    },
    contactFeedback: {
      type: String,
      required: true,
    },
    transferToAuthority: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// After saving an incoming call, log billing details
MessageHistorySchema.post("save", function (doc) {
  logBillingDetails(doc.contactNo, doc.date, doc.timeDuration, "Incoming");
});

const MessageHistory = mongoose.model("MessageHistory", MessageHistorySchema);

export default MessageHistory;
