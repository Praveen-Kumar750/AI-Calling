import mongoose from "mongoose";

const billingMessageLogSchema = new mongoose.Schema(
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
    serviceType: {
      type: String,
      enum: ["Incoming", "Outgoing"],
      required: true,
    },
    sessionCostPerUnitTime: {
      type: Number,
      required: true,
    },
    serverCostPerUnitTime: {
      type: Number,
      required: true,
    },
    totalCharge: {
      type: Number,
      required: true,
    },
    referenceNumber: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const BillingMessageLog = mongoose.model("BillingMessageLog", billingMessageLogSchema);

// Function to log billing details
export async function logBillingDetails(contactNo, date, timeDuration, serviceType) {
  try {
    const sessionCostPerUnitTime = 1; // Example cost per minute
    const serverCostPerUnitTime = 1; // Example cost per minute
    const totalCharge = parseFloat(timeDuration) * (sessionCostPerUnitTime + serverCostPerUnitTime);
    const referenceNumber = Math.floor(Math.random() * 1000000000);

    const newBillingLog = new BillingMessageLog({
      contactNo,
      date,
      timeDuration,
      serviceType,
      sessionCostPerUnitTime,
      serverCostPerUnitTime,
      totalCharge,
      referenceNumber,
    });

    await newBillingLog.save();
  } catch (error) {
    console.error("Error logging billing details:", error);
  }
}

export default BillingMessageLog;
