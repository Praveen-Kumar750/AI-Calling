// const mongoose = require('mongoose');

// const OutgoingCallHistorySchema = new mongoose.Schema({
//   contactNo: {
//     type: Number,
//     required: true
//   },
//   date: {
//     type: Date,
//     required: true
//   },
//   timeDuration: {
//     type: String,
//     required: true
//   },
//   conversationTopic: {
//       type: String,
//       required: true
//   },
//   conversationRaw: {
//     type: String, // Can be a URL or reference to raw conversation data
//     required: true
//   },
//   conversationSummary: {
//     type: String, // Can be a URL or reference to summarized conversation
//     required: true
//   },
//   conversationKeyPoints: {
//     type: String, // Key points extracted from the conversation
//     required: true
//   },
//   conversationType: {
//     type: String, // AI analyzed conversation type (e.g., Satisfied, Unsatisfied)
//     required: true
//   },
//   contactFeedback: {
//     type: String, // Contact's feedback (e.g., Angry, Happy, Neutral)
//     required: true
//   },
//   transferToAuthority: {
//     type: String, // Whether it was transferred to authority (e.g., Free, Paid)
//     required: true
//   }
// }, { timestamps: true });

// const OutgoingCallHistory = mongoose.model('OutgoingCallHistory', OutgoingCallHistorySchema);

// module.exports = OutgoingCallHistory;



import mongoose from "mongoose";
import { logBillingDetails } from "./BillingCallsModel.js";

const OutgoingCallHistorySchema = new mongoose.Schema(
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
    conversationTopic: {
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

// After saving an outgoing call, log billing details
OutgoingCallHistorySchema.post("save", function (doc) {
  logBillingDetails(doc.contactNo, doc.date, doc.timeDuration, "Outgoing");
});

const OutgoingCallHistory = mongoose.model("OutgoingCallHistory", OutgoingCallHistorySchema);

export default OutgoingCallHistory;
