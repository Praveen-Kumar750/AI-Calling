import mongoose from "mongoose";

const billingCallLogSchema = new mongoose.Schema({
  contactNo: {
    type: Number,
    required: true
  },
  date: {
    type: String, // Use Date if you want to store it as a Date object
    required: true
  },
  timeDuration: {
    type: String, // Keeping it as String to preserve "min" format
    required: true
  },
  serviceType: {
    type: String,
    enum: ["Call", "Text"], // Restrict to Call/Text
    required: true
  },
  sessionCostPerUnitTime: {
    type: Number,
    required: true
  },
  serverCostPerUnitTime: {
    type: Number,
    required: true
  },
  totalCharge: {
    type: Number,
    required: true
  },
  referenceNumber: {
    type: Number,
    required: true,
    unique: true
  }
}, { timestamps: true });

const BillingCallLog = mongoose.model("BillingCallLog", billingCallLogSchema);
export default BillingCallLog;